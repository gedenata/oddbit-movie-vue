<template>
  <div id="app" :style="{ 'padding-top': appPadding }">
    <spinner :is-loading="main_spinner" :is-relative="false"></spinner>
    <error-msg :show-error="showError"></error-msg>
    <app-header :style="{ height: appPadding }"></app-header>
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
    ...mapGetters(["main_spinner", "showError", "appPadding"])
  },
  created() {
    this.$store.dispatch("GET_CONFIGURATION");
  },
  mounted() {
    let body = document.body,
      timer;
    window.addEventListener(
      "scroll",
      () => {
        clearTimeout(timer);
        if (!body.classList.contains("disable-hover")) {
          body.classList.add("disable-hover");
        }
        timer = setTimeout(() => {
          body.classList.remove("disable-hover");
        }, 500);
      },
      false
    );
  }
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
