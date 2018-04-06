import axios from 'axios';
import _ from 'lodash';
export default {
    name: 'task-check',
    components: {
    },
    data () {
        return {
            projects: [],
            selectProject: '',
            task: [],
            showTask: {
                name: '',
                description: ''
            },
            buttonProps: {
                type: 'ghost',
                size: 'small'
            }
        };
    },
    methods: {
        treeSelectHandler (items) {
            let item = items[0];
            let _this = this;
            if (!item) {
                this.$Message.error({ content: '无效选中', duration: 0, closable: true });
                return;
            }
            axios.get('/task/findById', { params: { taskID: item.taskId } }).then((response) => {
                let data = response.data;
                if (!data.status) {
                    _this.$Message.error({ content: '查询失败', duration: 0 });
                }
            }).catch(() => { });
        },
        renderTaskTree (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Badge', {
                        props: {
                            count: data.tags[0],
                            overflowCount: 101
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data); }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data); }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            let _this = this;
            axios.get('/task/canAdd').then((response) => {
                let data = response.data;
                if (!data.status) {
                    throw new Error('添加失败');
                }
                if (!data.canAdd) {
                    _this.$Message.infor('不能添加');
                    return;
                }
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                _this.$set(data, 'children', children);
            }).catch();
        },
        remove (root, node, data) {
            let _this = this;
            this.$Modal.info({
                content: '确认删除',
                onOk: () => {
                    axios.get('/task/canDelete', { param: { taskID: data.id } }).then((response) => {
                        let data = response.data;
                        if (data.status) {
                            throw new Error('删除失败');
                        }
                        if (!data.canDelete) {
                            _this.$Message.error({ content: '不能删除', duration: 0, closable: true });
                            return;
                        }
                        const parentKey = root.find(el => el === node).parent;
                        const parent = root.find(el => el.nodeKey === parentKey).node;
                        const index = parent.children.indexOf(data);
                        parent.children.splice(index, 1);
                    });
                },
                onCancel: () => {
                }
            });
        },
        getData () {
            let _this = this;
            axios.get('/project/index').then(
                (response) => {
                    let data = response.data;
                    if (!data.status) {
                        throw new Error('项目加载失败');
                    }
                    _this.projects = data.data;

                    let firstProject = _.take(data.data, 1)[0];
                    _this.selectProject = firstProject.projectID;
                }
            ).catch((e) => {
                _this.$Message.error({ content: e.stack, duration: 0, closable: true });
            });
        },
        changeHandler (value) {
            let _this = this;
            axios.get('/task/tree', { params: { projectID: value.value } }).then((r) => {
                let taskData = r.data;
                if (!taskData.status) {
                    throw new Error('任务加载异常');
                }
                _this.task = taskData.data;
            });
        }
    },
    created () {
        this.getData();
    }
};
