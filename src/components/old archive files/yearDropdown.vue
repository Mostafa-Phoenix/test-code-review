<script setup lang="ts">
import {ref, reactive} from "vue";
import { Icon } from '@iconify/vue';
import MonthDropdown from './monthDropdown.vue';
let x = 2023; // start year
const years = ref([x]);
for(let i = 1; i <= 0; i++) { // add more years
  years.value.push( x + i );
}
const openStates = reactive(years.value.reduce((acc, year) => ({...acc, [year]: false}), {}));

const open = (year) => {
    openStates[year] = !openStates[year];
}
</script>

<template>
    <div v-for="year of years" class=" border-2 p-2 rounded-lg" >
        <div class="year-header flex justify-between ">
            <div style="font-size: 1.7rem">{{ year }}</div>
            <button @click="() => open(year)"><Icon icon="mdi:form-dropdown" width="2rem" /></button>
        </div>
        <transition>
            <MonthDropdown v-if="openStates[year]" :year="year" />
        </transition>
    </div>
</template>

<style scoped>

</style>