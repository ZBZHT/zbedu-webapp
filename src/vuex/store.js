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
    homeworkData:[]
},
 mutations : {
    homework(state,item){
        state.homeworkData = item;
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
    }
},
 plugins: [createPersistedState()]
})
