import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'lodash';
import cityData from '../map-data/get-city-value.js';
import homeMap from '../components/map.vue';
import dataSourcePie from '../components/dataSourcePie.vue';
import visiteVolume from '../components/visiteVolume.vue';
import serviceRequests from '../components/serviceRequests.vue';
import userFlow from '../components/userFlow.vue';
import countUp from '../components/countUp.vue';
import inforCard from '../components/inforCard.vue';
import mapDataTable from '../components/mapDataTable.vue';
import toDoListItem from '../components/toDoListItem.vue';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data () {
        return {
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            project: {
                handler: 0,
                unHandler: 0
            },
            task: {
                handler: 0,
                unHandler: 0
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: '',
            user: {}
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        loadData () {
            var _this = this;
            axios.get('/user/countOfIndex').then(response => {
                let result = response.data;
                if (result.status) {
                    _this.task = result.data.task;
                    _this.project = result.data.project;
                }
            }).catch((e) => {
                // alert(e);
            });
        }
    },
    created: function () {
        this.loadData();
        this.user.name = Cookies.get('user');
        this.user.role = Cookies.get('role');
    }
};
