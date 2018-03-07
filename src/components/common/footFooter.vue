<template>
  <div class="footer-bigbox">
    <div class="footer-box">
      <p class="row1">
        {{address1}}
      </p>
      <p>
        {{address2}}
      </p>
      <p>
        {{telAddress}}
      </p>
      <p>
        {{belong}}
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
        address1: '南京中邦智慧教育科技有限公司',
        address2: '南京中邦技术集团',
        telAddress: 'TEL：025-86800950',
        belong: '版权所有  南京中邦智慧教育科技有限公司\n'
      }
    }
  }
</script>

<style scoped>
  .footer-bigbox{
    width: 100%;
    height: 120px;
    background-color: #6a1518;
  }
  .footer-box{
    color: #ddd;
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
    margin: 0 0 5px;
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
