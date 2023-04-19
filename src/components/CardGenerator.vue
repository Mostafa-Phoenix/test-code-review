<script setup lang="ts">
import {ref} from "vue";
import {getNex4Mondays} from "../helpers/getNextMondays";
import Card from "./sub-components/Card.vue";

const mondays = ref(getNex4Mondays()); // array of mondays

</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <div v-for="monday in mondays"> <!--take todays date and add the next 4 mondays to an array and when the date is passed the array is updated with the new dates-->
      <card :date="monday" class="border-2 rounded-lg p-5"/>
    </div>
  </div>

</template>

<style scoped>

</style>