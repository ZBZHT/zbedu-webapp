<template>
  <div class="footer-bigbox-1">
    <div class="footer-box-1">
      <p>
        Copyright © 2016 南京中邦智慧教育科技有限公司
        <!--{{belong}}-->
        <a style="text-decoration:underline" href="http://www.zbttchina.com/zbtH5/">http://www.zbttchina.com/</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data () {
      return {
  //      msg: '企业合作\n' + '<span>|</span>\n' + ' 联系我们\n' + '<span>|</span>\n' + '常见问题\n' + '<span>|</span>\n' + '意见反馈\n',
  //      telmsg: '南京中邦智慧教育科技有限公司\n' +
  //      '            <span>|</span>\n' +
  //      '             南京中邦技术集团',
  //      address1: '南京中邦智慧教育科技有限公司',
  //      address2: '南京中邦技术集团',
  //      telAddress: 'TEL：025-86800950',
  //      belong: 'Copyright © 2016 南京中邦智慧教育科技有限公司'
      }
    }
  }
</script>

<style scoped>
  .footer-bigbox-1{
    width: 100%;
    height: 44px;
    background-color: #000;
    position:fixed;
    bottom:0;
  }
  .footer-box-1{
    color: #ddd;
    margin: 0 auto;
    width: 960px;
    height: 44px;
    font-size: 12px;
    text-align: center;
  }
  p{
    line-height:44px;
  }
  .row1{
    margin-bottom: 5px;
  }
  @media screen and (max-width: 580px){
    .footer-box{
      /*display: none;*/
    }
  }
</style>
