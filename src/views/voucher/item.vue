<script setup>
import { useRouter } from "vue-router";
import StarIcon from "@/assets/icons/star.vue";

const router = useRouter();
const props = defineProps(["voucher"]);
const viewDetail = (value) => {
  router.push("/voucher/detail/id=" + value.id);
};
</script>
<template>
  <div class="reward-block flex gap-3 mb-4 cursor-pointer" @click="viewDetail(props.voucher)">
    <img class="brand-img" src="@/assets/image/jollibee.png" alt="brand-img" />
    <div class="flex-1">
      <div class="text mb-1">{{ props.voucher.merchant.name }}</div>
      <div class="price mb-1">{{ props.voucher.name }}</div>
      <div class="flex justify-between">
        <div class="activity-time gray-text flex items-center gap-1" :class="{ active: props.voucher.quantity > 5 }">
          <StarIcon />
          {{ props.voucher.point || 0 }} points
        </div>
        <div class="activity-number gray-text flex items-center gap-1">
          <img class="icon" src="@/assets/image/ticket.png" alt="ticket" />
          {{ props.voucher.quantity }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.reward-block {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 12px;

  .brand-img {
    width: 50px;
    height: 50px;
    background: #ffffff;
    border-radius: 8px;
  }
  .text {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #4b5563;
  }
  .price {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 240px;
  }
  .gray-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #9ca3af;
  }
  .icon {
    width: 16px;
    height: 16px;
  }
}
.active {
  color: #e79ad8 !important;
  fill: #e79ad8 !important;
  stroke: #e79ad8 !important ;
}
</style>
