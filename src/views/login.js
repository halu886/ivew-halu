
import Cookies from 'js-cookie';
import axios from 'axios';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate(valid => {
                let _this = this;
                if (valid) {
                    axios({
                        url: '/login',
                        method: 'post',
                        data: {
                            username: this.form.userName,
                            password: this.form.password
                        },
                        transformRequest: [
                            function (data) {
                                let ret = '';
                                for (let it in data) {
                                    ret +=
                                        encodeURIComponent(it) +
                                        '=' +
                                        encodeURIComponent(data[it]) +
                                        '&';
                                }
                                return ret;
                            }
                        ],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        let data = response.data;
                        if (data.status) {
                            _this.$store.state.user.userInfo = {
                                name: _this.form.userName,
                                password: _this.form.password
                            };
                            Cookies.set('user', _this.form.userName);
                            // Cookies.set('password', _this.form.password);
                            Cookies.set('role', data.role[0] || 'guest');
                            _this.$store.commit(
                                'setAvator',
                                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                            );
                            Cookies.set('access', 0);

                            _this.$router.push({
                                name: 'home_index'
                            });
                        }
                    }).catch(function (error) { console.error(error); });
                }
            });
        }
    }
};
