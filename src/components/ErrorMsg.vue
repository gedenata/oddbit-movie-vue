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
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-size: 4em;
  overflow: hidden;
  color: #000;
  background-color: #fff;
}

h4 {
  font-size: 50px;
  letter-spacing: 4px;
}
</style>
