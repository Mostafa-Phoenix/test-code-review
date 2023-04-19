<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  placeholder: String,
  modelValue: String,
  label: String,
});

const emit = defineEmits(["update:modelValue", "input-blur"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
const isFocused = ref(false);
const handleBlur = (e) => {
  isFocused.value = false;
  const newValue = e.target.value.trim();
  if (newValue === "" || newValue === props.modelValue) return;
  emit("update:modelValue", newValue); // Update the modelValue
  emit("input-blur");
};
</script>

<template>
  <div class="flex">
    <label>{{ label }}</label>
    <input
        class="bg-transparent border-none border-b border-black mx-2 w-stretch"
        :placeholder="isFocused || !modelValue ? placeholder : modelValue"
        @input="handleInput"
        @blur="handleBlur"
        @focus="isFocused = true"
    />
  </div>
</template>

