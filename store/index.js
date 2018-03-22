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
      if ( !obj.text && !obj.html && !obj.type ) return;
      let dialog = state.messageDialog;

      dialog.show = false;
      dialog.type = 
      dialog.text = 
      dialog.html = '';

      clearTimeout(dialog.timer);
      dialog.timer = setTimeout(()=>{
        dialog.show = false;
      }, obj.delay||dialog.delay);

      dialog.type = obj.type;
      dialog.html = (obj.html||'').toString().trim();
      dialog.text = (obj.text||'').toString().trim();
      dialog.show = true;
    }
  }
})

export default store