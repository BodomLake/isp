<template>
  <div class="chat">
    <rs-panes
      :allow-resize="false"
      split-to="columns"
      primary="first"
      :size="size1"
    >
      <div slot="firstPane" class="function-pane">
        <a-menu
          :default-selected-keys="['1']"
          mode="inline"
          :inline-collapsed="collapsed"
          theme="dark"
        >
          <a-menu-item key="1">
            <my-icon className="icon-liaotianqunzu"></my-icon>
          </a-menu-item>
          <a-menu-item key="2">
            <my-icon className="icon-tongxunlu"></my-icon>
          </a-menu-item>
          <a-menu-item key="3">
            <my-icon className="icon-hezi"></my-icon>
          </a-menu-item>
          <a-menu-item key="4">
            <my-icon className="icon-bianzu"></my-icon>
          </a-menu-item>
          <a-menu-item key="5">
            <my-icon className="icon-kanyikanicon"></my-icon>
          </a-menu-item>
          <a-menu-item key="6">
            <my-icon className="icon-bianzu"></my-icon>
          </a-menu-item>
        </a-menu>
      </div>
      <!-- 对话者的列表 -->
      <rs-panes
        :allowResize="true"
        split-to="columns"
        slot="secondPane"
        primary="first"
        :size="size2"
        :minSize="minSize2"
        :maxSize="maxSize2"
        style="height:100%;overflow-y:auto"
        resizerBorderColor="groove"
        :resizerThickness="resizerThickness"
      >
        <div slot="firstPane" class="my_columns">
          <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
          >
            <a-menu-item key="1">
              <my-icon className="icon-wenjianchuanshuzhushoutubiao" />
              <span>文件传输助手</span>
            </a-menu-item>
            <a-menu-item key="2">
              <my-icon className="icon-User" />
              <span>好友</span>
            </a-menu-item>
            <a-menu-item key="3">
              <my-icon className="icon-duorenyonghu" />
              <span>群聊</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title"
                ><my-icon className="icon-dingyuehao" /><span
                  >订阅公众号</span
                ></span
              >
              <a-menu-item key="5">
                Option 5
              </a-menu-item>
              <a-menu-item key="6">
                Option 6
              </a-menu-item>
              <a-menu-item key="7">
                Option 7
              </a-menu-item>
              <a-menu-item key="8">
                Option 8
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"
                ><my-icon className="icon-dash_common_weapp_dash" /><span
                  >小程序</span
                ></span
              >
              <a-menu-item key="9">
                Option 9
              </a-menu-item>
              <a-menu-item key="10">
                Option 10
              </a-menu-item>
              <a-sub-menu key="sub3" title="Submenu">
                <a-menu-item key="11">
                  Option 11
                </a-menu-item>
                <a-menu-item key="12">
                  Option 12
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </div>
        <rs-panes
          :allowResize="true"
          split-to="rows"
          :size="size3"
          slot="secondPane"
          primary="second"
          class="my_columns"
          :minSize="minSize3"
          :maxSize="maxSize3"
          resizerBorderColor="groove"
          :resizerThickness="resizerThickness"
        >
          <div slot="firstPane" class="my_columns">
            <a-page-header style="border-bottom:0.1px groove">
              <div>对话-测试用户1-状态栏</div>
            </a-page-header>

            <div>
              聊天信息框
            </div>
          </div>

          <div slot="secondPane">
            <rs-panes
              :allowResize="false"
              split-to="rows"
              slot="secondPane"
              primary="first"
              :size="size4"
            >
              <div slot="firstPane">
                <a-row>
                  <a-col :span="12">
                    <a-row>
                      <a-button-group class="input-left-button">
                        <a-button><my-icon className="icon-save"/></a-button>
                        <a-button
                          ><my-icon
                            className="icon-wenjianchuanshuzhushoutubiao"
                        /></a-button>
                        <a-button><my-icon className="icon-emoji"/></a-button>
                        <a-button><my-icon className="icon-jieping"/></a-button>
                        <a-button><my-icon className="icon-tishi"/></a-button>
                        <a-button><my-icon className="icon-ziyuan1"/></a-button>
                      </a-button-group>
                    </a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-button-group class="input-right-button">
                      <a-button><my-icon className="icon--Phone"/></a-button>
                      <a-button><my-icon className="icon-luxiang"/></a-button>
                      <a-button @click="sendMsg()"
                        ><my-icon className="icon-fasong" />发送(S)</a-button
                      >
                    </a-button-group>
                  </a-col>
                </a-row>
              </div>
              <!-- 自定义输入框 -->
              <edit-div
                v-model="value"
                slot="secondPane"
                :sendFunc="sendMsg"
                ref="inputModel"
              >
              </edit-div>
              <!-- <div class="mavonEditor" slot="secondPane">
                <mavon-editor
                slot="secondPane"
                class="mavonEditor"
                :toolbarsFlag="false"
                :subfield="false"
                :preview="true"
                v-model="value"
              />  </div> -->
            </rs-panes>
          </div>
        </rs-panes>
      </rs-panes>
    </rs-panes>
  </div>
</template>

<script>
import ResSplitPane from "vue-resize-split-pane";
import EditDiv from "../components/EditDiv";
import { initWS, sendMessage, disconnectWS } from "../utils/ws";

// 构建一个 websocket
let ws_url = "ws://localhost:8080/ws/single";
let socket = initWS(ws_url, () => {});

export default {
  name: "Chat",
  components: {
    "rs-panes": ResSplitPane,
    "edit-div": EditDiv
  },
  props: {
    // value: {
    //   type: String,
    //   default: ""
    // }
  },
  beforeCreate() {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
  },
  created() {},
  data() {
    return {
      resizerThickness: 1,
      minSize1: innerWidth * 0.035,
      minSize2: innerWidth * 0.1,
      minSize3: innerHeight * 0.18,
      maxSize1: innerWidth * 0.3,
      maxSize2: innerWidth * 0.7,
      maxSize3: innerHeight * 0.75,
      size1: innerWidth * 0.035,
      size2: innerWidth * 0.15,
      size3: innerHeight * 0.18,
      size4: innerHeight * 0.04,
      step: 10,
      collapsed: false,
      value: "",
      socket: socket
    };
  },
  methods: {
    sendMsg() {
      sendMessage(this.value, ws_url);
      // console.log(this.$refs.inputModel);
      // 直接修改dom 等于 影响了视图层,触发<edit-div>的watch：['value'],从而才能引发子组件数据层的改变
      document.getElementById(this.$refs.inputModel.id).innerHTML = "";
    }
  }
};
</script>

<style scoped>
.function-pane {
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid gray;
  background-color: #001529;
}
.chat {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* border: 1px solid black; */
}
.my_columns {
  height: inherit;
}

.input-right-button {
  position: absolute;
  right: 2px;
}

.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
