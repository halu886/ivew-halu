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

export default {
    name: 'task-check',
    components: {
    },
    data () {
        let _this = this;
        return {
            projects: [],
            selectProject: '',
            task: [],
            showTask: {
                createDate:
                    '',
                description:
                    '',
                endDate:
                    '',
                id:
                    '',
                name:
                    '',
                nodeProgress:
                    '',
                progress:
                    '',
                projectId:
                    '',
                ptaskId:
                    '',
                startDate:
                    '',
                tags:
                    '',
                taskId:
                    '',
                taskName:
                    '',
                taskType:
                    '',
                tno:
                    '',
                updateDate:
                    ''
            },
            buttonProps: {
                type: 'ghost',
                size: 'small'
            },
            tTask: {
                projectId: '',
                name: '',
                progress: 25,
                description: '',
                startDate: new Date(),
                endDate: new Date()
            },
            nTask: {// 常规任务
                projectId: '',
                pTaskId: '',
                name: '',
                progress: 25,
                description: '',
                startDate: new Date(),
                endDate: new Date()
            },
            typeTask: {// 常规任务
                projectId: '',
                pTaskId: '',
                name: '',
                progress: 25,
                description: '',
                startDate: new Date(),
                endDate: new Date()
            },
            typeTasks: [
                {
                    type: 'P',
                    projectId: '',
                    pTaskId: '',
                    name: '',
                    progress: 25,
                    description: '',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    type: 'D',
                    projectId: '',
                    pTaskId: '',
                    name: '',
                    progress: 25,
                    description: '',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    type: 'C',
                    projectId: '',
                    pTaskId: '',
                    name: '',
                    progress: 25,
                    description: '',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    type: 'A',
                    projectId: '',
                    pTaskId: '',
                    name: '',
                    progress: 25,
                    description: '',
                    startDate: new Date(),
                    endDate: new Date()
                }
            ],
            taskModalConfig: {
                render: (h) => {
                    _this.nTask.projectId = _this.selectProject;
                    return h('Form', { props: { labelPosition: 'left', labelWidth: 80, rules: rootTaskRule } }, [
                        h('FormItem', { props: { label: '名称', prop: 'name' } }, [h('Input', { props: { value: _this.nTask.name }, on: { input: (val) => { _this.nTask.name = val; } } })]),
                        h('FormItem', { props: { prop: 'progress', label: '进度' } }, [h('InputNumber', { props: { max: 100, min: 0, value: _this.nTask.progress }, on: { input: (val) => { _this.nTask.progress = val; } } })]),
                        h('FormItem', { props: { prop: 'description', label: '描述' } }, [h('Input', { props: { type: 'textarea', value: _this.nTask.description }, on: { input: (val) => { this.nTask.description = val; } } })]),
                        h('FormItem', { props: { label: '开始时间', prop: 'startDate' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.nTask.startDate }, on: { input: (val) => { _this.nTask.startDate = val; } } })]),
                        h('FormItem', { props: { prop: 'endDate', label: '结束时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.nTask.endDate }, on: { input: (val) => { _this.nTask.endDate = val; } } })])
                    ]);
                }
            },
            typeTaskModalConfig: {
                render: (h) => {
                    // _this.typeTasks[0].projectId = _this.selectProject;
                    for (let i = 0; i < 4; i++) {
                        _this.typeTasks[i].projectId = _this.selectProject;
                    }
                    return h('Form', { props: { labelPosition: 'left', labelWidth: 80 } }, [
                        // // P
                        h('FormItem', { props: { label: '类型' } }, [h('Input', { props: { value: _this.typeTasks[0].type }, on: { input: (val) => { _this.typeTasks[0].type = val; } } })]),
                        h('FormItem', { props: { label: '名称' } }, [h('Input', { props: { value: _this.typeTasks[0].name }, on: { input: (val) => { _this.typeTasks[0].name = val; } } })]),
                        h('FormItem', { props: { label: '进度' } }, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[0].progress }, on: { input: (val) => { _this.typeTasks[0].progress = val; } } })]),
                        h('FormItem', { props: { label: '描述' } }, [h('Input', { props: { type: 'textarea', value: _this.typeTasks[0].description }, on: { input: (val) => { _this.typeTasks[0].description = val; } } })]),
                        h('FormItem', { props: { label: '开始时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[0].startDate }, on: { input: (val) => { _this.typeTasks[0].startDate = val; } } })]),
                        h('FormItem', { props: { label: '结束时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[0].endDate }, on: { input: (val) => { _this.typeTasks[0].endDate = val; } } })]),
                        // D
                        h('FormItem', { props: { label: '类型' } }, [h('Input', { props: { value: _this.typeTasks[1].type }, on: { input: (val) => { _this.typeTasks[1].type = val; } } })]),
                        h('FormItem', { props: { label: '名称' } }, [h('Input', { props: { value: _this.typeTasks[1].name }, on: { input: (val) => { _this.typeTasks[1].name = val; } } })]),
                        h('FormItem', { props: { label: '进度' } }, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[1].progress }, on: { input: (val) => { _this.typeTasks[1].progress = val; } } })]),
                        h('FormItem', { props: { label: '描述' } }, [h('Input', { props: { type: 'textarea', value: _this.typeTasks[1].description }, on: { input: (val) => { _this.typeTasks[1].description = val; } } })]),
                        h('FormItem', { props: { label: '开始时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[1].startDate }, on: { input: (val) => { _this.typeTasks[1].startDate = val; } } })]),
                        h('FormItem', { props: { label: '结束时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[1].endDate }, on: { input: (val) => { _this.typeTasks[1].endDate = val; } } })]),
                        // C
                        h('FormItem', { props: { label: '类型' } }, [h('Input', { props: { value: _this.typeTasks[2].type }, on: { input: (val) => { _this.typeTasks[2].type = val; } } })]),
                        h('FormItem', { props: { label: '名称' } }, [h('Input', { props: { value: _this.typeTasks[2].name }, on: { input: (val) => { _this.typeTasks[2].name = val; } } })]),
                        h('FormItem', { props: { label: '进度' } }, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[2].progress }, on: { input: (val) => { _this.typeTasks[2].progress = val; } } })]),
                        h('FormItem', { props: { label: '描述' } }, [h('Input', { props: { type: 'textarea', value: _this.typeTasks[2].description }, on: { input: (val) => { _this.typeTasks[2].description = val; } } })]),
                        h('FormItem', { props: { label: '开始时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[2].startDate }, on: { input: (val) => { _this.typeTasks[2].startDate = val; } } })]),
                        h('FormItem', { props: { label: '结束时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[2].endDate }, on: { input: (val) => { _this.typeTasks[2].endDate = val; } } })]),
                        // A
                        h('FormItem', { props: { label: '类型' } }, [h('Input', { props: { value: _this.typeTasks[3].type }, on: { input: (val) => { _this.typeTasks[3].type = val; } } })]),
                        h('FormItem', { props: { label: '名称' } }, [h('Input', { props: { value: _this.typeTasks[3].name }, on: { input: (val) => { _this.typeTasks[3].name = val; } } })]),
                        h('FormItem', { props: { label: '进度' } }, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[3].progress }, on: { input: (val) => { _this.typeTasks[3].progress = val; } } })]),
                        h('FormItem', { props: { label: '描述' } }, [h('Input', { props: { type: 'textarea', value: _this.typeTasks[3].description }, on: { input: (val) => { _this.typeTasks[3].description = val; } } })]),
                        h('FormItem', { props: { label: '开始时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[3].startDate }, on: { input: (val) => { _this.typeTasks[3].startDate = val; } } })]),
                        h('FormItem', { props: { label: '结束时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[3].endDate }, on: { input: (val) => { _this.typeTasks[3].endDate = val; } } })])
                    ]);
                }
            }
        };
    },
    methods: {
        treeSelectHandler (item) {
            let t = item.t;
            for (let key in t) {
                this.showTask[key] = t[key] || '';
            }
        },
        renderTaskTree (h, { root, node, data }) {
            let _this = this;
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span',
                    {
                        on: {
                            click: () => { _this.treeSelectHandler(data); }
                        }
                    },
                    [
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
                            count: parseInt(data.tags[0]) || 'o',
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
                            click: (e) => {
                                this.appendHandler(e, data);
                            }
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
        titleClickHandler (a, b, c, d) {
            console.log(this, a, b, c, d);
        },
        appendHandler (e, data) {
            let _rootThis = this;
            let t, pTaskStart, PTaskEnd;
            let modalConfig = {};
            if (data) {
                t = data.t;
                pTaskStart = moment(data.startDate) || moment().subtract(10, 'years');
                PTaskEnd = moment(data.endDate) || moment().add(10, 'year');
                if (t.taskType === 't') {
                    let inputCount = 0;
                    let taskTypes = ['P', 'D', 'C', 'A'];
                    let task = {};
                    let taskList = [];
                    // if (data.children.length !== 0) {
                    //     _this.$Message.error('该任务不能添加子任务');
                    //     return;
                    // }
                    // const startDateRule = (rule, value, callback) => {
                    //     let startDate = moment(value, 'YYYY-MM-DD HH:mm');
                    //     let type = task.type;
                    //     let indexType = taskTypes.indexOf(type);
                    //     let preTypeIndex = --indexType;
                    //     let preTaskEndDate = taskList[preTypeIndex].endDate;
                    //     if (startDate.isBefore(pTaskStart)) {
                    //         callback(new Error('起始时间小于父任务起始时间'));
                    //     } else if (indexType !== 0) {
                    //         if (startDate.isBefore(preTaskEndDate)) {
                    //             callback(new Error('开始时间小于前置任务起始时间'));
                    //         }
                    //     }
                    // };
                    // const endDateRule = (rule, value, callback) => {
                    //     let endDate = moment(value, 'YYYY-MM-DD HH:mm');
                    //     if (endDate.isBefore(PTaskEnd)) {
                    //         callback(new Error('起始时间小于父任务起始时间'));
                    //     }
                    // };
                    // let taskRule = {
                    //     name: [{ validator: nameRule, trigger: 'blur' }],
                    //     startDate: [{ validator: startDateRule, trigger: 'blur' }],
                    //     endDate: [{ validator: endDateRule, trigger: 'blur' }]
                    // };
                    // modalConfig.loading = true;
                    modalConfig = _.cloneDeep(_rootThis.typeTaskModalConfig);
                    modalConfig.okText = '提交';
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
                        // taskList.push(preTask);
                        // task.name = '';
                        // task.description = '';
                        // task.moment = moment.form('YYYY-MM-DD HH:mm');
                        // task.type = taskType;
                        // if (inputCount === 3) {
                        //     axios.post('task/add', taskList).then((res) => {
                        //         let data = res.data;
                        //         if (!data.status) {
                        //             throw new Error('添加异常');
                        //         }
                        //         _rootThis.$Message.info('添加成功');
                        //         _rootThis.$Modal.remove();
                        //     }).then((e) => {
                        //         _rootThis.$Message.error({ content: '添加失败' });
                        //     });
                        // }
                        // ++inputCount;
                        // _rootThis.typeTask.projectId = '';
                        // _rootThis.typeTask.pTaskId = '';
                        // _rootThis.typeTask.name = '';
                        // _rootThis.typeTask.progress = '';
                        // _rootThis.typeTask.description = '';
                        // _rootThis.typeTask.startDate = new Date();
                        // _rootThis.typeTask.endDate = new Date();
                        // this.okText = '添加下一条';
                        // if (inputCount === 2) { this.okText = '提交'; }
                        for (let i = 0; i < 4; ++i) {
                            _rootThis.typeTasks[i].pTaskId = t.id;
                            _rootThis.typeTasks[i].startDate = moment(_rootThis.typeTasks[i].startDate).format('YYYY-MM-DD HH:mm:ss');
                            _rootThis.typeTasks[i].endDate = moment(_rootThis.typeTasks[i].endDate).format('YYYY-MM-DD HH:mm:ss');
                        }
                        axios.post('/task/add/t', { typeTask: _rootThis.typeTasks }).then((res) => {
                            let data = res.data;
                            if (!data.status) {
                                throw new Error('添加异常');
                            }
                            _rootThis.$Message.info('添加成功');
                            // _rootThis.$Modal.remove();
                            _rootThis.getData();
                        }).catch((e) => {
                            _rootThis.$Message.error({ content: '添加失败' });
                            _rootThis.getData();
                        });
                    };
                } else {
                    // 添加普通任务
                    t = data.t;
                    let childens = t.children;
                    let progressSum = 0;
                    _.forEach(childens, (t) => {
                        progressSum = t.progress;
                    });
                    if (progressSum >= 100) {
                        this.$Message.error('根任务添加失败');
                        return;
                    }
                    _rootThis.nTask.pTaskId = t.taskId;
                    modalConfig = _.cloneDeep(_rootThis.taskModalConfig);
                    modalConfig.onOk = () => {
                        _rootThis.addNormalTask(t.taskType);
                    };
                }
            } else { // 添加根任务
                let rootTask = _.clone(_rootThis.task);
                let progressSum = 0;
                _.forEach(rootTask, (t) => {
                    progressSum += t.progress;
                });
                if (progressSum >= 100) {
                    this.$Message.error('根任务添加失败');
                    return;
                }
                modalConfig = _.cloneDeep(_rootThis.taskModalConfig);
                modalConfig.onOk = () => {
                    _rootThis.addNormalTask('r');// 推送任务至后端
                };
                modalConfig.okText = '添加';
            }
            _rootThis.$Modal.confirm(modalConfig);
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
        },
        remove (root, node, data) {
            let _this = this;
            console.log(JSON.stringify(data, null, 4));
            this.$Modal.confirm({
                content: '确认删除',
                onOk: () => {
                    axios.delete('/task/deleteNodeById', { params: { taskId: data.t.id } }).then((response) => {
                        let data = response.data;
                        if (!data.status) {
                            throw new Error('删除失败');
                        }
                        _this.getData();
                        // if (!data.canDelete) {
                        //     _this.$Message.error({ content: '不能删除', duration: 0, closable: true });
                        //     return;
                        // }
                        // const parentKey = root.find(el => el === node).parent;
                        // const parent = root.find(el => el.nodeKey === parentKey).node;
                        // const index = parent.children.indexOf(data);
                        // parent.children.splice(index, 1);
                    }).catch((e) => {
                        _this.$Message.error({ content: '删除失败', duration: 0, closable: true });
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
            _this.selectProject = value.value;
            axios.get('/task/tree', { params: { projectID: value.value } }).then((r) => {
                let taskData = r.data;
                if (!taskData.status) {
                    throw new Error('任务加载异常');
                }
                _this.task = taskData.data;
            });
        },
        addNormalTask (pType) {
            let _this = this;
            let rootTask = _.clone(this.nTask);
            rootTask = _.extend(rootTask, { progress: rootTask.progress + '', startDate: moment(rootTask.startDate).format('YYYY-MM-DD HH:mm:ss'), endDate: moment(rootTask.endDate).format('YYYY-MM-DD HH:mm:ss') });
            axios.post(`/task/add/${pType}`, rootTask).then((res) => {
                let data = res.data;
                if (!data.status) {
                    throw new Error('添加失败');
                }
                _this.getData();
            }).catch((e) => {
                _this.$Message.error({ content: e.stack, duration: 0, closable: true });
            });
        },
        overTask () {
            let _this = this;
            axios.put(`/task/overTask/${this.showTask.taskId}`).then((res) => {
                let data = res.data;
                if (!data.status) {
                    throw new Error('操作异常');
                }
                _this.getData();
            }).catch((e) => {
                _this.$Message.error({ content: e.stack, duration: 0, closable: true });
            });
        }
    },
    created () {
        // _modelThis = this;
        this.getData();
    }
};
