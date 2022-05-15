<template>
  <div class="commentChild">
    <div v-for="(item,index) in childCommend" :key="index">
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
          <div class="commentContent">
            回复 <span style="color: #002FA7">{{parentUser}}</span> : {{ item.comment }}
          </div>
        </div>
      </div>
      <comment-child
          v-if="item.child!==null && item.child.length>0"
          :child-commend="item.child"
          :parent-user="item.user"
      ></comment-child>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentChild",
  props: [
    'childCommend','parentUser'
  ],
  methods: {
    test() {
      console.log('debug', this.childCommend);
      console.log('parentUser',this.parentUser);
    }
  },
  created() {
    this.test()
  }
}
</script>

<style lang="less">
.commentChild {
  //padding: 0 10vw;
  >div{
    .commentItem {
      .detail {
        flex: 1;
        padding: 0 2vw;
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
  }


}
</style>