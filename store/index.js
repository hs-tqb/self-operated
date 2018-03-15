import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = ()=>new Vuex.Store({
  state: {
    messageDialog: {
      show:false,
      text:'',
      delay:3000,
      timer:-1
    },
  },
  mutations: {
    showMessageDialog(state, obj) {
      if ( !obj.text ) return;
      let dialog = state.messageDialog;
      clearTimeout(dialog.timer);
      dialog.timer = setTimeout(()=>{
        dialog.show = false;
      }, obj.delay||dialog.delay);
      dialog.text = obj.text;
      dialog.show = true;
    }
  }
})

export default store