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
    allTestNum:''
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
    username(state,item){
      state.username = item;
    },
    allTestNum(state,item){
      state.allTestNum = item;
    }
},
 plugins: [createPersistedState()]
})
