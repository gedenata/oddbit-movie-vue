<template>
  <transition name="fade">
    <div class="error" v-if="showError">
      <h4 class="animated fadeInDown">{{ message }}</h4>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showError: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "Something went wrong..."
    }
  },
  watch: {
    showError(val) {
      this.toggleScroll(val);
    }
  },
  methods: {
    toggleScroll(val) {
      document.body.style.overflow = val ? "hidden" : "visible";
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  position: fixed;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  background-color: #fff;
  color: #000;
}

h4 {
  font-size: 50px;
  letter-spacing: 4px;
}
</style>
