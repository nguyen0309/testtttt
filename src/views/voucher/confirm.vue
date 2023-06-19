<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import VrpButton from "@/components/button.vue";
import { useRedemptionService } from "@/services/redemption";

const router = useRouter();
const emit = defineEmits(["close-modal"]);
const props = defineProps(["claim_quantity", "id"]);
const cancel = () => {
  emit("close-modal");
};
const confirm = async () => {
  try {
    const res = await useRedemptionService().claim(props.claim_quantity, props.id);
    if (res.data) {
      router.push("/dashboard#showToast");
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {});
</script>
<template>
  <div class="wrap-content">
    <div class="img flex justify-center mb-3"><img src="@/assets/image/redemption.png" alt="redemption" /></div>
    <div class="title mb-2">Confirm Redemption</div>
    <div class="description mb-5">
      Success! 🎉 Your voucher has been redeemed. Keep an eye on your email - you'll receive the eVoucher within 2 working days.
    </div>
    <vrp-button class="mb-3" :text="'Confirm'" @custom-event="confirm" />
    <vrp-button :text="'Cancel'" @custom-event="cancel" :cancel="true" />
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
