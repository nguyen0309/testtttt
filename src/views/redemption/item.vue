<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["redemption"]);
const viewDetail = (value) => {
  router.push("/redemption/detail/id=" + value.id);
};
</script>
<template>
  <div class="transaction-block flex gap-3 mb-4 cursor-pointer" @click="viewDetail(props.redemption)">
    <div class="point-claimed flex items-center justify-center">
      <img class="icon" src="@/assets/image/minus.png" alt="minus" />
      {{ props.redemption.point }}
    </div>
    <div class="flex-1">
      <div class="text mb-1">You claimed {{ props.redemption.point }} points</div>
      <div class="flex justify-between">
        <div class="activity-time gray-text flex items-center">
          <img class="icon" src="@/assets/image/clock.png" alt="clock" />
          {{ props.redemption.time }}
        </div>
        <div class="activity-number gray-text flex items-center">
          <img class="icon" src="@/assets/image/arrow.png" alt="arrow" />
          {{ props.redemption.shortcut }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.transaction-block {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 12px;

  .point-claimed {
    background: #def0ff;
    border-radius: 12px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #003c97;
    padding: 4px 8px;
    height: 24px;
    width: 46px;
    gap: 2px;
  }
  .text {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #374151;
  }
  .gray-text {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #9ca3af;
    gap: 6px;
  }
  .icon {
    width: 12px;
    height: 12px;
  }
}
</style>
