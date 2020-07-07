<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
  // created() {
  //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
  //   console.log(process.env.APIPATH, process.env.CUSTOMPATH);
  //   // 申請的路徑 跟 個人API PATH
  //   //因為API是變動的 因此可以在config資料夾內的兩份env檔案宣告成變數取出使用  (環境變數)
  //   this.$http.get(api).then(response => {
  //     console.log(response.data);
  //   });
  // }
};
</script>

<style lang="scss">
// @import "~bootstrap/scss/bootstrap";  第一種作法
@import "./assets/all.scss";
// 客製化作法
</style>
