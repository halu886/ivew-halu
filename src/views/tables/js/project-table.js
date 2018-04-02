import axios from 'axios';
import _ from 'lodash';
export default {
    name: 'editable-table',
    components: {
    },
    data () {
        let projectColumn = [
            {
                title: '名称',
                key: 'Name',
                fixed: 'left',
                sortable: true
            },
            {
                title: '创建日期',
                key: 'CreateDate',
                sortable: true
            },
            {
                title: '剩余子任务',
                key: 'unHandlerTask',
                sortable: true
            },
            {
                title: '待完成进度',
                key: 'unHandlerProgress',
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
                fixed: 'right',
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
                                    this.show(params.index)
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
                                    // TODO
                                    // this.remove(params.index)
                                }
                            }
                        }, 'Delete')
                    ]);
                }
            }
        ]
        return {
            searchConName1: '',
            projectTotal: 0,
            pageSize: 10,
            pageNum: 1,
            projectData: [],
            projectColumn: projectColumn
        };
    },
    methods: {
        rowClassName (row, index) {
            let item = row.item;
            if (!item.status) {
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
            let params = { size: size, page: page };
            if (searchParam) params.searchParam = searchParam;
            axios.get('/project/pageSelect', { params: params }).then((response) => {
                let data = response.data;
                if (!data.status) {
                    throw new Error('查询异常');
                }
                this.projectTotal = data.total;
                _.map(data.data, (item) => {
                    item.
                });
                this.projectData = data.data;
            }).catch((e) => {
                this.$message.error({ content: e.stack, duration: 0, closable: true });
            });
        }
    },
    created () {
        this.getData(this.pageSize, this.pageNum);
    }
};
