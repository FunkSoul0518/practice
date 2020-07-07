<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Alert from "./alertMsg";

export default {
  // 下方引入拆出來的版型
  components: {
    Navbar,
    Sidebar,
    Alert
  },
  methods: {
    // signout() {
    //   const api = `${process.env.APIPATH}/logout`;
    //   // 申請的路徑 跟 個人API PATH
    //   //因為API是變動的 因此可以在config資料夾內的兩份env檔案宣告成變數取出使用  (環境變數)
    //   const vm = this;
    //   this.$http.post(api).then(response => {
    //     // console.log(response.data);
    //     //因為文件上這筆API要用POST方法接受 所以POST()內要寫資料來源  但登出事件API 不用傳參數 所以只要打api
    //     if (response.data.success) {
    //       vm.$router.push("/login");
    //     }
    //     //這串IF判斷式代表如果登入成功 則透過vue-router的指令回到指定頁面
    //   });
    // }
  }
};
</script>
