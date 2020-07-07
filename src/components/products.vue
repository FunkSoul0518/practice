<template>
  <div>
    <!-- loading效果 -->
    <loading :active.sync="isLoading"></loading>
    <!-- loading效果 -->
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="openModal(true)">
        建立新的產品
      </button>
      <!-- 改用事件寫法不用data-toogle可以決定視窗彈出的時間跟條件 -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currencyFilter }}
          </td>
          <td class="text-right">
            {{ item.price | currencyFilter }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div>
              <button
                class="btn btn-outline-primary btn-sm"
                @click.prevent="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click.prevent="deleteModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <pageNation :pages="Pagination" @changePagnation="getProduct"></pageNation>

    <!-- openModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>

                <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- deleteModa -->
    <div
      class="modal fade"
      id="deleteModal"
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">刪除產品</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            你確定要刪除此筆產品資料嗎?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="deleteProduct"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pageNation from "./Pagenation";

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      //要接API 商品建立時的資料放置變數
      isNew: false,
      //確認是新增還是編輯
      isLoading: false,
      Pagination: {}
    };
  },
  components: {
    pageNation
  },
  methods: {
    getProduct(page = 1) {
      //page = 1 為 ES6寫法 預設參數PAGE = 1  如果有變動則更改  這個page是API文件提供的分頁參數 對照下面的${page}
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      // 申請的路徑 跟 個人API PATH
      //因為API是變動的 因此可以在config資料夾內的兩份env檔案宣告成變數取出使用  (環境變數)
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.Pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        //因為物件傳參考的特性 避免資料互相影響 所以把需要編輯的品項 複製到一個新物件內更改
        this.isNew = false;
      }
      $("#productModal").modal("show");
      // $JQ內部的用法 所以上方要import JQ避免跳錯
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; //這邊的API改用let 避免無法更改
      let httpMethod = "post";
      //宣告http的變數是方便下面如果編輯的時候 直接更改資料傳送的方式從post>put
      // 申請的路徑 跟 個人API PATH
      //因為API是變動的 因此可以在config資料夾內的兩份env檔案宣告成變數取出使用  (環境變數)
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      /////分隔///////
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        //因為是POST 並且有參數要回傳 然後文件是物件包DATA 內部才是物件參數 所以上方要用物件包起來
        console.log(response.data);
        // vm.products = response.data.products;
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProduct();
        } else {
          $("#productModal").modal("hide");
          vm.getProduct();
          alert("新增失敗");
        }
        //假設商品建立成功則使用BS MODAL 關掉彈出視窗 並且重新呼叫 取得新資料 ，反之則同樣關閉視窗 並 提示新增失敗
      });
    },
    deleteModal(item) {
      this.tempProduct = item;
      $("#deleteModal").modal("show");
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#deleteModal").modal("hide");
          vm.getProduct();
        } else {
          $("#deleteModal").modal("hide");
          vm.getProduct();
          alert("刪除失敗");
        }
      });
    },
    uploadFile() {
      const vm = this;
      console.log(this);
      const uploaded = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploaded);
      //上方 第一個參數 是API文件提供的name 第二個是要上傳的檔案欄位
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http
        .post(url, formData, {
          formType: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(vm.tempProduct);

            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
            console.log(vm.tempProduct);
            //確認有無成功寫入
          } else {
            this.$bus.$emit("messsage:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProduct();
  }
};
</script>
