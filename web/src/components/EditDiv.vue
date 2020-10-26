<template>
  <div
    class="edit-div"
    :style="{ fontSize: fontSize + 'px' }"
    v-html="innerText"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
    :id="id"
  ></div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "EditDiv",
  props: {
    value: {
      type: String,
      default: ""
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 16
    },
    id: {
      type: String,
      default: uuidv4()
    },
    sendFunc: {
      type: Function,
      default: () => {
        console.log("请给本输入框绑定一个发送要用的函数");
      }
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    };
  },
  watch: {
    value() {
      if (!this.isLocked && !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  created() {
    // 植入sendFunc()等，props中的函数
    document.onkeydown = e => {
      // console.log(document.activeElement.id);
      //编辑框聚焦下才触发事件
      // let selection = getSelection();
      // console.log(selection, selection.getRangeAt(0));
      if (document.activeElement.id === this.id) {
        //按ctrl+enter发送
        if (e.ctrlKey && e.which == 13) {
          this.sendFunc();
          return false;
        }
        // 按enter
        if ((e.keyCode || e.which) == 13) {
          // 锁定该id 在该<div>添加 一些东西
          // return false;
        }
      }
    };
  },
  methods: {
    changeText() {
      this.$emit("input", this.$el.innerHTML);
      // console.log("聚焦:", document.activeElement.id)
    }
  }
};
</script>
<style>
.edit-div {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  padding: 0px 10px 10px 8px;
  box-sizing: border-box;
  box-shadow: 0 0 30px 10px rgba(43, 110, 232, 0.2);
  /* font-size: 16px; */
}
</style>
