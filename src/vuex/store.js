import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);



export default new Vuex.Store({
 state : {
    course:'',
    noTree:{},
    session:{},
    userMessage:'',
    Display:''
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
        state.userMessage = item;
    },
    getDisplay(state,item){
        state.Display = item;
    }
},
 plugins: [createPersistedState()]
})
