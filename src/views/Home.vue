<template>
  <div>
    <navbar></navbar>
    <!--    <van-tabs v-model:active="active" swipeable>-->
    <!--      <van-tab v-for="index in 4" :title="'选项 ' + index">-->
    <!--        内容 {{ index }}-->
    <!--      </van-tab>-->
    <!--    </van-tabs>-->
    <!--    <van-pull-refresh v-model="hrefreshing" @refresh="honRefresh">-->
    <van-pull-refresh v-model="this.refreshing" @refresh="honRefresh">
      <!--    <van-tabs v-model:active="active" swipeable sticky animated :lazy-render="true">-->
      <van-tabs v-model:active="active" swipeable sticky animated>
        <van-tab v-for="(category,index) in categoryList" :title="category.title" :key="index">
          <van-list
              :loading="category.loading"
              :finished="category.finished"
              @load="onLoad"
              loading-text="在加载了!"
              :immediate-check="false"
              finished-text="我也是有底线的"
          >
            <!--          <van-cell v-for="item in list" :key="item" :title="item" />-->
            <div class="detailparent">
              <detail class="detailitem" v-if="index===active"
                      :detailitem="article"
                      v-for="(article,articleIndex) in category.list"
                      :key="articleIndex">
              </detail>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Detail from "@/views/Detail";

export default {
  name: "Home",
  components: {
    Navbar,
    Detail
  },
  data() {
    return {
      categoryList: [],
      active: 0,
      refreshing: false,
      // loading: false,
      //  默认第几页
      // hrefreshing,
      // honRefresh,
    }
  },
  methods: {
    getCategory() {
      this.$myHttp.post('api/category')
          .then((res) => {
            // this.categoryList.push(...res.data)
            this.categoryList = this.fillCategoryData(res.data)
          })
    },
    fillCategoryData(data) {
      //  这里用来填充每个页面下的内容列表
      // console.log('这里用来填充每个页面下的内容列表');
      // console.log("1    ", category1);
      // this.categoryList = category1
      return data.map((item, index) => {
        item.list = [];
        item.loading = false;
        item.finished = false;
        item.pageIndex = 1;
        item.firstLoading = true;
        // item.hrefreshing = false;
        return item;
      })
    },
    selectArticle() {
      let currentCategory = this.categoryList[this.active];
      //当前页面的list
      // console.log("debugL:",currentCategory);
      // let pageIndex
      // console.log('获取文章详情');

      if (currentCategory.firstLoading === true) {
        // pageIndex = 0
        currentCategory.firstLoading = false
        // this.loadingData(currentCategory, pageIndex)
        console.log(currentCategory.title, '首次加载');

        this.loadingData(currentCategory)
      } else {
        console.log(currentCategory.title, '再次加载');
        this.loadingData(currentCategory)
        // console.log('pageIndex += 1');
        // currentCategory.pageIndex += 1
        // setTimeout(()=>{
        //   console.log('test211');
        // },5000)
        // this.loadingData(currentCategory)
      }
    },
    loadingData(currentCategory) {
      // console.log(currentCategory.firstLoading);
      const id = currentCategory.id;
      // const page = this.categoryList[this.active].page + 1
      const pageSize = 8
      this.$myHttp.post('api/article', {
        categoryId: id,
        // categoryId:this.categoryList[this.active].id,
        pageIndex: currentCategory.pageIndex,
        pageSize,
      })
          .then((res) => {
            // console.log('为啥啊',currentCategory);
            // console.log("Article: ", res.data)
            console.log('123 ', res.data.pages);
            console.log('234 ', res.data.current);
            if (res.data.pages === res.data.current) {
              currentCategory.finished = true;
              console.log('到头了');
            } else {
              this.categoryList[this.active].finished = false;
              // this.categoryList[this.active].pageIndex = 5;
              // console.log('debug4: ',currentCategory)
              // console.log('debug41: ',currentCategory.pageIndex)
              // console.log('debug : ',this.categoryList[this.active])
              // console.log('debug2 : ',this.categoryList[this.active].finished)
              // console.log('debug3 : ',this.categoryList[this.active].firstLoading)
            }
            // console.log("categoryItem.list ", currentCategory);
            currentCategory.list.push(...res.data.records)
            console.log(typeof res.data.records[1]);
          })
      currentCategory.pageIndex++
    },
    onLoad() {
      //这个是组件带的方法
      this.categoryList[this.active].loading = true;
      setTimeout(() => {
        if (this.categoryList[this.active].finished) {
          console.log('加载完了!!!!不要再翻页了');
        } else {
          console.log('在下拉加载了');
          let currentCategory = this.categoryList[this.active];
          // currentCategory.pageIndex += 1
          this.selectArticle()
          //test
          // currentCategory.finished = true;
          // currentCategory.loading = false;
          this.categoryList[this.active].loading = false;
        }
      }, 1000)
    },
    honRefresh() {
      let currentCategory = this.categoryList[this.active];
      currentCategory.finished = false;
      currentCategory.loading = true;
      currentCategory.pageIndex = 1
      console.log('honRefresh');
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // finished.value = false;
      // loading.value = true;
      this.refreshing = false;
      currentCategory.list = [];
      this.onLoad();
    },
    // hrefreshing() {
    //   //  这里是清空页面数据的?
    //   // console.log('refreshing');
    //   // this.categoryList[this.active].firstLoading = true;
    //   // this.selectArticle();
    // },
  },
  watch: {
    // active() {
    //   this.selectArticle()
    // }
  },
  //我是直接在retrun里面加个selectedID,然后监听activeKey() {  this.selectedId = this.category[this.activeKey]._id }
  created() {
    this.getCategory()
    console.log(this.$route);
  }
}
</script>

<style lang="less">
.detailparent {
  display: flex;
  flex-wrap: wrap;
  //换行
  justify-content: space-around;

  .detailitem {
    width: 45%;
  }

}
:root{
  //--van-font-size-xs: 4vw;
  //--van-font-size-sm: 4vw;
  //--van-font-size-md: 4vw;
  //--van-font-size-lg: 4vw;
  //--van-font-size-xs: 4vw;
  //--van-font-size-sm: 4vw;
  --van-font-size-md: 4vw;
  //--van-font-size-lg: 4vw;
  --van-tabs-line-height:10vw;
  --van-tabs-card-height:8vw;
  --van-tabs-bottom-bar-width:10vw;
  --van-search-label-font-size:10vw;
  //--van-search-padding:4vw;
  --van-search-action-font-size:4vw;
}
</style>