<template>
  <div class="chat">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="编辑器"
      sub-title="富文本Mavon实例"
      @back="$router.go(-1)"
    />
  </div>
</template>

<script>

export default {
  beforeCreate() {},
  name: "Editor",
  data() {
    return {
      minSize: 100,
      size: 300,
      step: 10,
      collapsed: false
    };
  }
};
</script>

<style scoped>
.chat {
  width:100%;
  height: 80%;
}
.chat_window {
    width:100%;
  height: 80%;
}
</style>
