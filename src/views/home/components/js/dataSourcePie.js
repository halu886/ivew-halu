
import echarts from 'echarts';
import _ from 'lodash';
import axios from 'axios';
// let data = [{
//     value: 2103456,
//     name: 'ios',
//     itemStyle: { normal: { color: '#9bd598' } }
// },
// {
//     value: 1305923,
//     name: 'android',
//     itemStyle: { normal: { color: '#ffd58f' } }
// },
// {
//     value: 543250,
//     name: 'pc',
//     itemStyle: { normal: { color: '#abd5f2' } }
// },
// {
//     value: 798403,
//     name: 'web',
//     itemStyle: { normal: { color: '#ab8df2' } }
// },
// {
//     value: 302340,
//     name: 'others',
//     itemStyle: { normal: { color: '#e14f60' } }
// }];
export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            axios.get('/task/chart/countType').then((response) => {
                let data = response.data;
                if (!data.status) {
                    throw new Error('分布统计数据异常');
                }
                let types = [];
                let colors = ['#9bd598', '#ffd58f', '#abd5f2', '#ab8df2', '#e14f60'];
                let indexColor = 0;
                _.map(data.data, (item) => {
                    types.push(item.name);
                    item.itemStyle = { normal: { color: colors[indexColor++] } };
                });
                var dataSourcePie = echarts.init(
                    document.getElementById('data_source_con')
                );
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: types
                    },
                    series: [
                        {
                            name: '类型分布',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data: data.data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            }).catch((e) => {
                this.$Message.error({ content: e.stack, duration: 0, closable: true });
            });
        });
    }
};
