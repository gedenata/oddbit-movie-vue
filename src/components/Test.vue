<template>
  <div>
    <button class="btn" v-show="loggedIn">Logout</button>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      loggedIn: false
    };
  }
};
</script>
