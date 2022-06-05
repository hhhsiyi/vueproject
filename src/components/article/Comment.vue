<template>
  <div class="commentParent">
    <div v-for="(item,index) in test2" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userInfo&&item.userInfo.img" :src="item.userInfo.img">
          <img v-else src="@/assets/tx.jpg" alt=""/>
        </div>
        <div class="detail">
          <p>
          <span class="commentUser">
            {{ item.user }}
          </span>
            <span class="commentTime">
            {{ item.gmtCreate }}
          </span>
          </p>
          <p>
            {{ item.comment }}
          </p>
        </div>
      </div>
      <comment-child
          class="secondComments"
          v-if="item.child!==null && item.child.length>0"
          :child-commend="item.child"
          :parent-user="item.user"
      ></comment-child>

      <!--      <div class="detail">-->
      <!--        <p>-->
      <!--          <span>-->
      <!--            {{test2[0].user}}-->
      <!--          </span>-->
      <!--          <span>-->
      <!--            {{test2[0].gmtCreate}}-->
      <!--          </span>-->
      <!--        </p>-->
      <!--        <p>-->
      <!--          {{ test2[0].comment }}-->
      <!--        </p>-->
      <!--      </div>-->
    </div>
    {{loadedComments}}
  </div>
</template>

<script>
import CommentChild from "@/components/article/CommentChild";

export default {
  name: "Comment",
  props: {
    loadedComments: {
      type:Boolean,
      // default: false
    }
  },
  components: {
    CommentChild
  },
  watch: {
    loadedComments(curVal, oldVal)
    {
      // console.log('传了新值嗷', curVal,oldVal);
      console.log('123');
      if (curVal) {
        this.test22()
      }
    }
  },
  data() {
    return {
      comments: [],
      arr1: [],
      arr2: [],
      test2: [],
    }
  },
  methods: {
    getCommentData() {
      this.$myHttp.post('/api/getCommentData', {
        itemId: this.$route.params.itemId
      }).then(res => {
        // console.log('test   ',this.$route.params.itemId);
        console.log(res.data);
        this.comments = res.data
        // this.comments.child=[]
        for (let i = 0; i < this.comments.length; i++) {
          // console.log('开始第', i, '个外层循环', this.comments[i].commentId);
          // console.log(this.comments[i].parentId === null);
          if (this.comments[i].parentId === null) {
            // console.log(this.comments[i])
            this.arr1.push(this.comments[i])
            // this.$set(this.comments,"arr1",this.comments[i])
            // this.comments[i].child.push(this.comments[i])
            //  这里是父级评论
          } else {
            this.arr2.push(this.comments[i])
          }
          // for (let j = 0; j < this.comments.length; j++) {
          //   console.log('开始第', j, '个内层循环', this.comments[j].commentId, '    的父id是', this.comments[j].parentId);
          //   this.comments[i].child = []
          //   console.log(this.comments[j].parentId === this.comments[i].commentId);
          //   if (this.comments[j].parentId === this.comments[i].commentId) {
          //     //这是我们的二级评论
          //     console.log(this.comments[j], '是', this.comments[i].commentId, ' 的二级评论 ');
          //     // this.comments[i].child.push(this.comments[j])
          //     this.comments[i].child.push(this.comments[j])
          //     this.comments[i].child.push(2, 3)
          //
          //   }
          //   // for (let k = 0; k < this.comments.length; k++) {
          //   //   if (this.comments[k].parentId === this.comments[j].commentId) {
          //   //   //  三级评论?
          //   //     console.log('三级评论')
          //   //     this.comments[i].child.child.push(this.comments[j])
          //   //   }
          //   // }
          // }

        }
        for (let i = 0; i < this.arr1.length; i++) {
          this.arr1[i].child = []
          for (let j = 0; j < this.arr2.length; j++) {
            if (this.arr1[i].commentId === this.arr2[j].parentId) {
              this.arr1[i].child.push(this.arr2[j])
            }
            for (let k = 0; k < this.arr1[i].child.length; k++) {
              this.arr1[i].child[k].child = []
              console.log(this.arr1[i].child[k].commentId);
              if (this.arr1[i].child[k].commentId === this.arr2[k].parentId) {
                this.arr1[i].child[k].child.push(this.arr2[k])
              }
            }
          }

        }
        //第一个参数是对象，第二个参数是属性，第三个参数是属性的值
        // console.log('comments   ', this.comments);
        // console.log('父评论   ', this.arr1);
        // console.log('子评论   ', this.arr2);
        //  没写完
      })
    },
    getTestCommentData() {
      this.$myHttp.post('/api/getCommentData', {
        itemId: this.$route.params.itemId
      }).then(res => {
        let arr = res.data
        let arr1 = []

        function test(temp) {
          let arr1 = []
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].parentId === temp) {
              arr1.push(arr[i])
              arr[i].child = test(arr[i].commentId)
            }
          }
          return arr1
        }

        arr1 = test(null)
        // console.log("debug ", arr)
        // console.log("debug2 ", arr1)
      })
    },
    test() {
      this.$myHttp.post('/api/getCommentData', {
        itemId: this.$route.params.itemId
      }).then(res => {
        console.log('111itemId:', this.$route.params.itemId.values());
        let arr = res.data
        const s = '何文大傻逼'
        let a = this.$myDateMoment
        arr.map(function (n) {
              // console.log('3333', n.gmtCreate);
              n.gmtCreate = a(n.gmtCreate).format("YYYY-MM-DD")
              // console.log('4444',this.$myDateMoment(n.gmtCreate).format("YYYY-MM-DD"));
              // console.log('2222',this.$myDateMoment('2022-05-14T14:43:05.000+00:00').format("YYYY-MM-DD"));
              // this.$myDateMoment(n.gmtCreate).format("YYYY-MM-DD")
              // a(n.gmtCreate).format("YYYY-MM-DD")
            }, a
            // this.$myDateMoment(n.gmtCreate).format("YYYY-MM-DD")
        )
        let arr1 = []
        // this.$myDateMoment('string').format("YYYY-DD-MM")
        // console.log('1111',this.$myDateMoment('2022-05-14T14:43:05.000+00:00').format("YYYY-MM-DD"));
        function test(temp) {
          let arr1 = []
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].parentId === temp) {
              arr1.push(arr[i])
              arr[i].child = test(arr[i].commentId)
            }
          }
          return arr1
        }

        arr1 = test(null)
        console.log("debug111 ", arr)
        console.log("debug1112 ", arr1)
        this.test2 = arr1
      })
    },
    async test22() {
      this.test2=[]
      this.arr=[]
      this.arr2=[]
      const res = await this.$myHttp.post('/api/getCommentData', {
        itemId: this.$route.params.itemId
      });
      let arr = res.data
      console.log('长度', arr);
      if (res.data) {
        this.$emit('commentCount', arr.length)
      }
      const s = '何文大傻逼'
      let a = this.$myDateMoment
      arr.map(function (n) {
            // console.log('3333', n.gmtCreate);
            n.gmtCreate = a(n.gmtCreate).format("YYYY-MM-DD")
          }, a
      )
      let arr1 = []

      function test(temp) {
        let arr1 = []
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].parentId === temp) {
            arr1.push(arr[i])
            arr[i].child = test(arr[i].commentId)
          }
        }
        return arr1
      }

      arr1 = test(null)
      // console.log("debug111 ", arr)
      // console.log("debug1112 ", arr1)
      this.test2 = arr1
    }
  },
  created() {
    // this.getCommentData()
    // this.getTestCommentData()
    // this.test()
    this.test22()
  }
}
</script>

<style lang="less">
.commentParent {
  padding: 2vw 2vw;

  > div {
    border-bottom: 0.3vw solid #e7e7e7;

  }

  .commentItem {
    margin-top: 1vw;
    display: flex;
    text-align: left;

    .userImg {
      //width: 60%;
      //height: 60%;

      img {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
      }
    }

    .detail {
      flex: 1;

      p:nth-child(1) {
        color: #cccccc;
        display: flex;
        justify-content: space-between;
        font-size: 3.2vw;
        margin-left: 4vw;
        margin-right: 4vw;
      }

      p:nth-child(2) {
        //文字
        flex: 1;
        margin-left: 4vw;
        margin-top: 2vw;
        margin-bottom: 2vw;
        display: flex;
        text-align: left;
        //justify-content: space-around;
        font-size: 3.5vw;
      }
    }
  }

  .secondComments {
    padding: 4vw 0 2vw 15vw;
  }
}
</style>