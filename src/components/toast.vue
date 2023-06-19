<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["show"]);
const show = ref(true);
const viewStatus = () => {
  router.push("/redemption/detail/id=1");
};
</script>
<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="toast-notify">
      <div class="flex gap-14">
        <img class="img" src="@/assets/image/success.png" alt="redemption" />
        <div>
          <div class="text mb-10">Redemption successful</div>
          <div class="flex gap-28">
            <div class="text cursor-pointer" @click="viewStatus">View status</div>
            <div class="text cursor-pointer" @click="show = false">Dismiss</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.toast-notify {
  padding: 16px;
  background: #ecfdf5;
  border-radius: 6px;
  position: fixed;
  top: 20px;
  z-index: 3;
  height: 88px;
  left: 50%;
  transform: translateX(-50%);
  width: 344px;
}
.img {
  width: 16px;
  height: 16px;
  margin-top: 2px;
}
.gap-14 {
  gap: 14px;
}
.gap-28 {
  gap: 28px;
}
.mb-10 {
  margin-bottom: 10px;
}
.text {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #065f46;
}
</style>
