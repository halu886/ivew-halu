
import echarts from 'echarts';
import _ from 'lodash';
import axios from 'axios';
let data = [{
    value: 2103456,
    name: 'ios',
    itemStyle: { normal: { color: '#9bd598' } }
},
{
    value: 1305923,
    name: 'android',
    itemStyle: { normal: { color: '#ffd58f' } }
},
{
    value: 543250,
    name: 'pc',
    itemStyle: { normal: { color: '#abd5f2' } }
},
{
    value: 798403,
    name: 'web',
    itemStyle: { normal: { color: '#ab8df2' } }
},
{
    value: 302340,
    name: 'others',
    itemStyle: { normal: { color: '#e14f60' } }
}];
export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            axios.get('/task/distributeCount').then((response) => {
                let data = response;
                if (!data.status) {
                    throw new Error('分布统计数据异常');
                }
                _.map(data.data, (item) => {
                    item.itemStyle = { normal: { color: '#9bd598' } };
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
                        data: ['ios', 'android', 'pc', 'web', 'others']
                    },
                    data: data.data,
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data: [

                            ],
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
                this.$Message.error(e.stack);
            });
        });
    }
};
