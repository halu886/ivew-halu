<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import _ from "lodash";
export default {
  name: "visiteVolume",
  data() {
    return {};
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      let visiteVolume = echarts.init(
        document.getElementById("visite_volume_con")
      );
      axios.get("/task/chart/countAddTaskWeek").then(response => {
        if (!response.data.status) {
          return;
        }
        let data = response.data.data;
        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        for (let i = 0; i < 20; i++) {
          xAxisData.push("类目" + i);
          data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
          data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }
        _.map(data, item => {
          item.itemStyle = { normal: { color: "#2d8cf0" } };
        });
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            top: 0,
            left: "2%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: "category",
            data: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
            nameTextStyle: {
              color: "#c3c3c3"
            }
          },
          series: [
            {
              name: "数量",
              type: "bar",
              data: data
            }
          ]
        };

        visiteVolume.setOption(option);
        window.addEventListener("resize", function() {
          visiteVolume.resize();
        });
      });
    });
  }
};
</script>
