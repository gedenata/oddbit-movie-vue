<template>
  <div id="app" :style="{ 'padding-top': app_padding }">
    <spinner :is-loading="main_spinner" :is-relative="false"></spinner>
    <error-msg :show-error="show_error"></error-msg>
    <app-header :style="{ height: app_padding }"></app-header>
    <div class="container container--main">
      <router-view key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AppHeader from "@/components/AppHeader";
import Spinner from "@/components/Spinner";
import ErrorMsg from "@/components/ErrorMsg";

export default {
  components: {
    AppHeader,
    Spinner,
    ErrorMsg
  },
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
