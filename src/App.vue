<template lang="pug">
<!-- #app(:style="{'padding-top': app-padding}")
spinner(:is-loading="main_spinner" :is-relative="false")
error-msg(:show-error="show-error")
app-header(:style="{'height': app-padding}")
.container.container--main
router-view(key="$route.fullPath") -->
  <div id="app">Hello</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters(["main_spinner", "show_error", "app_padding"])
  },
  created() {
    this.$store.dispatch("GET_CONFIGURATION");
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.container {
  position: relative;
  &--main {
    padding-top: 20px;
  }
}

.disable-hover {
  pointer-events: none;
}

ul {
  box-shadow: none;
}
</style>
