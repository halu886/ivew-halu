<template>
    <div style="width:100%;height:100%;" id="user_flow"></div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";

const option = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  series: [
    {
      name: "未完成",
      type: "gauge",
      min: 0,
      max: 1000,
      detail: {
        formatter: "{value}",
        fontSize: 18,
        offsetCenter: [0, "50px"]
      },
      data: [{ value: 50, name: "未完成进度" }],
      center: ["25%", "50%"],
      radius: "80%",
      title: {
        offsetCenter: [0, "80px"]
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
      name: "已完成",
      type: "gauge",
      min: 0,
      max: 1000,
      detail: {
        formatter: "{value}",
        fontSize: 18,
        offsetCenter: [0, "50px"]
      },
      data: [{ value: 50, name: "已完成进度" }],
      center: ["75%", "50%"],
      radius: "80%",
      title: {
        offsetCenter: [0, "80px"]
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
  name: "userFlow",
  mounted() {
    axios.get("/task/chart/taskflow").then(response => {
      let data = response.data;
      if (!data.states) {
        throw Error("加载失败");
      }
      let userFlow = echarts.init(document.getElementById("user_flow"));
      option.series[0],max = parseInt(++(data[unHandlerProgress]/100))*100;
      option.series[0].data[0].value = data[unHandlerProgress]||0;
      option.series[1].data[0].value =data[handlerProgress]||0;
      option.series[1],max = parseInt(++(data[handlerProgress]/100))*100;
      userFlow.setOption(option);

      window.addEventListener("resize", function() {
        userFlow.resize();
      });
    });
  }
};
</script>
