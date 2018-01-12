import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state ={
    course:{},
    noTree:{}
}
const mutations ={
    newTitle(state,item){
        state.course = item;
    },
    noTreeTitle(state,item){
        state.noTree = item;
    }
}
const getter ={
    
}
export default new Vuex.Store({
    state,
    getter,
    mutations,
})