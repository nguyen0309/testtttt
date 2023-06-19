<script setup>
import AppHeader from "./AppHeader.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const checkRoute = computed(() => {
  let check = false;
  if (["login", "signup", "forgot"].includes(route.name)) check = true;
  return check;
});
</script>

<template>
  <div
    class="layout-container relative"
    :class="{ 'mh-100': !checkRoute, 'gray-bg': route.path.includes('/redemption/detail'), 'check-route': checkRoute }"
  >
    <AppHeader class="layout-header" />
    <div class="layout-content" :class="{ 'new-padding': checkRoute }">
      <router-view />
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.layout-container {
  width: 375px;
  margin: auto;
  background: #ffffff;
  overflow: hidden;
  overflow-y: auto;
}
.mh-100 {
  min-height: 100vh;
}
.layout-header {
  position: fixed;
  top: 0;
  width: 375px;
  z-index: 2;
}
.layout-content {
  padding: 104px 24px 32px;
  min-height: calc(100vh - 136px);
}
.new-padding {
  padding: 128px 40px 48px !important;
  min-height: max-content !important;
}
.check-route {
  position: absolute !important;
  top: 50% !important;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 24px !important;
}

::-webkit-scrollbar {
  display: none;
}
.gray-bg {
  background: #f9fafb;
}
@media (min-width: 1024px) {
  .layout-container {
    width: 744px;
  }
  .layout-header {
    width: 744px;
  }
  .layout-content {
    padding: 104px 40px 48px;
    min-height: calc(100vh - 152px);
  }
}
</style>
