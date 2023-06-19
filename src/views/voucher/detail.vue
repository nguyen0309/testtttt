<script setup>
import StarIcon from "@/assets/icons/star.vue";
import PlusIcon from "@/assets/icons/plus.vue";
import MinusIcon from "@/assets/icons/minus.vue";
import VrpButton from "@/components/button.vue";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useVoucherService } from "@/services/voucher";
import { useRoute } from "vue-router";
import { useRedemptionService } from "@/services/redemption";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import Redemption from "./confirm.vue";


const route = useRoute();
const voucher = ref({});
const router = useRouter();
const claim_quantity = ref(0);
const open = ref("true");
const user = ref({});
const loading = ref(false);
const openModal = ref(false);

const seeInformation = () => {
  open.value != open.value;
};
const confirmRedemtion = () => {
  openModal.value = true;
};

const disableButton = computed(() => {
  let flag = false;
  if (
    claim_quantity.value == voucher.value.quantity ||
    user.value?.point < (claim_quantity.value + 1) * voucher.value.point ||
    claim_quantity.value == voucher.value?.limit
  )
    flag = true;
  return flag;
});

const getVoucherDetail = async (id) => {
  try {
    loading.value = true;
    const res = await useVoucherService().getById(id);
    // console.log("res1", res.data.point);
    if (res) voucher.value = res.data;
    loading.value = false;
  } catch (e) {
    console.log(e);
  }
};
const getUserStat = async () => {
  try {
    const res = await useRedemptionService().get();
    // console.log("res2", res.data);
    if (res) user.value = res.data.stats;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getVoucherDetail(route.params.id);
  getUserStat();
  console.log();
});
</script>

<template>
  <div class="wrap-voucher">
    <div class="header mb-6">Voucher detail</div>
    <div class="flex items-center justify-center h-544" v-if="loading"><div class="loader"></div></div>
    <div v-else>
      <div class="brand-img"></div>
      <div class="voucher-info">
        <div class="price mb-3">{{ voucher.name }}</div>
        <div class="point gray-text flex items-center gap-1 mb-4" :class="{ active: true }">
          <StarIcon />
          {{ voucher.point || 0 }} points
        </div>
        <div class="line mb-3"></div>
        <div class="flex items-center justify-between mb-3">
          <div class="title">Limit per volunteer</div>
          <div class="content">{{ voucher.limit || 0 }}</div>
        </div>
        <div class="flex items-center justify-between mb-3">
          <div class="title">Category</div>
          <div class="content">{{ voucher?.category?.type }}</div>
        </div>
        <div class="flex items-center justify-between mb-3">
          <div class="title">Quantity</div>
          <div class="content">{{ voucher.quantity }}</div>
        </div>
        <div class="line mb-3"></div>
        <div class="flex items-center justify-between mb-3">
          <div class="title">Redemption information</div>
          <div @click="seeInformation"><img src="@/assets/image/arrowUp.png" alt="arrowUp" /></div>
        </div>
        <div class="information mb-3">
          {{
            voucher.redemption_info ||
            "Lorem ipsum dolor sit amet consectetur. Nisl turpis adipiscingentesque convallis vestibulum at augue nunc.Sapien nibh sapien id neque aliquam. In euismod dolor nunc viverra urna amet molestie quam."
          }}
        </div>
      </div>
      <div class="flex items-center justify-center">
        <hr />
      </div>
      <div class="brand-info flex gap-4">
        <img src="@/assets/image/jollibee.png" alt="jollibee" />
        <div>
          <div class="brand-name mb-1">{{ voucher?.merchant?.name }}</div>
          <div class="brand-detail">Lorem ipsum, dolor sit amet consectetur.</div>
        </div>
      </div>
    </div>
    <div class="number flex items-center justify-center gap-3 mb-3 mt-4">
      <button
        type="button"
        class="button flex items-center justify-center"
        @click="claim_quantity--"
        :disabled="claim_quantity == 0"
        :class="{ disabled: claim_quantity == 0 }"
      >
        <MinusIcon class="icons" aria-hidden="true" />
      </button>
      <div class="quantity flex items-center justify-center">{{ claim_quantity }}</div>
      <button
        type="button"
        class="button flex items-center justify-center"
        @click="claim_quantity++"
        :disabled="disableButton"
        :class="{ disabled: disableButton }"
      >
        <PlusIcon class="icons" aria-hidden="true" />
      </button>
    </div>
    <div class="valid text-center mb-6">Valid until May 22th</div>
    <vrp-button :text="'Confirm'" :disable="claim_quantity == 0" @custom-event="confirmRedemtion" />
  </div>
  <TransitionRoot as="template" :show="openModal">
    <Dialog as="div" class="relative z-10" @close="openModal = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel>
              <redemption :claim_quantity="claim_quantity" :id="voucher.id" @close-modal="openModal = false" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style lang="scss" scoped>
.header {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}
.voucher-info {
  background: #f9fafb;
  border-radius: 0px 0px 16px 16px;
  padding: 16px;
  //   border-bottom: 2px dashed #d1d5db;
}
.active {
  color: #e79ad8 !important;
  fill: #e79ad8 !important;
  stroke: #e79ad8 !important ;
}
.price {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #003c97;
}
.point {
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #e79ad8;
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
.brand-info {
  background: #f9fafb;
  border-radius: 16px;
  padding: 16px;
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
hr {
  border-top: 2px dashed #d1d5db;
  color: #fff;
  background-color: #fff;
  height: 2px;
  width: 90%;
}
.button {
  width: 38px;
  height: 38px;
  background: #2267d6;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 19px;
  color: #ffffff;
}
.disabled {
  background: #d1d5db;
  cursor: not-allowed;
}
.quantity {
  width: 50px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #6b7280;
}
.icons {
  width: 10px;
  height: 10px;
}
.h-544 {
  height: 544px;
}
.brand-img {
  height: 120px;
  background: url("@/assets/image/defaultBanner.png");
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
@media (min-width: 1024px) {
  .brand-img {
    border-radius: 32.4893px 32.4893px 0px 0px;
    height: 243.67px;
    overflow: hidden;
    background: url("@/assets/image/biggerBanner.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
