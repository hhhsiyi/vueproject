<template>
  <div>
    <navbar></navbar>
    <!--    <van-tabs v-model:active="active" swipeable>-->
    <!--      <van-tab v-for="index in 4" :title="'选项 ' + index">-->
    <!--        内容 {{ index }}-->
    <!--      </van-tab>-->
    <!--    </van-tabs>-->
    <van-tabs v-model:active="active" swipeable sticky>
      <van-tab v-for="(category,index) in categoryList" :title="category.title" :key="index">
<!--        {{ category.title }}-->
        <br>
<!--        第{{ active }}页-->
        <br>
        <detail v-if="index===active"
                :detailitem="article"
                v-for="(article,articleIndex) in category.list"
                :key="articleIndex">
        </detail>
      </van-tab>
    </van-tabs>
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
      tmp: 0,
      //  默认第几页
    }
  },
  methods: {
    getCategory() {
      this.$myHttp.post('api/category')
          .then((res) => {
            // console.log("首页  ", res);
            // this.categoryList.push(...res.data)
            this.categoryList = this.fillCategoryData(res.data)
            // console.log(this.categoryList);
          })
    },
    fillCategoryData(data) {
      //  这里用来填充每个页面下的内容列表
      // console.log(data);
      const category1 = data.map((item, index) => {
        item.list = [];
        return item;
      });
      // console.log("1    ", category1);
      // this.categoryList = category1
      return category1
    },
    selectArticle() {
      const id = this.categoryList[this.active].id;
      // const page = this.categoryList[this.active].page + 1
      const page = this.tmp
      const pageSize = 8
      const categoryItem = this.categoryList[this.active]
      this.$myHttp.post('api/article', {
        categoryId: id,
        // categoryId:this.categoryList[this.active].id,
        pageIndex: page,
        pageSize: pageSize,
      })
          .then((res) => {
            console.log("Article: ", res)
            console.log("categoryItem.list ", categoryItem);
            categoryItem.list.push(...res.data)
          })
    },

  },
  watch: {
    active() {
      this.selectArticle()
    }
  },
  //我是直接在retrun里面加个selectedID,然后监听activeKey() {  this.selectedId = this.category[this.activeKey]._id }
  created() {
    this.getCategory()
  }
}
</script>

<style lang="less">

</style>