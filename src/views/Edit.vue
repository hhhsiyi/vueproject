<template>
  <div>
    <navbar></navbar>
    <!--    <edit-lable v-for="btnNameV in btnNameVs" :left="btnNameV.btnKey" :right=btnNameV.btnValue></edit-lable>-->
    <!--    <edit-lable v-for="btnNameV in btnNameVs" :left="btnNameV.btnKey">-->
    <!--      <template v-slot:right>{{ btnNameV.btnValue }}</template>-->
    <!--    </edit-lable>-->
    <br>

    <div class="uploadImg">
      <van-uploader class="uploadBtn" preview-size="100vw" :after-read="afterRead"/>
      <edit-lable left="头像">
        <template v-slot:right>
          <img src="@/assets/tx.jpg" v-if="currentUserInfo.img">
          <img src="@/assets/logo.png" v-else>
          <!--        <img src="@/assets/logo.png" v-else/>-->
          <!--        <img src="@/assets/tx.jpg"/>-->

          <!--        {{ currentUserInfo.img }}-->
        </template>
      </edit-lable>
    </div>

    <edit-lable left="昵称"
                @lableClick="show = true">
      <template v-slot:right>
        {{ currentUserInfo.name }}
      </template>
    </edit-lable>
    <edit-lable left="账号">
      <template v-slot:right>
        {{ currentUserInfo.accountName }}
      </template>
    </edit-lable>
    <edit-lable left="UID">
      <template v-slot:right>
        {{ currentUserInfo.id }}
      </template>
    </edit-lable>
    <edit-lable left="性别" @lableClick="genderShow = true">
      <template v-slot:right>
        {{ currentUserInfo.sex }}
      </template>
    </edit-lable>
    <edit-lable left="个性签名"
                @lableClick="signatureShow = true">
      <template v-slot:right>
        {{ currentUserInfo.signature }}
      </template>
    </edit-lable>

    <van-dialog
        v-model:show="show"

        @confirm="confirmClick"
        title="昵称"
        show-cancel-button>
      <!--      <img src="https://cdn.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />-->
      <van-field v-model="text" label="" autofocus/>
    </van-dialog>

    <van-dialog
        v-model:show="signatureShow"
        @confirm="textareaClick"
        title="个性签名"
        show-cancel-button>
      <!--      <img src="https://cdn.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />-->
      <van-field v-model="signature" type="textarea" label="" autofocus/>
    </van-dialog>
    <!--    <van-cell is-link title="选择性别" @click="genderShow = true" />-->
    <van-action-sheet v-model:show="genderShow" :actions="actions" @select="onSelect"/>

    <div class="backUserInfo" @click="clickBackUserInfo">返回个人中心1</div>
    <!--    <img src="@/assets/tx.jpg"/>-->
    <!--    <div v-for="(v,k) in currentUserInfo">-->
    <!--      {{ k }}-&#45;&#45;&#45;&#45;{{ v }}-->
    <!--    </div>-->
    <!--    <edit-lable>-->
    <!--      <template v-slot:btnName class="btn">-->
    <!--        <div>-->
    <!--          1-->
    <!--        </div>-->
    <!--        <div >-->
    <!--          2-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </edit-lable>-->

  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import EditLable from "@/components/common/EditLable";

export default {
  name: "Edit",
  components: {
    Navbar,
    EditLable
  },
  data() {
    return {
      show: false,
      signatureShow: false,
      genderShow: false,
      actions: [
        {name: '男', value: 0},
        {name: '女', value: 1},
        {name: '未知', subname: '要是想当阴阳人可以选这个', value: 2},
      ],
      text: '',
      signature: '',
      btnNameVs:
          [{
            btnKey: '头像',
            btnValue: '名字值'
          },
            {
              btnKey: '昵称',
              btnValue: '名字3'
            },
            {
              btnKey: '账号',
              btnValue: '名字3'
            },
            {
              btnKey: 'UID',
              btnValue: '000000'
            },
            {
              btnKey: '性别',
              btnValue: '名字3'
            },
            {
              btnKey: '个性签名',
              btnValue: '名字3'
            }
          ],
      currentUserInfo: {
        name: '',
        img: '',
        accountName: '',
        id: '',
        signature: '',
        sex: ''
      }
    }
  },
  methods: {
    getUserEdit() {
      this.$myHttp.post('api/queryUserById', {'id': sessionStorage.getItem('userId')})
          .then(res => {
            this.btnNameVs[0].btnValue = res.data.data.img
            this.btnNameVs[1].btnValue = res.data.data.name
            this.btnNameVs[2].btnValue = res.data.data.accountName
            this.btnNameVs[3].btnValue = res.data.data.id
            this.currentUserInfo = res.data.data
            this.currentUserInfo.img = '@/assets/tx.jpg'
          })
      //  拿到数据进行填充
    },
    afterRead(file) {
      console.log(file);
      const fromdata = new FormData()
      fromdata.append('image', file.file)
      this.$myHttp.post('api/upload', fromdata)
          .then((res) => {
            {

              this.currentUserInfo.img = res.data.url
              // this.UserUpdate()
              // this.$refs.navbar.NavInit()
            }
          })

    },
    updateUserInfo() {
      if (this.currentUserInfo.id === sessionStorage.getItem('userId'))
        this.$myHttp.post('api/updateUserById', this.currentUserInfo).then((res) => {
          console.log(res.data.data);
          if (res.data.code === 0) {
            this.$alert.success("修改成功")
          } else {
            this.$alert.fail("修改失败,具体原因 " + res.data.data.message)
          }
        })
      else {
        this.$alert.fail("当前登录用户信息错误")
      }
    },
    confirmClick() {
      console.log('点击去人');
      this.currentUserInfo.name = this.text
      this.updateUserInfo()
      // this.UserUpdate()
      // this.content = ''
    },
    textareaClick() {
      console.log('点击去人');
      //  这里没有写后端
      this.currentUserInfo.signature = this.signature
    },
    onSelect(item) {
      this.genderShow = false;
      console.log('选完性别了');
      this.currentUserInfo.sex = item.name
      console.log('性别和标志 ', item.name, item.value)
    },
    clickBackUserInfo() {
      console.log('返回上一级');
      this.$alert.success('返回上一级')
      setTimeout(() => {
        // this.$router.push('api/userinfo')
        this.$router.back()
      }, 300)
    }
  },
  created() {
    this.getUserEdit()
  }
}
</script>

<style lang="less">
img {
  width: 14vw;
  height: 14vw;
  border-radius: 50%;
}

//.btn{
//  div{
//
//  }
//  /*flex: 1;*/
//}
//span{
//  /*display: flex;*/
//  display: block;
//  text-align:justify;
//}
.uploadImg {
  position: relative;
  overflow: hidden;

  .uploadBtn {
    position: absolute;
    opacity: 0
  }
}

.backUserInfo {
  margin-top: 6vw;
  //margin-top: 6vw;
  margin-left: 20vw;
  margin-right: 20vw;
  background-color: white;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //color: white;
  color: #999;
  padding: 5vw 0;
  font-size: 4vw;
}
</style>