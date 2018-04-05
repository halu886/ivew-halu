<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import echarts from "echarts";
import _ from "lodash";
import axios from "axios";
export default {
  name: "serviceRequests",
  mounted() {
    axios
      .get("/task/chart/serviceRequest")
      .then(response => {
        let data = response.data;
        if (!data.status) {
          throw new Error("上周每日任务操作量报表查询");
        }
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          grid: {
            top: "3%",
            left: "1.2%",
            right: "1%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "T",
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {
                  color: "#2d8cf0"
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: "P",
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {
                  color: "#10A6FF"
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: "D",
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {
                  color: "#0C17A6"
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: "C",
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {
                  color: "#4608A6"
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: "A",
              type: "line",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "top"
                }
              },
              areaStyle: {
                normal: {
                  color: "#398DBF"
                }
              },
              data: [0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        };
        _.map(option.series, serie => {
          serie.data = data.data[serie.name];
        });
        const serviceRequestCharts = echarts.init(
          document.getElementById("service_request_con")
        );
        serviceRequestCharts.setOption(option);

        window.addEventListener("resize", function() {
          serviceRequestCharts.resize();
        });
      })
      .catch(e => {
        this.$Message.error({ content: e.stack, duration: 0, closable: true });
      });
  }
};
</script>