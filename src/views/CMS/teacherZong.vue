<template>
<div>
      <div class="err" v-for="item in errD">
        {{item}}
        <div :id="item">
        
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
          series: {
                type: 'pie',
                data: [
                    {name: 'A', value: 1212},
                    {name: 'B', value: 2323},
                    {name: 'C', value: 1919}
                ]
            }
      },
      echarts2_option:{
          series: {
                type: 'pie',
                data: [
                    {name: 'A', value: 1000},
                    {name: 'B', value: 1000},
                    {name: 'C', value: 1000}
                ]
            }
      },
      errD:["echartss1","echartss2","echartss3"]
    }
  },
 mounted() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echartss1'));
      // 绘制图表，this.echarts1_option是数据
      myChart.setOption(this.echarts1_option);

      let myChart2 = echarts.init(document.getElementById('echartss2'));
      myChart2.setOption(this.echarts2_option);
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
#echartss1{
    width:500px;
    height:300px;
    overflow: inherit;
}
#echartss2{
    width:500px;
    height:300px;
    overflow: inherit;
}
</style>
