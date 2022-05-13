<template>
  <!--单个文章页面-->
  <navbar></navbar>
  <div>
    <div class="articleInfo">
      <div class="viedo">
        <!--        <img :src="myResult.image">-->
        <!--        这里先用测试时候的一段视频,之后再搞别的-->
        <video src="https://www.runoob.com/try/demo_source/movie.mp4" controls="controls"/>
      </div>
      <div class="detailInfo">
        <div>
          <span>标签</span>
          <span>{{ myResult.title }}</span>
          <span>{{ myResult.context }}</span>
        </div>
        <div class="detailContext">
          <span>发布人</span>
          <span>14万播放量</span>
          <span>3000弹幕</span>
          <span>昨天</span>
        </div>
        <div class="zhuanpingzan">
          <span :style={color:zanColor} @click="this.dianzan1=!this.dianzan1">
<!--            <van-icon name="thumb-circle-o" :color="zanColor" @click="this.dianzan1=!this.dianzan1"/>-->
            <!--            <span :style="{color:zanColor}">点赞</span>-->
            <van-icon name="thumb-circle-o"/>
            点赞
          </span>
          <span :style="{color:shouColor}" @click="this.shoucang1=!this.shoucang1">
            <van-icon name="star-o"/>
            收藏数
          </span>
          <span :style="{color:downloadColor}" @click="this.downloadCount=!this.downloadCount">
            <van-icon name="down"/>
            下载</span>
        </div>
      </div>
    </div>
    <div class="recommendListInfo">
      <!--      <detail v-if="index===active"-->
      <!--              :detailitem="recommendItem"-->
      <!--              v-for="(recommendItem,articleIndex) in recommendArticleList"-->
      <!--              :key="articleIndex">-->
      <!--      </detail>-->
      <!--&lt;!&ndash;      <div v-for="(item,index) in recommendArticleList">&ndash;&gt;-->
      <!--&lt;!&ndash;        {{item.title}}&ndash;&gt;-->
      <!--&lt;!&ndash;      </div>&ndash;&gt;-->
      <!--&lt;!&ndash;      {{recommendArticleList[1].title}}&ndash;&gt;-->
      <detail class="recommendItem"
              :detailitem="recommendItem"
              v-for="(recommendItem,index) in recommendArticleList"
              :key="index"
      ></detail>
      <!--      <tesw></tesw>-->
      <br>
      <comment-title></comment-title>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Detail from "@/views/Detail";
import CommentTitle from "@/components/article/CommentTitle";
export default {
  name: "Article",
  components: {
    Navbar,
    Detail,
    CommentTitle,
  },
  data() {
    return {
      myResult: {},
      dianzan1: false,
      shoucang1: false,
      downloadCount: false,
      recommendArticleList: [],
      rs: [],
      myUserInfo:null
    }
  },
  methods: {
    async getArticleInfo() {
      console.log(this.$route.params);
      const res = await this.$myHttp.post('/api/getSingleArticleInfo', {
        itemId: this.$route.params.itemId
      })
      console.log(res);
      this.myResult = res.data.data
    },
    fillData(data) {
      return data.map((item, index) => {
        item.list = [];
        return item;
      })
    },
    async getRecommendArticleList() {
      console.log('获取推荐视频列表');
      const res = await this.$myHttp.post('/api/getRecommendArticleList')
      console.log("test", res.data.data);
      this.recommendArticleList = this.fillData(res.data.data)
      console.log(this.recommendArticleList);
      // this.recommendArticleList = res.data.data
      // this.recommendArticleList.list.push(...res.data.data)

      // this.recommendArticleList.push(...res.data.data)
    },

    async getRecommendArticleList1() {
      console.log('获取推荐视频列表1');
      const res = await this.$myHttp.post('/api/getRecommendArticleList1')
      console.log("test", res.data);
      // this.recommendArticleList = this.fillData(res.data)
      // console.log(this.recommendArticleList);
      // this.recommendArticleList = res.data.data
      // this.recommendArticleList.list.push(...res.data.data)

      this.recommendArticleList.push(...res.data)
    },
    test() {
      this.$myHttp.post('api/article', {
        categoryId: 2,
        // categoryId:this.categoryList[this.active].id,
        pageIndex: 1,
        pageSize: 8,
      })
          .then((res) => {
            // console.log('为啥啊',currentCategory);
            // console.log("Article: ", res.data)
            // console.log('123 ', res.data.pages);
            // console.log('234 ', res.data.current);
            // console.log("categoryItem.list ", currentCategory);
            this.rs.push(...res.data.records)
            console.log(typeof res.data.records[1]);

          })
    },

  },
  created() {
    // console.log(this.$route);
    this.getArticleInfo()
    this.getRecommendArticleList1()
    // this.getRecommendArticleList()
    //  因为我们一直用的是一个组件,所以我们的方法是不会再次触发的,要么去watch路由,要么去为每一个封面写一个监听事件
    //  也就是说在同一个组件下的路由跳转,应该去监控路由
  },
  watch: {
    $route() {
      console.log('路由跳转');
      this.getArticleInfo()
      this.getRecommendArticleList1()
    }
  },
  computed: {
    zanColor() {
      if (this.dianzan1) {
        return "#ff8198"
      } else {
        return "#333333"
      }
    },
    shouColor() {
      if (this.shoucang1) {
        return "#ff8198"
      } else {
        return "#333333"
      }
    },
    downloadColor() {
      if (this.downloadCount) {
        return "#ff8198"
      } else {
        return "#333333"
      }
    }
  }
}
</script>

<style lang="less">
.articleInfo {
  background-color: white;

  .viedo {
    width: 100%;

    img {
      width: 90%;
    }

    video {
      width: 90%;
    }
  }

  .detailInfo {
    padding: 4vw;

    > div {
      //color: blue;
      text-align: left;
      padding-left: 1vw;
    }

    > div:nth-child(1) {
      text-align: left;
      //color: red;
      padding-bottom: 5vw;

      span:nth-child(1) {
        color: #ff8198;
        padding: 0 1vw;
        border-radius: 3vw;
        background-color: #f4f4f4;
      }
    }

    > div:nth-child(2) {
      //color: #ff5777;
      font-size: 3vw;
    }
  }

  .detailContext {
    span {
      color: #cccccc;
    }

    span:nth-child(1) {
      padding: 3vw 3vw;
      color: #333333;
    }
  }

  .zhuanpingzan {
    margin: 4vw 3vw;
    font-size: 3.5vw;
  }
}

.recommendListInfo {
  margin-top: 10vw;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  //换行
  justify-content: space-around;

  .recommendItem {
    width: 45%;
  }
}

</style>
