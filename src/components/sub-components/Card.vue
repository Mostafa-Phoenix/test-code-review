<script setup lang="ts">
import axios from "axios";
import {reactive, ref} from "vue";
const props = defineProps({
  date: {
    type: Date,
    required: true
  }
})
const dates = props.date;
const year = dates.getFullYear();
const month = (dates.getMonth() + 1).toString().padStart(2, "0");
const day = (dates.getDate() - 1).toString().padStart(2, "0");
const formatedDate: string = `${year}-${month}-${day}`;

type User = {
    "id": number
    "attributes": {
      "state": number
      "createdAt": string
      "updatedAt": string
    }
}
type Eatday = {
  "id"?: number
  "attributes": {
    "date": Date
    "foodName"?: string
    "createdAt"?: string
    "updatedAt"?: string
    "cook"?: {
      "data": User[]
    },
    "guests"?: {
      "data": User[]
    }
  }
}

const url = "http://localhost:1337/api/Eat-Days";
const requestData: Eatday = {
  attributes: {
    date: props.date,
  }
}
const gotEatDay = reactive<Eatday>({
  attributes: {
    date: new Date(),
    foodName: "",
    createdAt: "",
    updatedAt: "",
    cook: {
      data: [],
    },
    guests: {
      data: [],
    },
  },
});
(async () => {
  try {
    const response = await axios.get(url);

    const dateExists = ref(false);
    for (let i = 0; i < response.data.data.length; i++) {
      const date = response.data.data[i].attributes.date;
      gotEatDay.attributes = response.data.data[i].attributes;
      if (formatedDate === date) {
        dateExists.value = true;
        console.log(`${formatedDate} ${date} ${dateExists.value}`);
        break;
      }
    }
    dateExists.value ? console.log(`${formatedDate} does exist`) : console.log(`${formatedDate} does not exist`);

    if (!dateExists.value) {
      try {
        const postResponse = await axios.post(url, requestData)
        console.log(postResponse);
      } catch (postError) {
        console.log(postError);
      }
    }
  } catch (error) {
    console.log(error);
  }
})();

</script>
<template>
  <div>
    {{ gotEatDay.attributes.date }}
  </div>
</template>

