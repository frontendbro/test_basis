<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions(["GetUsersList"])
  },
  mounted() {
    this.GetUsersList();
  }
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans,
    Helvetica Neue, Arial, sans-serif;
  background-color: #efefef;
  min-height: 100%;
}
</style>
