<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const goToListVoucher = () => {
  router.push("/voucher");
};
const router = useRouter();
onMounted(() => {});
</script>
<template>
  <div class="wrap-content">
    <div class="img flex justify-center"><img src="@/assets/image/promotion.png" alt="promotion" /></div>
    <div class="title mb-2">Promotion</div>
    <div class="description mb-5">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At
      sapiente aliquam accusamus facere veritatis.
    </div>
    <div class="button flex items-center justify-center cursor-pointer" @click="goToListVoucher">OK</div>
  </div>
</template>
<style lang="scss" scoped>
.wrap-content {
  width: 344px;
  background: #ffffff;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 20px 16px;
}
.img {
  margin-bottom: 14px;
}
.title {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #111827;
}
.description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #6b7280;
}
.button {
  padding: 16px 17px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #374151;
}
@media (min-width: 1024px) {
  .wrap-content {
    width: 558px;
  }
}
</style>
