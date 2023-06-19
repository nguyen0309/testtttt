<script setup>
const props = defineProps(["text", "cancel", "disable"]);
const emit = defineEmits(["custom-event"]);
const emitEvent= () => {
  if (props.disable == true) return;
  emit("custom-event");
}
</script>
<template>
  <div
    class="global-button flex items-center justify-center cursor-pointer"
    @click="emitEvent"
    :class="{ cancel: props.cancel == true, disable: props.disable == true }"
  >
    {{ props.text }}
  </div>
</template>
<style lang="scss" scoped>
.global-button {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: #003c97;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  height: 56px;
}
.cancel {
  background: #ffffff !important;
  color: #374151 !important;
  border: 1px solid #d1d5db;
}
.disable {
  background: #d1d5db !important;
  color: #9ca3af !important;
}
</style>
