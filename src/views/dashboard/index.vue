<script setup>
import { ref, onMounted } from "vue";
import RedemptionBlock from "../redemption/item.vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/toast.vue";
import { useRedemptionService } from "@/services/redemption";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import Promotion from "../voucher/promotion.vue";

const router = useRouter();
const route = useRoute();
const showToast = ref(false);
const user = ref({});
const open = ref(false);

const goToTransaction = () => {
  router.push("/redemption");
};
const goToPromotion = () => {
  open.value = true;
};
const getUserStat = async () => {
  try {
    const res = await useRedemptionService().get();
    console.log("res", res);
    if (res) user.value = res.data.stats;
  } catch (e) {
    console.log(e);
  }
};
const listTransaction = ref([
  {
    id: 1,
    point: 30,
    time: "30m ago",
    shortcut: "T001",
  },
  {
    id: 2,
    point: 30,
    time: "30m ago",
    shortcut: "T001",
  },
  {
    id: 3,
    point: 30,
    time: "30m ago",
    shortcut: "T001",
  },
  {
    id: 4,
    point: 30,
    time: "30m ago",
    shortcut: "T001",
  },
  {
    id: 5,
    point: 30,
    time: "30m ago",
    shortcut: "T001",
  },
  {
    id: 6,
    point: 30,
    time: "30m ago",
    shortcut: "T001",
  },
]);
onMounted(() => {
  // console.log("route", route.hash);
  // console.log("router", router.currentRoute.value.hash);
  if (route.hash == "#showToast") {
    router.replace({ hash: "" });
    showToast.value = true;
    // setTimeout(() => {
    //   showToast.value = false;
    // }, 3000);
  }
  getUserStat();
});
</script>
<template>
  <div class="wrap-dashboard">
    <div class="header mb-8 flex justify-between">
      <div>
        <div class="hello">Hi Kim,</div>
        <div class="welcome">Welcome back</div>
      </div>
      <div class="avatar flex items-center justify-center">TW</div>
    </div>
    <div class="user-info flex justify-between gap-4 mb-4">
      <div class="point block flex gap-4 p-4">
        <img class="img" src="@/assets/image/point.png" alt="point" />
        <div>
          <div class="title">Points</div>
          <div class="point-number number">{{ user.point || 0 }}</div>
        </div>
      </div>
      <div class="time block flex gap-4 p-4">
        <img class="img" src="@/assets/image/time.png" alt="point" />
        <div>
          <div class="title">Time</div>
          <div class="time-number number">{{ user.hours || 0 }}h</div>
        </div>
      </div>
    </div>
    <div class="reward w-full flex gap-4 p-4 mb-8">
      <img class="image" src="@/assets/image/reward.png" alt="point" />
      <div>
        <div class="claim-reward mb-1">Claim Reward</div>
        <div class="descripyion mb-3">Lorem ipsum, dolor sit amet consectetur.</div>
        <div class="claim cursor-pointer" @click="goToPromotion">Claim now →</div>
      </div>
    </div>
    <div class="transaction">
      <div class="flex justify-between items-center mb-4">
        <div class="activity">Redemption activity</div>
        <div class="view-all cursor-pointer" @click="goToTransaction">View all</div>
      </div>
      <div class="list-tracsaction">
        <redemption-block v-for="i in listTransaction" :redemption="i" :key="i.id"></redemption-block>
      </div>
    </div>
    <toast v-if="showToast" />
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <promotion />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<style lang="scss" scoped>
.hello {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
}
.welcome {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}
.avatar {
  width: 40px;
  height: 40px;
  background: #ffd3e9;
  border-radius: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
}
.block {
  border-radius: 20px;
  height: 80px;
  width: calc(50% - 8px);
  .img {
    width: 42px;
    height: 42px;
  }
  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #000000;
  }
  .number {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }
  .point-number {
    color: #e79ad8;
  }
  .time-number {
    color: #6b62e0;
  }
}
.point {
  background: #ffe9f3;
}
.time {
  background: #e9e6f9;
}
.reward {
  background: #def0ff;
  border-radius: 24px;
  .image {
    width: 78px;
    height: 78px;
  }
  .claim-reward {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #2267d6;
  }
  .description {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
  }
  .claim {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
  }
}
.transaction {
  .activity {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #000000;
  }
  .view-all {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #2267d6;
  }
  .list-tracsaction {
    .transaction-block {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
