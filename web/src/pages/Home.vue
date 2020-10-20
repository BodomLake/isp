<template>
  <a-layout id="a-layout">
    <a-page-header style="text-align: center">
      <router-link to="/">
        <strong style="font-size: 22px; line-height: 100%">个人工具中心</strong>
      </router-link>
    </a-page-header>

    <a-layout-content>
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
        <a-layout-content id="layout-content" v-if="this.$route.path === '/'">
          <a-row :gutter="[0, 2]">
            <a-col :span="12">
              <div class="match" @click="goto('match')">
                <img
                  alt="Vue logo"
                  src="../assets/banner/ths1.png"
                  title="财报匹配"
                />
                <!--              <router-link exact to="match">
                                  <a-button>财报匹配</a-button>
                </router-link>-->
              </div>
            </a-col>
            <a-col :span="12">
              <div @click="goto('table')">
                <img
                  alt="Vue logo"
                  src="../assets/banner/ths2.png"
                  title="财报查询"
                />
                <!--<router-link exact to="table">财报查询</router-link>-->
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 2]">
            <a-col :span="12">
              <div>
                <!--<router-link exact to="tool">编码/解码</router-link>-->
                <img
                  alt="Vue logo"
                  src="../assets/banner/ths3.png"
                  @click="goto('tool')"
                  title="小工具库"
                />
              </div>
            </a-col>
            <a-col :span="12">
              <div>
                <!--<router-link exact to="editor">财报查询</router-link>-->
                <img
                  alt="Vue logo"
                  src="../assets/banner/ths4.png"
                  @click="goto('editor')"
                  title="编辑器"
                />
              </div>
            </a-col>
          </a-row>
        </a-layout-content>
      </transition>
    </a-layout-content>

    <a-layout-footer id="layout-footer">
      <div class="footer">
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
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Match from "./Match";
import Tool from "./Tool";
import Table from "./Table";
import Editor from "./Editor";
import Chat from "./Chat";
import MyIcon from "../components/MyIcon";
//
export default {
  name: "Home",
  components: { Match, Tool, Table, Editor, Chat, MyIcon },
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
#a-layout {
  height: 100%;
}

a-page-header {
  height: 7%;
}
#ant-layout-footer {
  height: 7%;
}

.ant-layout-content {
  height: 86%;
}

#layout-content [class~="ant-col"] {
  background: transparent;
  border: 0;
  align-content: stretch;
}

#layout-content [class~="ant-col"] > div {
  background: #93c9e8;
  align-content: stretch;
  /*height: 50%;*/
  /* line-height: 350px; */
  font-size: 14px;
  border: 2px solid rgb(235, 237, 240);
}

/* #layout-footer {
  bottom: 0px;
} */
#layout-footer .footer {
  float: right;
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
