<template>
  <div class="footer-bigbox">
    <div class="footer-box">
      <p class="row1" v-html="msg">
      </p>
      <p v-html="telmsg">
      </p>
      <p>
        {{ address }}
      </p>
      <p>
        {{ eaddress}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data () {
      return {
        msg: '企业合作\n' + '<span>|</span>\n' + ' 联系我们\n' + '<span>|</span>\n' + '常见问题\n' + '<span>|</span>\n' + '意见反馈\n',
        telmsg: '电话TEL：02586800950\n' +
        '            <span>|</span>\n' +
        '            网址WEB：www.zbtchina.com\n',
        address: '公司地址：中国南京秦淮区应天大街388号 1865科技产业园E10栋\n',
        eaddress: 'ADD:E10 Area 1865 Industrial Park,Ying Tian Street,NanJing.CHINA\n'
      }
    }
  }
</script>

<style scoped>
  .footer-bigbox{
    width: 100%;
    height: 130px;
    background-color: #22132d;
  }
  .footer-box{
    color: #a5a2a7;
    margin: 0 auto;
    width: 960px;
    height: 130px;
    font-size: 12px;
    text-align: center;
    padding-top: 14px;
    margin-top: 40px;
    box-sizing: border-box;
  }
  p{
    margin: 0 0 10px;
  }
  .row1{
    margin-bottom: 15px;
  }
  @media screen and (max-width: 580px){
    .footer-box{
      /*display: none;*/
    }
  }
</style>
