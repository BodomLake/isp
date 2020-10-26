<template>
  <a-layout id="home-layout">
    <a-page-header style="text-align: center">
      <router-link to="/">
        <strong class="app-title">个人工具中心</strong>
      </router-link>
    </a-page-header>

    <div>
      <transition name="fade">
        <!--  要被缓存的 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>

      <transition name="fade">
        <!-- 不要被缓存的 未设置keepAlive者为undefined即是false(不缓存)-->
        <router-view v-if="!$route.meta.keepAlive" />
      </transition>
      <!-- Home主界面 -->
      <transition name="main-fade">
        <div id="layout-content" v-if="this.$route.path === '/'">
          <a-row :gutter="[6, 12]" type="flex" justify="center" align="middle">
            <a-col :span="3">
              <div class="match" @click="goto('match')">
                <img
                  height="200px"
                  width="200px"
                  alt="Vue logo"
                  src="../assets/app/Finance.jpg"
                  title="财报匹配"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div @click="goto('table')">
                <img
                  alt="Vue logo"
                  src="../assets/app/THS.jpg"
                  title="财报查询"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div @click="goto('game')">
                <img
                  alt="Vue logo"
                  src="../assets/app/Game.jpg"
                  title="游戏盒"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/Stock.jpg"
                  @click="goto('tool')"
                  title="小工具库"
                />
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="[6, 12]" type="flex" justify="center" align="middle">
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/Tools.jpg"
                  @click="goto('tool')"
                  title="小工具库"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/WeChat.jpg"
                  @click="goto('chat')"
                  title="聊天室"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/MP3.jpg"
                  @click="goto('music')"
                  title="MP3"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/MP4.jpg"
                  @click="goto('video')"
                  title="MP4"
                />
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="[6, 12]" type="flex" justify="center" align="middle">
            <a-col :span="3">
              <div @click="goto('email')">
                <img
                  alt="Vue logo"
                  src="../assets/app/Email.jpg"
                  title="邮箱"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/Blog.jpg"
                  @click="goto('blog')"
                  title="聊天室"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/AppStore.jpg"
                  @click="goto('music')"
                  title="MP3"
                />
              </div>
            </a-col>
            <a-col :span="3">
              <div>
                <img
                  alt="Vue logo"
                  src="../assets/app/iOS.jpg"
                  @click="goto('video')"
                  title="MP4"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </transition>
    </div>

    <div id="layout-footer">
      <div class="aboutAuthor">
        <my-icon className="icon-User" />
        <a href="javascript:void(0)" title="792294021@qq.com">作者:RHX</a>
        <my-icon className="icon-github" />
        <a href="http://github.com/BodomLake" target="_blank"
          >GitHub1:BodomLake</a
        >
        <my-icon className="icon-github" />
        <a href="http://github.com/RyougiMana" target="_blank"
          >GitHub2:RyougiMana</a
        >
      </div>
    </div>
  </a-layout>
</template>

<script>
// import Chat from "./Chat";
export default {
  name: "Home",
  // components: { Match, Tool, Table, Editor, Chat },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    forwards() {
      this.$router.go(1);
    },
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-title {
  font-size: 22px;
  line-height: 100%;
}
#home-layout {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

a-page-header {
  height: 7%;
}
#ant-layout-footer {
  height: 7%;
}

.ant-layout-content {
  height: 80%;
}

#layout-content [class~="ant-col"] {
  background: transparent;
  border: 0;
  align-content: stretch;
}

#layout-content [class~="ant-col"] > div {
  /* 93c9e8 */
  background: white;
  align-content: stretch;
  /*height: 50%;*/
  /* line-height: 350px; */
  font-size: 14px;
  border: 1px solid rgb(235, 237, 240);
}

#layout-footer {
  height: 100%;
  width: 100%;
}
.aboutAuthor {
  right: 0px;
  bottom: 0px;
  position: absolute;
  margin: 0px 20px 5px 0px;
}

img {
  width: 100%;
  height: 100%;
}

.main-fade-leave-active {
  transition: 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  opacity: 0;
}

.main-fade-enter-active {
  transition: 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  opacity: 0.3;
}

.fade-leave-active {
  opacity: 0;
  transition: 0.2s cubic-bezier(1, 0.5, 0, 0.5);
}

.fade-enter-active {
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 1;
  transform: translate(-50%, -40%);
  animation: change 1s;
  -webkit-animation: change 1s;
  -moz-animation: change 1s;
  -o-animation: change 1s;
  width: 100%;
  height: 100%;
}
.footer > a {
  margin-right: 0.25rem;
}

@keyframes change {
  from {
    width: 0%;
    height: 0%;
    opacity: 1;
  }
  to {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
}
</style>
