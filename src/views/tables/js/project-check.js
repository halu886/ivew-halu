import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
export default {
    name: 'editable-table',
    components: {
    },
    data () {
        let _this = this;
        const validateName = (rule, value, callback) => {
            if (!value) callback(new Error('名称不能为空'));
            callback();
        };
        // const validateStartDate = (rule, value, callback) => {
        //     let startMoment = moment(value);
        //     let endMoment = moment(_this.projectForm.endDate);
        //     if (startMoment.isBefore(moment())) callback(new Error('开始时间不能早于当前时间'));
        //     if (startMoment.isAfter(endMoment)) callback(new Error('开始不能晚于结束时间'));
        //     callback();
        // };
        // const validateEndDate = (rule, value, callback) => {
        //     let endMoment = moment(value);
        //     let startMoment = moment(_this.projectForm.startDate);
        //     if (startMoment.isAfter(endMoment)) callback(new Error('结束时间不能早于开始时间'));
        // };
        return {
            searchConName1: '',
            projectTotal: 0,
            pageSize: 10,
            pageNum: 1,
            projectData: [],
            projectColumn: [
                {
                    title: '名称',
                    key: 'name',
                    sortable: true
                },
                {
                    title: '创建日期',
                    key: 'createDate',
                    sortable: true
                },
                {
                    title: '剩余子任务',
                    key: 'unHandleTask',
                    sortable: true
                },
                {
                    title: '待完成进度',
                    key: 'surplusProgress',
                    sortable: true
                },
                {
                    title: '已耗时长',
                    key: 'useDate',
                    sortable: true
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
                                        this.$Message.info({
                                            title: 'Project Info',
                                            content: `名称：${this.projectData[params.index].name}
                                            <br>创建日期：${this.projectData[params.index].createDate}
                                            <br>剩余子任务${this.projectData[params.index].unHandleTask}
                                            <br>待完成进度${this.projectData[params.index].surplusProgress}
                                            <br>已耗时长${this.projectData[params.index].useDate}`
                                        });
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
                                        let index = params.index;
                                        axios.delete('/project/deleteById', { params: { id: _this.projectData[index].projectID } }).then((response) => {
                                            let data = response.data;
                                            if (!data.status) {
                                                throw new Error('项目删除失败');
                                            }
                                            _this.getData(_this.pageSize, _this.pageNum);
                                        }).catch((e) => {
                                            _this.$Message.error({ content: e.stack, duration: 0, closable: true });
                                        });
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
            ],
            projectForm: {
                name: ''
                // startDate: new Date(),
                // endDate: new Date()
            },
            ruleCustom: {
                name: [{ validator: validateName, trigger: 'blur' }]
                // startDate: [{ validator: validateStartDate, trigger: 'blur' }],
                // endDate: [{ validator: validateEndDate, trigger: 'blur' }]
            }
        };
    },
    methods: {
        viewItem: (index) => {
            this.$Message.info({
                title: 'Project Info',
                content: `名称：${this.projectData[index].name}
                <br>创建日期：${this.projectData[index].createDate}
                <br>剩余子任务${this.projectData[index].unHandleTask}
                <br>待完成进度${this.projectData[index].surplusProgress}
                <br>已耗时长${this.projectData[index].useDate}`
            });
        },
        removeItem: (index) => {

        },
        okHandler () {
            let _this = this;
            if (!this.projectForm.name) { _this.$Message.error('名称不能为空'); }
            axios.post('project/add', this.projectForm, {
                ContentType: 'application/x-www-form-urlencoded'
            }).then((response) => {
                let data = response.data;
                if (!data.status) {
                    throw new Error('添加失败');
                }
                _this.$Modal.remove();
            }).catch((e) => {
                _this.$Modal.remove();
                _this.$Message.error(e.stack);
            });
        },
        cancelHandler () {
            this.projectForm.name = '';
        },
        rowClassName (row, index) {
            let item = row.item;
            if (item.unHandlerProgress !== 100) {
                return 'table-unhandler-project';
            }
            return '';
        },
        handleSearch (event) {
            let searchParam = event.data;
            this.getData(this.pageSize, this.pageNum, searchParam);
        },
        sizeChange (size) {
            this.pageSize = size;
            this.getData(this.pageSize, this.pageNum);
        },
        change (page) {
            this.pageNum = page;
            this.getData(this.pageSize, this.pageNum);
        },
        getData (size, page, searchParam) {
            let _this = this;
            let params = { size: size, page: page };
            if (searchParam) params.searchParam = searchParam;
            axios.get('/project/table', { params: params }).then((response) => {
                let data = response.data;
                if (!data.status) {
                    throw new Error('查询异常');
                }
                _.map(data.data, (item) => {
                    let createDate = moment(item.createDate);
                    let duration = moment.duration(moment() - createDate);
                    item.useDate = duration.asDays().toFixed() + '天' + duration.hours() + '时' + duration.minutes() + '分';
                    item.createDate = createDate.format('YYYY-MM-DD');
                });
                this.projectTotal = data.total;
                this.projectData = data.data;
            }).catch((e) => {
                _this.$Message.error({ content: e.stack, duration: 0, closable: true });
            });
        },
        handleRender () {
            let _this = this;
            _this.$Modal.confirm({
                title: '新增项目',
                okText: '提交',
                cancelText: '取消',
                loading: true,
                closable: true,
                render: (h) => {
                    return h('Form', { props: { labelPosition: 'left', model: _this.projectForm, labelWidth: 100, rules: _this.ruleCustom }, ref: 'projectForm' },
                        [
                            h('FormItem', { props: { label: '项目名称', prop: 'name' } }, [h('Input', {
                                props: { model: _this.projectForm.name, autofocus: true, placeholder: 'Please enter your name...' },
                                on: {
                                    input: (val) => {
                                        _this.projectForm.name = val;
                                    }
                                }
                            }
                            )])
                            // h('FormItem', { props: { label: '开始时间' } }, [h('DatePicker', { props: { prop: 'startDate', type: 'datetime', format: 'yyyy-MM-dd HH:mm' } })]),
                            // h('FormItem', { props: { label: '结束时间' } }, [h('DatePicker', { props: { prop: 'endDate', type: 'datetime', format: 'yyyy-MM-dd HH:mm' } })])
                        ]);
                },
                onOk: () => {
                    _this.okHandler();
                }
            });
        }
    },
    created () {
        this.getData(this.pageSize, this.pageNum);
    }
};
