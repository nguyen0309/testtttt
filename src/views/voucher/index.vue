<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useVoucherService } from "@/services/voucher";
import { useCategoryService } from "@/services/category";
import VoucherBlock from "./item.vue";
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";

const listCategory = ref([]);
const category = ref({ id: "all", type: "All" });
const listVoucher = ref([]);

const loading = ref(false);

const getCatergory = async () => {
  try {
    const res = await useCategoryService().get();
    if (res) listCategory.value = res.data;
    listCategory.value.unshift(category.value);
  } catch (e) {
    console.log(e);
  }
};
const getVoucher = async () => {
  try {
    loading.value = true;
    const res = await useVoucherService().get();
    if (res) listVoucher.value = res.data;
    loading.value = false;
  } catch (e) {
    console.log(e);
  }
};
const filterVoucher = async (id) => {
  try {
    loading.value = true;
    const res = await useVoucherService().filter(id);
    if (res) listVoucher.value = res.data;
    loading.value = false;
  } catch (e) {
    console.log(e);
  }
};

watch(
  category,
  (value) => {
    if (value.id == "all") getVoucher();
    else filterVoucher(value.id);
  },
  { deep: true }
);

onMounted(() => {
  getCatergory();
  getVoucher();
});
</script>
<template>
  <div class="wrap-claim relative">
    <div class="title mb-6">Claim Reward</div>
    <div class="mb-4">
      <Listbox as="div" v-model="category">
        <div class="label">Category</div>
        <div class="relative mt-2">
          <ListboxButton class="w-full select white-bg">
            <span class="text-input">{{ category.type || "" }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions
              class="selext-box absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption as="template" v-for="i in listCategory" :key="i.id" :value="i" v-slot="{ active, selected }">
                <li :class="[active ? 'gray-bg select-text' : 'unselect-text', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.type }}</span>
                  <span v-if="i" :class="[active ? 'select-text' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"> </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
    <div class="list-tracsaction">
      <div class="h-full w-full flex items-center justify-center" v-if="loading"><div class="loader"></div></div>
      <voucher-block v-else v-for="i in listVoucher" :voucher="i" :key="i.id"></voucher-block>
    </div>
    <div class="show-more absolute cursor-pointer">Show more</div>
  </div>
</template>
<style lang="scss" scoped>
.wrap-claim {
  height: calc(100vh - 152px);
}
.list-tracsaction {
  height: calc(100% - 198px);
  overflow-y: auto;
}
.title {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}
.label {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #6b7280;
  margin-bottom: 4px;
}
.white-bg {
  background: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
}
.show-more {
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: #2267d6;
  bottom: 0;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
}
@media (min-width: 1024px) {
  .list-tracsaction {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    .reward-block {
      height: 88px;
      width: calc(50% - 6px);
    }
  }
}
</style>
