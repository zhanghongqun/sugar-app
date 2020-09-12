<template>
  <div style="overflow:scroll;">
    <div class="tips">
      <p>完成账号验证进入活动介绍</p>
      <p>填写有效的旺旺号</p>
      <p>复制下面口令，打开手机淘宝，截图上传</p>
    </div>
    <div style="margin-top:10px">
      <div>
        <van-row>
          <van-field v-model="defaultIdentify.wangWangNo" label="旺旺号:" placeholder="请输入旺旺号" />
        </van-row>
        <van-row type="flex" justify="center" gutter="20">
          <van-col span="12">
            <van-field placeholder="康丰按摩椅" v-model="defaultIdentify.firstPicCode" />
          </van-col>
          <van-col>
            <van-button
              type="primary"
              v-clipboard:copy="defaultIdentify.searchKeyword"
              v-clipboard:success="onCopy"
            >点击复制</van-button>
          </van-col>
        </van-row>
      </div>
      <div style="margin-top:10px">
        <van-row type="flex" justify="center" gutter="20">
          <van-col span="12">
            <van-field placeholder="康丰按摩椅" v-model="defaultIdentify.secondePicCode" />
          </van-col>
          <van-col>
            <van-button
              type="primary"
              v-clipboard:copy="defaultIdentify.searchKeyword"
              v-clipboard:success="onCopy"
            >点击复制</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-row>
      <div style="margin:30px 10px">
        <van-uploader
          :after-read="afterRead"
          v-model="defaultIdentify.fileList"
          multiple
          :max-count="2"
        />
      </div>
    </van-row>

    <div>
      <van-button type="primary" @click="submitIdentify">上传身份</van-button>
    </div>
    <div style="margin-right:50px;margin-left:50px;margin-top:10px;text-align:left">
      <ul>
        <li>1. 请直接截图，不要下拉再截图</li>
        <li>2. 两张都必须上传</li>
        <li>3. 验证不过会自动关闭任务，明天再试，持续不过就更换淘宝账号</li>
        <li>4. 验证通过将自动进入活动页</li>
      </ul>
    </div>
    <div style="margin-top:10px">
      <van-button type="default" @click="abandon">放弃任务</van-button>
    </div>
  </div>
</template>
<script>
import { upload } from "@/api/file";
import { submitProcess } from "@/api/task";
import { Dialog } from "vant";
const defaultIdentify = {
  firstPicCode: "￥4gIMc3c8Chx￥",
  secondePicCode: "￥FDWCc3c8F34￥",
  searchKeyword: "",
  fileList: [],
  urls: [],
  wangWangNo: ""
};
export default {
  data() {
    return { defaultIdentify };
  },
  created() {},
  methods: {
    abandon() {
      let session = this.$store.getters.session;
      abandon(session.id, session.process.id).then(res => {
        session.process = null;
        this.$store.commit("setSession", session);
        this.$router.push({
          name: "Home",
          params: {}
        });
      });
    },
    afterRead(file) {
      const data = new FormData();
      data.append("file", file.file);
      file.status = 'uploading';
      upload(data).then(res => {
        file.status = 'done';
        defaultIdentify.urls.push(res);
        console.log(defaultIdentify.urls);
      });
    },
    submitIdentify() {
      let submitParams = {};
      submitParams.customerId = this.$store.getters.session.id;
      submitParams.identifierPics = defaultIdentify.urls;
      submitParams.wangWangNo = defaultIdentify.wangWangNo;
      if (
        submitParams.wangWangNo === "" ||
        submitParams.identifierPics.length < 2
      ) {
        Dialog({ message: "请上传完整的身份图片" });
        return;
      }
      submitProcess(submitParams).then(res => {
        this.$router.push({
          name: "Home",
          params: {}
        });
      });
    },
    onCopy(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
div {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 10px;
}
p {
  margin-top: 10px;
  margin-bottom: 10px;
}
.tips {
  text-align: center;
  border: 1px solid #f2f2f2;
  border-radius: 25px;
  background: #ffffff;
}
</style>