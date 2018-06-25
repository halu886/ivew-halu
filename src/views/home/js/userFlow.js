import echarts from 'echarts';
import axios from 'axios';

const option = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: '未完成',
            type: 'gauge',
            min: 0,
            max: 1000,
            detail: {
                formatter: '{value}',
                fontSize: 18,
                offsetCenter: [0, '50px']
            },
            data: [{ value: 50, name: '未完成进度' }],
            center: ['25%', '50%'],
            radius: '80%',
            title: {
                offsetCenter: [0, '80px']
            },
            axisLine: {
                lineStyle: {
                    // color: [],
                    width: 20
                }
            },
            splitLine: {
                length: 20
            }
        },
        {
            name: '已完成',
            type: 'gauge',
            min: 0,
            max: 1000,
            detail: {
                formatter: '{value}',
                fontSize: 18,
                offsetCenter: [0, '50px']
            },
            data: [{ value: 50, name: '已完成进度' }],
            center: ['75%', '50%'],
            radius: '80%',
            title: {
                offsetCenter: [0, '80px']
            },
            axisLine: {
                lineStyle: {
                    // color: [],
                    width: 20
                }
            },
            splitLine: {
                length: 20
            }
        }
    ]
};

export default {
    name: 'userFlow',
    mounted () {
        axios.get('/task/chart/taskflow').then(response => {
            let data = response.data;
            if (!data.status) {
                throw Error('加载失败');
            }
            let userFlow = echarts.init(document.getElementById('user_flow'));
            option.series[0].max = (1 + (parseInt(data.data['unHandler'] || 0 / 100))) * 100;
            option.series[0].data[0].value = data.data['unHandler'] || 0;
            option.series[1].data[0].value = data.data['handler'] || 0;
            option.series[1].max = (1 + parseInt(data.data['handler'] || 0 / 100)) * 100;
            userFlow.setOption(option);

            window.addEventListener('resize', function () {
                userFlow.resize();
            });
        }).catch(e => { this.$message.error({ content: e.stack, duration: 0, closable: true }); });
    }
};
