<script setup lang="ts">
import {reactive, ref} from "vue";
import MondaysOftheMonth from "./mondaysOftheMonth.vue";

import { Icon } from '@iconify/vue';

const props = defineProps({
  year: Number
});

const months = ref(["January",/* "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"*/]);

const openStates = reactive(months.value.reduce((acc, month) => ({...acc, [month]: false}), {}));

const open = (month) => {
  openStates[month] = !openStates[month];
}
</script>

<template>

  <div>
    <div class="month-dropdown flex-col">
      <div v-for="(month, index) of months" class="text-left p-2 border-2 rounded-lg w-auto">
        <div class="year-header flex justify-between ">
        <div style="font-size: 1.7rem">{{ month }}</div>
        <button @click="() => open(month)"><Icon icon="mdi:form-dropdown" color="#999" width="2rem" /></button>
        </div>
        <transition>
          <mondays-ofthe-month v-if="openStates[month]" :year="props.year" :month="index"  />
        </transition>
      </div>
    </div>
  </div>
</template>



<style scoped>
.month-dropdown {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
}
</style>
