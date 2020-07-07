import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/pages/login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/Products";
import Orders from "@/components/order";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    // 上方代表如果用戶輸入不正確的網址 避免狀況發生 自行導回登入也面
    // {
    //   path: "/",
    //   name: "login",
    //   component: Login
    //   // meta: { requiresAuth: true }
    //   //meta這個變數是方便守衛做驗證  requir這個可以自定義名稱
    // },
    {
      path: "/login",
      //路徑盡可能小寫
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      //路徑盡可能小寫
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "products",
          //路徑盡可能小寫
          name: "Products",
          component: Products,
          meta: { requiresAuth: true }
        },
        //額外寫children因為是頁面中主要內容 所以用router-view然後巢狀  驗證的meta要放內層
        //meta這個變數是方便守衛做驗證  requir這個可以自定義名稱
        {
          path: "orders",
          //路徑盡可能小寫
          name: "orders",
          component: Orders
          // meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
