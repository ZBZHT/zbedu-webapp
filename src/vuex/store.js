import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
export default new Vuex.Store({
 state : {
    username:'',
    userType:'',
    userTypeC:'',
    course:'',
    noTree:{},
    noTree1:{},
    session:{},
    allTestNum:'',
    vuexState:'',
    stillBtn:false,
    userID:'',
    testCode:0,
    exerciseData:'',
    competitionData:'',
    newBannerLeft:[],
    classGrade:'',
    mondayData:'',
    activeName:'',
    cmsID:'',
    loginPage:false, //登录页面显示-关闭
    serverIP: ''//后台返回的服务器ip
},
 mutations : {
   activeName(state,item){
     state.activeName = item;
   },
    newTitle(state,item){
        state.course = item;
    },
    noTreeTitle(state,item){
        state.noTree = item;
    },
    noTreeTitle1(state,item){
        state.noTree1 = item;
    },
    sessionTitle(state,item){
        state.session = item;
    },
    username(state,item){
        state.username = item;
    },
    userType(state,item){
        state.userType = item;
    },
    userTypeC(state,item){
        state.userTypeC = item;
    },
    allTestNum(state,item){
        state.allTestNum = item;
    },
    vuexState(state,item){
        state.vuexState = item;
    },
    stillBtn(state,item){
        state.stillBtn = item;
    },
    userID(state,item){
        state.userID = item;
    },
    testCode(state,item){
        state.testCode = item;
    },
    exerciseData(state,item){
        state.exerciseData = item;
    },
    competitionData(state,item){
        state.competitionData = item;
    },
    newBannerLeft(state,item){
        state.newBannerLeft = item;
    },
    getClassGrade(state,item){
        state.classGrade = item;
    },
    getMonday(state,item){
        state.mondayData = item;
    },
    cmsID(state,item){
        state.cmsID = item;
    },
   loginPage(state,item){
     state.loginPage = item;
   },
   serverIP(state,item){
     state.serverIP = item;
   }
},
 plugins: [createPersistedState()]
})
