// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
//自行撰寫的套件放下面
import App from "./App";
import router from "./router";
import "./bus";
import currencyFilter from "./filters/currency";

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
//axios 默認是發送請求的時候不會帶上 cookie 的，需要通過設置 withCredentials: true
Vue.component("Loading", Loading);
//直接寫在全域 讓各元件都能使用
Vue.filter("currencyFilter", currencyFilter);
//註冊換算千分號到全域

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  // console.log("to", to, "form", from);
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    // 申請的路徑 跟 個人API PATH
    //因為API是變動的 因此可以在config資料夾內的兩份env檔案宣告成變數取出使用  (環境變數)
    axios.post(api).then(response => {
      console.log(response.data);
      // 上方因為此段不是在vue實體內所以沒辦法用this.$http呼叫  直接使用axios套件
      if (response.data.success) {
        next();
        //如果登入成功則直接執行next()
      } else {
        alert("請重新登入");
        next({
          path: "/login"
        });
        // 反之則跳回login頁面，寫法則用物件包起來
      }
    });
  }
  if (to.name === "Login") {
    const api = `${process.env.APIPATH}/logout`;
    // 申請的路徑 跟 個人API PATH
    //因為API是變動的 因此可以在config資料夾內的兩份env檔案宣告成變數取出使用  (環境變數)

    axios.post(api).then(response => {
      // console.log(response.data);
      //因為文件上這筆API要用POST方法接受 所以POST()內要寫資料來源  但登出事件API 不用傳參數 所以只要打api
      if (response.data.success) {
        next();
        //下面這個代表當我要去的頁面是login 我就跳轉
      }
    });
  }
});
