import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);



export default new Vuex.Store({
 state : {
    username:'',
    course:'',
    noTree:{},
    session:{},
    userMessage:[],
    Display:'',
    pickedArr:{},
    getTextQuestionData:'',
    testStartTime:'',
    testStartTimeMinute:'',
    testStartTimeSecond:'',
    testTimeMinutes:'',
    testTimeSeconds:'',
    startBtnDispear:'',
    CheckNum:0,
    CheckArr:{}

},
 mutations : {
    newTitle(state,item){
        state.course = item;
    },
    noTreeTitle(state,item){
        state.noTree = item;
    },
    sessionTitle(state,item){
        state.session = item;
    },
    getUserMessage(state,item){
        state.userMessage.push(item);
    },
    getDisplay(state,item){
        state.Display = item;
    },
    pickedArr(state,item){
        state.pickedArr = item;
    },
    getTextQuestionData(state,item){
        state.getTextQuestionData = item;
    },
    testStartTime(state,item){
        state.testStartTime = item;
    },
    testStartTimeMinute(state,item){
        state.testStartTimeMinute = item;
    },
    testStartTimeSecond(state,item){
        state.testStartTimeSecond = item;
    },
    testTimeMinutes(state,item){
        state.testTimeMinutes = item;
    },
    testTimeSeconds(state,item){
        state.testTimeSeconds = item;
    },
    startBtnDispear(state,item){
        state.startBtnDispear = item;
    },
    CheckNum(state,item){
        state.CheckNum = item;
    },
    CheckArr(state,item){
        state.CheckArr = item;
    },
    username(state,item){
      state.username = item;
    }
},
 plugins: [createPersistedState()]
})
