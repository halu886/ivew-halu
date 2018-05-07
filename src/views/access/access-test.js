import axios from 'axios';
import { EROFS } from 'constants';

export default {
    name: 'access-test',
    data () {
        return {
            users: [],
            columns: [
                {
                    title: 'Name',
                    key: 'username',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.username)
                        ]);
                    }
                },
                {
                    title: 'userID',
                    key: 'userID'
                },
                {
                    title: 'Age',
                    key: 'age',
                    render: (h, params) => {
                        return h('span', '19');
                    }
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index);
                                    }
                                }
                            }, 'View'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index);
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
            ],
            addUser: {
                name: '',
                password: ''
            }
        };
    },
    methods: {
        addUserHandler () {
            this.$Modal.confirm({
                render: (h) => {
                    return h('div', {}, [
                        h('input'), {
                            props: {
                                value: this.addUser.name,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    this.addUser.name = val;
                                }
                            }
                        },
                        h('input'), {
                            props: {
                                value: this.addUser.password,
                                placeholder: 'Please enter your password...'
                            },
                            on: {
                                input: (val) => {
                                    this.addUser.password = val;
                                }
                            }
                        }]);
                },
                onOk: () => {
                    let _this = this;
                    axios.post('/user/add', { user: this.addUser.name, password: this.addUser.password, role: 'normalUser' }).then((res) => {
                        let data = res.data;
                        if (!data.status) {
                            throw new Error('新增失败');
                        }
                        _this.getData();
                    }).catch((e) => { _this.$Message.error(e.stack); });
                }
            });
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.users[index].username}<br>userID：${this.users[index].userId}<br>Age：21`
            });
        },
        getData () {
            let _this = this;
            axios.get('/user/showUser').then((res) => {
                let data = res.data;
                if (!data.status) {
                    throw new Error(data.message);
                }
                _this.users = data.data;
            }).catch((e) => {
                _this.$Message.error(e.stack);
            });
        }
    },
    created () {
        this.getData();
    }
};
