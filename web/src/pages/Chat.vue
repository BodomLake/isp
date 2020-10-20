<template>
  <div class="chat">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="聊天"
      sub-title="聊天（StompJS 实现）"
    />
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  name: "Chat",
  beforeCreate() {},
  data() {
    return {};
  },
  methods:{

  },
  
};
</script>

<style scoped>
</style>