<template>
<div>
      <div class="err" v-for="item in errD">
        {{item}}
        <div id="echartss">
        
        </div>

      </div>
</div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      echarts1_option:{
          title: {
              text: 'ECharts 入门示例'
          },
          series: {
                type: 'pie',
                data: [
                    {name: 'A', value: 1212},
                    {name: 'B', value: 2323},
                    {name: 'C', value: 1919}
                ]
            }
      },
      errD:["1","2","3"]
    }
  },
 mounted() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echartss'));
      // 绘制图表，this.echarts1_option是数据
      myChart.setOption(this.echarts1_option);
    },
 methods:{
    
  },
}
</script>
<style>
.err{
    width:500px;
    height: 400px;
    border:1px solid #000;
    margin-left: 254px;
  }
#echartss{
    width:500px;
    height:300px;
    overflow: inherit;
}
</style>
