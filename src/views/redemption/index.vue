<script setup>
import { ref } from "vue";
import RedemptionBlock from "./item.vue";


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
</script>
<template>
  <div class="title mb-8">Transaction history</div>
  <div class="list-tracsaction">
    <redemption-block v-for="i in listTransaction" :redemption="i" :key="i.id"></redemption-block>
  </div>
</template>
<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
}
.list-tracsaction {
  .transaction-block {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
