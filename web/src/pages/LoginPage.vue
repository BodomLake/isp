<!-- 登录页面 -->
<template>
  <div style="width:100%;height:100%">
    <div class="loginPanel">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名!' }]
              }
            ]"
            placeholder="Username"
          >
            <!-- <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" /> -->
            <my-icon slot="prefix" className="icon-User" />
            <a-tooltip
              slot="suffix"
              title="不是输入昵称，要输入注册时使用的注册名（注册名不可更改）"
            >
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            size="large"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码!' }]
              }
            ]"
            type="password"
            placeholder="Password"
          >
            <my-icon slot="prefix" className="icon-Lock" />
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <drag-verify
            :width="width"
            :height="height"
            :text="text"
            :success-text="successText"
            :background="background"
            :progress-bar-bg="progressBarBg"
            :completed-bg="completedBg"
            :handler-bg="handlerBg"
            :handler-icon="handlerIcon"
            :text-size="textSize"
            :success-icon="successIcon"
            ref="Verify"
          >
          </drag-verify>
        </a-form-item>

        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码？
          </a>
          <a href="">
            立刻注册!
          </a>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            size="large"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
// import dragVerify from "vue-drag-verify";
import dragVerify from "../components/DragVerify";
import "font-awesome/css/font-awesome.min.css";
// import MyIcon from "../components/MyIcon";

export default {
  name: "LoginPage",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  components: {
    dragVerify
  },
  methods: {
    // 滑块验证成功回调
    handleSuccessFun() {
      console.log('成功')
    },
    // 滑块验证失败回调
    handleErrorFun() {
            console.log('失败')
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.$refs.Verify.isMoving)
      console.log(this.$refs.Verify.isPassing)
      console.log(this.$refs.Verify.handlerIconClass)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  },
  components: {
    dragVerify
  },
  data() {
    return {
      handlerIcon: "fa fa-angle-double-right",
      successIcon: "fa fa-check",
      background: "#cccccc",
      progressBarBg: "#4b0",
      completedBg: "#66cc66",
      handlerBg: "#fff",
      text: "请将滑块拖动到右侧",
      successText: "验证成功",
      width: 300,
      height: 42,
      textSize: "16px",
      isCircle: "true"
    };
  }
};
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.loginPanel {
  width: 35%;
  height: 35%;
  position: relative;
  left: 30%;
  top: 15%;
  background-color: azure;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 30px 10px rgba(43, 110, 232, 0.2);
}

</style>
