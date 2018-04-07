import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
const nameRule = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('不能为空'));
    }
};
const progressRule = () => { };
const rootTaskRule = {
    name: [{ validator: nameRule, trigger: 'blur' }],
    progress: [{ validator: progressRule, trigger: 'blue' }]
};
let taskModalConfig = {
    render: (h) => {
        return h('form', { rules: rootTaskRule }, [
            h('formItem', { label: '名称', prop: 'name' }, [h('input', {})]),
            h('formItem', { label: '描述', prop: 'description' }, [h('textarea', {})]),
            h('formItem', { label: '开始时间', prop: 'startDate' }, [h('TimePicker ', { type: 'time', format: 'YYYY-MM-DD HH:mm' })]),
            h('formItem', { label: '结束时间', prop: 'endDate' }, [h('TimePicker ', { type: 'time', format: 'YYYY-MM-DD HH:mm' })])
        ]);
    }
};

function append (data) {
    let _this = this;
    let t = data.t;
    let modalConfig = {};
    let pTaskStart = moment(data.startDate) || moment().subtract(10, 'years');
    let PTaskEnd = moment(data.endDate) || moment().add(10, 'year');
    if (t.taskType === 'T') {
        let inputCount = 0;
        let taskTypes = ['P', 'D', 'C', 'A'];
        let task = {};
        let taskList = [];
        if (data.children.length !== 0) {
            _this.$Message.error('该任务不能添加子任务');
            return;
        }
        const startDateRule = (rule, value, callback) => {
            let startDate = moment(value, 'YYYY-MM-DD HH:mm');
            let type = task.type;
            let indexType = taskTypes.indexOf(type);
            let preTypeIndex = --indexType;
            let preTaskEndDate = taskList[preTypeIndex].endDate;
            if (startDate.isBefore(pTaskStart)) {
                callback(new Error('起始时间小于父任务起始时间'));
            } else if (indexType !== 0) {
                if (startDate.isBefore(preTaskEndDate)) {
                    callback(new Error('开始时间小于前置任务起始时间'));
                }
            }
        };
        const endDateRule = (rule, value, callback) => {
            let endDate = moment(value, 'YYYY-MM-DD HH:mm');
            if (endDate.isBefore(PTaskEnd)) {
                callback(new Error('起始时间小于父任务起始时间'));
            }
        };
        let taskRule = {
            name: [{ validator: nameRule, trigger: 'blur' }],
            startDate: [{ validator: startDateRule, trigger: 'blur' }],
            endDate: [{ validator: endDateRule, trigger: 'blur' }]
        };
        modalConfig.render = (h) => {
            return h('form', { rules: taskRule }, [
                h('formItem', { label: '类型', disabled: true, prop: 'taskType' }, [h('input', {})]),
                h('formItem', { label: '名称', prop: 'name' }, [h('input', {})]),
                h('formItem', { label: '描述', prop: 'description' }, [h('textarea', {})]),
                h('formItem', { label: '开始时间', prop: 'startDate' }, [h('TimePicker ', { type: 'time', format: 'YYYY-MM-DD HH:mm' })]),
                h('formItem', { label: '结束时间', prop: 'endDate' }, [h('TimePicker ', { type: 'time', format: 'YYYY-MM-DD HH:mm' })])
            ]);
        };
        modalConfig.onOk = () => {
            let taskType = taskTypes[inputCount];
            // let taskStartDate = moment(task.startDate);
            // let taskEndDate = moment(task.endDate);
            let preTask;
            // if (inputCount !== 0) {
            //     preTask = _.clone(taskList[inputCount - 1]);
            //     let preEndDate = moment(preTask.endDate, 'YYYY-MM-DD HH:mm');
            //     if (preEndDate.isAfter(taskStartDate)) {
            //         _this.$Message.error({ content: '时间验证错误' });
            //         return;
            //     }
            // }
            // if (taskEndDate.isAfter(PTaskEnd) || taskStartDate.isBefore(pTaskStart)) {
            //     _this.$Message.error({ content: '时间验证错误' });
            //     return;
            // }
            taskList.push(preTask);
            task.name = '';
            task.description = '';
            task.moment = moment.form('YYYY-MM-DD HH:mm');
            task.type = taskType;
            if (inputCount === 3) {
                axios.post('task/add', taskList).then((res) => {
                    let data = res.data;
                    if (!data.status) {
                        throw new Error('添加异常');
                    }
                    _this.$Message.info('添加成功');
                    _this.$Modal.remove();
                }).then((e) => {
                    _this.$Message.error({ content: '添加失败' });
                });
            }
        };
    } else {

    }

    // axios.get(`/task/add/${data.t.type}`, { params: { taskId: data.t.id } }).then((response) => {
    //     let data = response.data;
    //     if (!data.status) {
    //         throw new Error('添加失败');
    //     }
    //     if (!data.canAdd) {
    //         _this.$Message.infor('不能添加');
    //         return;
    //     }
    //     const children = data.children || [];
    //     children.push({
    //         title: 'appended node',
    //         expand: true
    //     });
    //     _this.$set(data, 'children', children);
    // }).catch();
}

function addRootTask () {
    let rootTask = _.clone(this.task);
    let progressSum = 0;
    _.forEach(rootTask, (t) => {
        progressSum += t.progress;
    });
    if (progressSum >= 100) {
        this.$Message.error('根任务添加失败');
        return;
    }
    this.$Modal.confirm(taskModalConfig);
}
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
        append,
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
        },
        addRootTask
    },
    created () {
        this.getData();
    }
};
