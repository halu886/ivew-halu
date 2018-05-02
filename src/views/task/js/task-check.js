import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
const rootTaskRule = {
    name: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }]
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
                    return h('Form', {
                        props: {
                            labelPosition: 'left',
                            labelWidth: 80,
                            model: _this.nTask,
                            rules: {
                                name: [{ required: true, message: 'The name cannot be empty', trigger: ['blur'] }]
                            }
                        }
                    },
                    [
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
                    for (let i = 0; i < 4; i++) {
                        _this.typeTasks[i].projectId = _this.selectProject;
                    }
                    return h('Form', { props: { labelPosition: 'top', inline: true } }, [
                        // P
                        h('FormItem', { props: { label: '类型' } }, [h('Badge', { props: { count: _this.typeTasks[0].type } })]),
                        h('FormItem', { props: { label: '名称', prop: 'name' } }, [h('Input', { props: { value: _this.typeTasks[0].name }, on: { input: (val) => { _this.typeTasks[0].name = val; } } })]),
                        h('FormItem', { props: { label: '进度' } }, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[0].progress }, on: { input: (val) => { _this.typeTasks[0].progress = val; } } })]),
                        h('FormItem', { props: { label: '开始时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[0].startDate }, on: { input: (val) => { _this.typeTasks[0].startDate = val; } } })]),
                        h('FormItem', { props: { label: '结束时间' } }, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[0].endDate }, on: { input: (val) => { _this.typeTasks[0].endDate = val; } } })]),
                        // D
                        h('FormItem', {}, [h('Badge', { props: { count: _this.typeTasks[1].type } })]),
                        h('FormItem', { props: { prop: 'name' } }, [h('Input', { props: { value: _this.typeTasks[1].name }, on: { input: (val) => { _this.typeTasks[1].name = val; } } })]),
                        h('FormItem', {}, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[1].progress }, on: { input: (val) => { _this.typeTasks[1].progress = val; } } })]),
                        h('FormItem', {}, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[1].startDate }, on: { input: (val) => { _this.typeTasks[1].startDate = val; } } })]),
                        h('FormItem', {}, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[1].endDate }, on: { input: (val) => { _this.typeTasks[1].endDate = val; } } })]),
                        // C
                        h('FormItem', {}, [h('Badge', { props: { count: _this.typeTasks[2].type } })]),
                        h('FormItem', { props: { prop: 'name' } }, [h('Input', { props: { value: _this.typeTasks[2].name }, on: { input: (val) => { _this.typeTasks[2].name = val; } } })]),
                        h('FormItem', {}, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[2].progress }, on: { input: (val) => { _this.typeTasks[2].progress = val; } } })]),
                        h('FormItem', {}, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[2].startDate }, on: { input: (val) => { _this.typeTasks[2].startDate = val; } } })]),
                        h('FormItem', {}, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[2].endDate }, on: { input: (val) => { _this.typeTasks[2].endDate = val; } } })]),
                        // A
                        h('FormItem', {}, [h('Badge', { props: { count: _this.typeTasks[3].type } })]),
                        h('FormItem', { props: { prop: 'name' } }, [h('Input', { props: { value: _this.typeTasks[3].name }, on: { input: (val) => { _this.typeTasks[3].name = val; } } })]),
                        h('FormItem', {}, [h('InputNumber', { props: { max: 100, min: 0, value: _this.typeTasks[3].progress }, on: { input: (val) => { _this.typeTasks[3].progress = val; } } })]),
                        h('FormItem', {}, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[3].startDate }, on: { input: (val) => { _this.typeTasks[3].startDate = val; } } })]),
                        h('FormItem', {}, [h('DatePicker', { props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm', value: _this.typeTasks[3].endDate }, on: { input: (val) => { _this.typeTasks[3].endDate = val; } } })])
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
            let t;
            let modalConfig = {};
            if (data) {
                t = data.t;
                if (t.taskType === 'T') {
                    if (data.children instanceof Array && data.children.length == 4) {
                        _rootThis.$Message.warning('该任务已存在类型任务,添加失败');
                        return;
                    }
                    modalConfig = _.cloneDeep(_rootThis.typeTaskModalConfig);
                    modalConfig.okText = '提交';
                    modalConfig.width = 782;
                    modalConfig.onOk = () => {
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
                    progressSum += parseInt(t.t.nodeProgress);
                });
                if (progressSum >= 100) {
                    this.$Message.error(`任务进度已存在${progressSum}/100,新建失败`);
                    return;
                }
                modalConfig = _.cloneDeep(_rootThis.taskModalConfig);
                modalConfig.onOk = () => {
                    // if ()
                    _rootThis.addNormalTask('r');// 推送任务至后端
                };
                modalConfig.okText = '添加';
            }
            _rootThis.$Modal.confirm(modalConfig);
        },
        remove (root, node, data) {
            let _this = this;
            let notDeleteType = ['P', 'D', 'C', 'A'];
            if (data.t.progress === '100' || notDeleteType.indexOf(data.t.taskType) !== -1) {
                _this.$Message.warning('任务依赖其他任务,删除失败');
                return;
            }
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
