<script setup>
import { ref } from "vue";
const open = ref("true");
const seeInformation = () => {
  open.value != open.value;
};
</script>
<template>
  <div class="header mb-8">Redemption detail</div>
  <div class="detail">
    <div class="mb-4 flex justify-center"><img src="@/assets/image/ribbon.png" alt="ribbon" /></div>
    <div class="claim-text mb-1 text-center">Claim reward</div>
    <div class="point-taken mb-6 flex items-center justify-center"><img src="@/assets/image/minus.png" alt="minus" /> 56 points</div>
    <div class="transaction-info">
      <div class="flex items-center justify-between mb-3">
        <div class="title">Transaction ID</div>
        <div class="content">T001</div>
      </div>
      <div class="flex items-center justify-between mb-3">
        <div class="title">DATE</div>
        <div class="content">March 16, 2023</div>
      </div>
      <div class="flex items-center justify-between mb-3">
        <div class="title">Redeemed vouchers</div>
        <div class="content">2</div>
      </div>
      <div class="line mb-3"></div>
      <div class="flex items-center justify-between mb-3">
        <div class="title">Vouchers</div>
        <div class="content">$10 COUPON</div>
      </div>
      <div class="flex items-center justify-between mb-3">
        <div class="title">Category</div>
        <div class="content">F&B</div>
      </div>
      <div class="flex items-center justify-between mb-3">
        <div class="title">Redemption information</div>
        <div @click="seeInformation"><img src="@/assets/image/arrowUp.png" alt="arrowUp" /></div>
      </div>
      <div class="information mb-3">
        Lorem ipsum dolor sit amet consectetur. Nisl turpis adipiscingentesque convallis vestibulum at augue nunc. Sapien nibh sapien id neque
        aliquam. In euismod dolor nunc viverra urna amet molestie quam.
      </div>
      <div class="line mb-3"></div>
      <div class="brand-info flex gap-4">
        <img src="@/assets/image/jollibee.png" alt="jollibee" />
        <div>
          <div class="brand-name mb-1">Jollibee</div>
          <div class="brand-detail">Lorem ipsum, dolor sit amet consectetur.</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}
.detail {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 16px;
}
.claim-text {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #9ca3af;
}
.point-taken {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #2267d6;
}
.title {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #1f2937;
}
.content {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #1f2937;
}
.line {
  height: 1px;
  background: #e5e7eb;
}
.information {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #6b7280;
  padding-left: 12px;
}
.brand-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}
.brand-detail {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #4b5563;
}
</style>
