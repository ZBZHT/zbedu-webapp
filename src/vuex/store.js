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
    errorArr:[],
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
    CheckArr:[],
    vuexx:0

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
    userMessagePickedArr(state,item){
        state.userMessage.push(item);
    },
    userMessageTime(state,item){
        state.userMessage.push(item);
    },
    userMessageSorce(state,item){
        state.userMessage.push(item);
    },
    getUserMessageData(state,item){
        state.userMessage = [];
    },
    errorArrData(state,item){
        state.errorArr.push(item); 
    },
    ClearErrorArrData(state,item){
        state.errorArr = []; 
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
    },
    getvuex(state,item){
        state.vuexx = item;
    }
},
 plugins: [createPersistedState()]
})
