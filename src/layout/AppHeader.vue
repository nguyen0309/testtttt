<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const checkRoute = computed(() => {
  let check = true;
  if (["login", "signup", "forgot"].includes(route.name)) check = false;
  return check;
});
</script>
<template>
  <div class="wrap-header flex items-center justify-between">
    <div>
      <img src="@/assets/image/logo.png" alt="logo" />
    </div>
    <div class="cursor-pointer" v-if="checkRoute">
      <img src="@/assets/image/menu.png" alt="logo" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap-header {
  height: 80px;
  padding: 24px;
  background: #ffffff;
}
@media (min-width: 1024px) {
  .wrap-header {
    padding: 24px 40px;
  }
}
</style>
