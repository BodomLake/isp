<template>
  <div class="my-icon">
    <remote-js :src="src"></remote-js>
    <svg class="icon svg-icon" aria-hidden="true">
      <use :xlink:href="'#' + className"></use>
    </svg>
  </div>
</template>
<script>
const src = "//at.alicdn.com/t/font_2101883_1lrsfimqv03.js";
export default {
  name: "my-icon",
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
  beforeCreate() {},
  data() {
    return {
      src: src
    };
  },
  props: {
    className: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.my-icon {
  display: inline;
  margin: 0.1rem;
}
.icon {
  width: 1.35em;
  height: 1.35em;
  vertical-align: -0.23rem;
  margin: 0px 0px 0px -0.4em;
  fill: currentColor;
  overflow: hidden;
}
</style>
