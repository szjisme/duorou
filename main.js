import Vue from 'vue'
import App from './App'

import store from './store'
// 引入公共js
import common from './common/common.js'
import loadMore from './components/uni-pro/load-more'
Vue.prototype.$eventHub = new Vue();
Vue.prototype.common = common
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.apiServer = 'http://api.succulents.fxb-team.com';
App.mpType = 'app'
Vue.component('load-more',loadMore)
const app = new Vue({
    store,
    ...App
})
function formatTime(date) {  
  var year = date.getFullYear()  
  var month = date.getMonth() + 1  
  var day = date.getDate()  
  
  var hour = date.getHours()  
  var minute = date.getMinutes()  
  var second = date.getSeconds()  
  
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')  
}  
function formatNumber(n) {  
  n = n.toString()  
  return n[1] ? n : '0' + n  
}  
  
module.exports = {  
  formatTime: formatTime  
}
app.$mount()

