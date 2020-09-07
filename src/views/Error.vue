<template lang="pug">
.not-found
  h4.animated.fadeInDown 404 | Page not found
</template>

<script>
export default {
  created() {
    this.$store.dispatch("TOGGLE", { main_spinner: false });
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  display: inline;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  color: #000000;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

h4 {
  font-size: 50px;
  font-weight: 300;
  letter-spacing: 4px;
  &:first-letter {
    font-size: 60px;
    font-weight: 500;
    color: #696969;
    display: inline-block;
  }
}
</style>
