<template>
  <div class="competitionCenter-container">
    <div>
      <navgation-head></navgation-head>
    </div>

    <div class="competitionCenter-content">
      <div class="findTree" @mouseover="showTree" @mouseout="disTree">
        <span class="showTree" v-show="showTreeData === 0">
          <i class="el-icon-d-arrow-right icon-right"></i>
        </span>
        <div class="oTree" v-show="showTreeData === 1">
          <el-tree
            node-key="id"
            :default-expanded-keys="[courseId1,courseId2]"
            :props="defaultProps"
            :data="data"
            highlight-current
            ref="comtree"
            @node-click="handleNodeClick"></el-tree>
        </div>
      </div>

      <div class="oCourse">
        <!--大赛资讯-->
        <div v-show="is697">
          <p class="exerP">{{competitionData.label}}</p>
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="通知文件" :name="descTab">
              <div class="exerEngImg">
                <p class="exerEngImgTitle">{{competitionData.title}}</p>
                <p class="exerEngImgSTitle">{{competitionData.sTitle}}</p>
                <div v-for="item in competitionData.content">
                  <p class="exerEngImgContent">{{item.content}}</p>
                </div>
                附件：
                <div v-for="item in competitionData.moreText">
                  <p class="exerEngmoreText" @click="sendName(item.text)">{{item.text}}</p>
                </div>
                <p class="exerEngImgSTitle">{{competitionData.address}}</p>
                <p class="exerEngImgSTitle">{{competitionData.time}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="大赛规程">
              <div class="exerEngRule">
                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                  <param name="_Version" value="65539">
                  <param name="_ExtentX" value="20108">
                  <param name="_ExtentY" value="10866">
                  <param name="_StockProps" value="0">
                  <param name="SRC" value="teachingMaterial">
                  <object :data="'/resource/pdf/competitionData/' + competitionData.ruleText" type="application/pdf"
                          class="pdf-box">
                  </object>
                </object>
              </div>
            </el-tab-pane>
            <el-tab-pane label="筹划·目标">筹划·目标</el-tab-pane>
          </el-tabs>
        </div>

        <!--历届回顾-->
        <div v-show="is123">
          <p class="exerP">{{competitionData.label}}</p>
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="通知文件" :name="descTab">
              <div class="exerEngImg">
                <!--<p class="exerEngImgTitle">{{competitionData.title}}</p>-->
                <!--<p class="exerEngImgSTitle">{{competitionData.sTitle}}</p>-->
                <!--<div v-for="item in competitionData.content">-->
                <!--<p class="exerEngImgContent">{{item.content}}</p>-->
                <!--</div> -->
                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                  <param name="_Version" value="65539">
                  <param name="_ExtentX" value="20108">
                  <param name="_ExtentY" value="10866">
                  <param name="_StockProps" value="0">
                  <param name="SRC" value="teachingMaterial">
                  <object :data="'/resource/pdf/competitionData/' + competitionData.informpdf" type="application/pdf"
                          class="pdf-box">
                  </object>
                </object>
                附件：
                <div v-for="item in competitionData.moreText">
                  <p class="exerEngmoreText" @click="sendName(item.text)">{{item.text}}</p>
                </div>
                <!--<p class="exerEngImgSTitle">{{competitionData.address}}</p>-->
                <!--<p class="exerEngImgSTitle">{{competitionData.time}}</p>-->
              </div>
            </el-tab-pane>
            <el-tab-pane label="大赛规程">
              <div class="exerEngRule">
                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                  <param name="_Version" value="65539">
                  <param name="_ExtentX" value="20108">
                  <param name="_ExtentY" value="10866">
                  <param name="_StockProps" value="0">
                  <param name="SRC" value="teachingMaterial">
                  <object :data="'/resource/pdf/competitionData/' + competitionData.ruleText" type="application/pdf"
                          class="pdf-box">
                  </object>
                </object>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实况·硕果">
              <div class="exerEngImg">
                <p class="exerEngImgTitle">{{competitionData.historyTitle}}</p>
                <div v-for="item in competitionData.historyContent">
                  <p class="exerEngImgContent">{{item.historyContent}}</p>
                </div>
                <div class="exerEngImage" v-for="item in competitionData.historyImg">
                  <img :src=" '/resource/imgs/competition/' + item.historyImg">
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!--实战专题-->
        <div v-show="is926">
          <p class="exerP">{{competitionData.label}}</p>
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="实战目标" :name="descTab">
              <div class="exerEngImg">
                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                  <param name="_Version" value="65539">
                  <param name="_ExtentX" value="20108">
                  <param name="_ExtentY" value="10866">
                  <param name="_StockProps" value="0">
                  <param name="SRC" value="teachingMaterial">
                  <object :data="'/resource/pdf/competitionData/' + competitionData.goalpdf" type="application/pdf"
                          class="pdf-box">
                  </object>
                </object>
              </div>
            </el-tab-pane>
            <el-tab-pane label="教学资料">
              <div class="exerEngRule">

              </div>
            </el-tab-pane>
            <el-tab-pane label="大赛课件">
              <div class="exerEngImg">

              </div>
            </el-tab-pane>
            <el-tab-pane label="大赛视频">
              <div class="exerEngImg">
                <!--<img :src=" '/resource/imgs/' + competitionData.ruleText">-->
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!--预选赛啊-->
        <div v-show="isYXS">
          <p class="exerP">{{competitionData.label}}</p>

          <el-tabs type="border-card" v-model="activeName">
            <div v-for="(item,index) in teacherList">
              <el-tab-pane :label="item">
                <div class="competitionAdd" v-for="(item2,index2) in studentList" v-show="index == index2">
                  <div class="competitionAdd1" v-for="(item3,index3) in item2">

                    <div id="convas1">
                      <span id="aaa" @mousedown="move" @touchmove="move"></span>
                      <canvas id="tutorial"></canvas>



                    </div>

                    clientX: {{clientX}}
                    clientY: {{clientY}}
                    layerX: {{layerX}}
                    layerY: {{layerY}}
                    offsetX: {{offsetX}}
                    offsetY: {{offsetY}}
                    pageX: {{pageX}}
                    pageY: {{pageY}}
                    <div>
                      {{positionX}}
                      {{positionY}}
                    </div>

                    <div class="studentName" v-for="(item4,index4) in item3">
                      {{item4}}
                    </div>
                    <div class="joinButton">
                      <el-button size="small" type="primary" @click="IWantAdd(item)">
                        我要报名
                      </el-button>
                    </div>

                    <div class="competitionTip">
                      {{item}}老师队共需1人，还差1人
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </div>

          </el-tabs>

        </div>
      </div>
    </div>

    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import footFooter from '@/components/common/footFooter'

  export default {
    name: 'competitionCenter',
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        is697: true,
        is123: false,
        is926: false,
        isYXS: false,
        courseId1: '',
        courseId2: '',
        keyId: '',
        activeName: '',
        descTab: '0',
        teacherList: ['xxx', 'yyy'],
        showTreeData: 0,
        studentList: [
          {
            xxx: ['aaa', 'bbb']
          },
          {
            yyy: ['ccc', 'ddd']
          }
        ],
        clientX: 0,
        clientY: 0,
        layerX: 0,
        layerY: 0,
        offsetX: 0,
        offsetY: 0,
        pageX: 0,
        pageY: 0,
        positionX: 0,
        positionY: 0

      }
    },
    computed: {
      competitionData(){
        return this.$store.state.competitionData
      }
    },
    watch: {

    },
    methods: {
      /* click和touch事件 */
      draw(){
        var ctx = document.getElementById('tutorial').getContext('2d');

        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
        ctx.stroke(); //描边。stroke不会自动closePath()

      },

      move(e){

        if (e.touches) {
//          console.log('touch事件')
          document.addEventListener("touchstart",function(e){
            console.log(e);
            let odiv = e.touches[0].target;
            var touches = e.touches[0];
            let disX = touches.clientX - odiv.offsetLeft
            let disY = touches.clientY - odiv.offsetTop
            document.addEventListener("touchmove",function(e) {
              var touches = e.touches[0];
              let left = touches.clientX - disX;
              let top = touches.clientY - disY;
              this.positionX = top
              this.positionY = left
              odiv.style.left = left + "px";
              odiv.style.top = top + "px";
            },false)
          },false)

        } else {

          console.log('鼠标事件')
          this.clientX = e.clientX
          this.clientY = e.clientY
          this.layerX = e.layerX
          this.layerY = e.layerY
          this.offsetX = e.offsetX
          this.offsetY = e.offsetY
          this.pageX = e.pageX
          this.pageY = e.pageY
          let odiv = e.target;

          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft
          let disY = e.clientY - odiv.offsetTop
          this.clientX = e.clientX
          this.clientY = e.clientY
          document.onmousemove = (e) => {       //鼠标按下并移动的事件
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX
            let top = e.clientY - disY
            //绑定元素位置到positionX和positionY上面
            this.positionX = top
            this.positionY = left + 50
            //移动当前元素
            odiv.style.left = left + 'px'
            odiv.style.top = top + 'px'
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };

        }
      },

      //      展示树形
      showTree () {
        this.showTreeData = 1
      },
      disTree () {
        this.showTreeData = 0
      },
      //报名提示
      IWantAdd(val){
        this.$alert('确定加入' + val + '老师队?', '我要报名', {
          confirmButtonText: '确定'
        }).then(() => {
          this.IWantAddSure();
        }).catch(() => {

        });

      },
      //报名点击确定
      IWantAddSure(){
        this.$message({
          type: 'success',
          message: `报名成功`
        });
      },
      //下载文件
      sendName(item){
        axios({
          method: 'get',
          url: '/fileUpDown/downComp',
          responseType: 'blob',
          params: {
            downloadName: item
          }
        }).then((res) => { // 处理返回的文件流
          let content = res.data;
          let blob = new Blob([content]);
          if ('download' in document.createElement('a')) { // 非IE下载
            let elink = document.createElement('a');
            elink.download = item;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);// 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, item)
          }
        })
      },
      handleNodeClick(data) {
        //右侧显示不同页面
        console.log(data);
        var id = data.id;
        if (id == 3110 || id == 3120 || id == 3130) {
          //console.log(id)
          //console.log(id.toString() + 1)
          this.is697 = true;
          this.is123 = false;
          this.is926 = false;
          this.isYXS = false;
        } else if (id == 3210 || id == 3220 || id == 3230) {
          //console.log("aaaa")
          //console.log(id.toString())
          this.is697 = false;
          this.is926 = false;
          this.is123 = true;
          this.isYXS = false;
        } else if (id > 4000 && id < 5000) {
          if (id == 4100 || id == 4200 || id == 4300) {

          } else {
            //console.log("aaaa")
            //console.log(id.toString())
            this.is697 = false;
            this.is926 = true;
            this.is123 = false;
            this.isYXS = false;
          }
        } else if (id == 5000) {
          this.is697 = false;
          this.is926 = false;
          this.is123 = false;
          this.isYXS = true;
          this.draw()
        }
        //刷新保存数据
        if (data.children) {

        } else {
          this.$store.commit('competitionData', data);
          this.activeName = this.descTab;
        }

      }


    },
    mounted(){

      axios.get("/readJson/bannerLeftData", {
        params: {
          user: 234
        }
      }).then((res) => {
        this.data = res.data[4].children;
        //console.log(this.data[0].label);
        setTimeout(() => {
          this.$refs.comtree.setCurrentKey(this.keyId)
        }, 20)
      }).catch(function (error) {
        console.log("error init." + error)
      });
      //默认展开，标红
      var id = this.$store.state.competitionData.id;
      if (id >= 3000 && id < 4000) {
        this.courseId1 = 3000;
        this.courseId2 = id;
        this.keyId = id;
      } else if (id >= 4000) {
        this.courseId1 = 4000;
        this.courseId2 = id;
        this.keyId = id;
      }
    },
    components: {navgationHead, footFooter}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  .xuanfu {
    height: 4.5rem;
    width: 4.5rem;
    z-index: 999;
    position: fixed;
    top: 4.2rem;
    right: 3.2rem;
    border-radius: 0.8rem;
    background-color: rgba(0, 0, 0, 0.55);
  }

  .yuanqiu {
    height: 2.7rem;
    width: 2.7rem;
    border: 0.3rem solid rgba(140, 136, 136, 0.5);
    margin: 0.65rem auto;
    color: #000000;
    font-size: 1.6rem;
    line-height: 2.7rem;
    text-align: center;
    border-radius: 100%;
    background-color: #ffffff;
  }

  #convas1 {
    position: relative;
    z-index: 500;
    width: 700px;
    height: 300px;
    border:1px solid red;
  }
  #aaa {
    display: block;
    z-index: 9999;
    position: absolute; /*定位*/
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: url('../assets/imgs/logo.png') no-repeat; /*设置一下背景*/
    background-size:100px 100px;
  }
  #tutorial {
    position: absolute;
    top:0;
    left:0;
    border:1px solid blue;
    background-color: cornsilk;
    width: 300px;
    height: 300px;
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: #f00;
  }

  a:focus {
    color: #f00;
    text-decoration: none;
  }

  hr {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .competitionCenter-content .competitionCenter-container {
    min-width: 960px;
  }

  .competitionCenter-content {
    width: 100%;
    margin: 0 auto;
    margin-top: 6px;
    margin-bottom: 80px;
    display: flex;
  }

  .competitionCenter-content .findTree {
    width: 1.5%;
    height: 100px;
    margin-top: 100px;
    box-shadow: 0 0 15px 8px #9f5355;
  }

  .competitionCenter-content .oTree {
    width: 250px;
    position: absolute;
    top: 190px;
    z-index: 1;
    overflow: auto;
    max-height: 768px;
  }

  .competitionCenter-content .icon-right {
    line-height: 100px;
    color: #9f5355;
    font-weight: bolder;
  }

  .competitionCenter-content .oCourse {
    z-index: 0;
    width: 98.5%;
  }

  .competitionCenter-content .exerP {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .competitionCenter-content .el-tree-node__expand-icon {
    font-size: 16px;
  }

  .competitionCenter-content .el-tree-node__label {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    color: #212529;
  }

  .competitionCenter-content .el-tree {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #9f5355;
    text-align: left;
  }

  .competitionCenter-content .el-tree-node:focus > .el-tree-node__content {
    background-color: #9f5355;
    color: white;
  }

  .competitionCenter-content .el-tree-node__content:hover {
    background-color: #9f5355;
    color: white;
  }

  .competitionCenter-content .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #212529;
  }

  .competitionCenter-content .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border: 3px solid #9f5355;
    padding: 0 60px;
    border-top: none;
    color: #212529;
  }

  .competitionCenter-content .el-tabs--border-card {
    margin-left: 20px;
    border: 0;
    border-top: 4px solid #9f5355;
    box-shadow: none;
  }

  .competitionCenter-content .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #9f5355;
    color: #ffffff;
  }

  .competitionCenter-content .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #9f5355;
    color: white;
  }

  .competitionCenter-content .el-tabs__item {
    padding: 0 60px;
    font-size: 18px;
    line-height: 36px;
  }

  .competitionCenter-content .el-tabs--border-card > .el-tabs__header {
    border: none;
    background-color: #ffffff;
  }

  .competitionCenter-content .el-tabs__nav {
    float: none;
  }

  .competitionCenter-content .exerEngImg {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: left;
  }

  .competitionCenter-content .exerEngImgTitle {
    margin-top: 10px;
    text-align: center;
    font-size: 22px;
  }

  .competitionCenter-content .exerEngImgSTitle {
    text-align: right;
  }

  .competitionCenter-content .exerEngImgContent {
    text-align: left;
    text-indent: 2em;
  }

  .competitionCenter-content .exerEngImage {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 40px;
  }

  .competitionCenter-content .exerEngmoreText {
    cursor: pointer;
  }

  .competitionCenter-content .exerEngImg img {
    width: 100%;
  }

  .competitionCenter-content .pdf-box {
    width: 100%;
    height: 800px;
  }

  .competitionCenter-content .el-col-6 {
    width: 16%;
  }

  .competitionCenter-content .el-tree {
    padding: 0;
    border: 0;
  }

  .competitionCenter-content .el-tree-node {
    background-color: #d2d2d2;
  }

  .competitionCenter-content .el-tree-node__content {
    border-bottom: 3px solid #ffffff;
  }

  .el-tree-node__expand-icon {
    color: #ffffff;
  }

  .competitionCenter-content .joinButton {
    text-align: left;
    margin-left: 25px;
    margin-bottom: 10px;
  }

  .competitionCenter-content .el-button--primary {
    background-color: rgb(159, 83, 85);
    border-color: rgb(159, 83, 85);
  }

  .competitionCenter-content .competitionAdd {
    width: 80%;
    height: 400px;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 15px;
    background: rgb(210, 210, 210);
    box-shadow: 3px -3px 30px #000;
    padding: 25px 25px 25px 35px;
    box-sizing: border-box;
    text-align: left;
    position: relative;
  }
  .competitionCenter-content .competitionAdd .competitionAdd1 {
    border: 1px red;
  }

  #yidongImg {
    position: relative; /*定位*/
    top: 0px;
    left: 0px;
    width: 200px;
    height: 200px;
    background: #666; /*设置一下背景*/
  }

  .competitionCenter-content .studentName {
    line-height: 50px;
    font-size: 18px;
  }

  .competitionCenter-content .competitionTip {
    position: absolute;
    right: 25px;
    bottom: 50px;
  }

  .competitionCenter-content .joinButton {
    position: absolute;
    right: 80px;
    bottom: 5px;
  }
</style>
