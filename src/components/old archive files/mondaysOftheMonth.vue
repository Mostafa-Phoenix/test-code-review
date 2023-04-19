<script setup lang="ts">
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
import { getMondays } from "../../helpers/getMonday";
import D2input from "./D2input.vue";

const props = defineProps<{
  year: number
  month: number
}>();

type StrapiCollectionEater = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
  }
}

type StrapiCollectionMonth = {
  id: number;
  attributes: {
    mondays: string;
    cooks: string;
    food: string;
    eats: string;
    absent: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    participants: {
      data: StrapiCollectionEater[]
    }
  }
}

const mondays = getMondays(props.year, props.month);
const inputValues = ref<StrapiCollectionMonth[]>([]);

const fetchData = async () => {
  const response = await fetch("http://localhost:1337/api/months?populate=participants");
  const responseData = await response.json();

  if (responseData.data && Array.isArray(responseData.data)) {
    inputValues.value = responseData.data
  } else {
    console.error('Data fetched is not an array:', responseData);
  }
};

const saveItem = async (date: Date, field: Omit<keyof StrapiCollectionMonth["attributes"], "participants">, value: string) => {
  const item = getInputValue(date)
  let method, url, data;

  if(item) {
    method = "PUT"
    url = `http://localhost:1337/api/months/${item.id}`
    item.attributes[field] = value
    data = item.attributes
  } else {
    method = "POST"
    url = "http://localhost:1337/api/months"
    data = {
      mondays: date,
      [field]: value,
    }
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'data': data}),
    });

    if (response.ok) {
      console.log("Data saved successfully");
    } else {
      console.error("Error saving data");
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }

  void fetchData()
}

const getInputValue = (date: Date) => {
  return inputValues.value.find((item) => {
    console.log(item.attributes.mondays, date.toISOString().split('T')[0])
    return item.attributes.mondays === date.toISOString().split('T')[0];
  })
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div>
    <div v-for="monday in mondays" class="p-5 flex gap-5 flex-col xl:flex-row border-2 border-rose-500 m-3 rounded-lg" :key="monday">
      <div class="flex">
        Date :
        {{ new Date(monday).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
      </div>
      <D2input
          placeholder="Who cooks"
          label="Chef :"
          :modelValue="getInputValue(monday)?.attributes.cooks"
          @update:modelValue="(value) => saveItem(monday, 'cooks', value)"
          @input-blur="saveData"
      />
      <D2input
          placeholder="What is cooked"
          label="Food :"
          :modelValue="getInputValue(monday)?.attributes.food"
          @update:modelValue="(value) => saveItem(monday, 'food', value)"
          @input-blur="saveData"
      />
      <D2input
          placeholder="Who eats"
          label="Joins :"
          :modelValue="getInputValue(monday)?.attributes.eats"
          @update:modelValue="(value) => saveItem(monday, 'eats', value)"
          @input-blur="saveData"
      />

<!--      while
      <D2input
          placeholder="Who is absent"
          :modelValue="getInputValue(monday)?.attributes.absent"
          @update:modelValue="(value) => saveItem(monday, 'absent', value)"
          @input-blur="saveData"
      />
      is absent-->
    </div>
  </div>
</template>

<style scoped>
</style>