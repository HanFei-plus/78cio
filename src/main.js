import Vue from 'vue'
import share from '@/components/share'
import vueTouch from 'vue-touch'

Vue.config.productionTip = false

Vue.use(vueTouch,{name:'v-touch'})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(share)
})
