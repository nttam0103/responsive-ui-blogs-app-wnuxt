<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();
</script>

<template>
  <div class="container mx-auto px-4 flex justify-end my-4">
    <button
      @click="emit('page-change', props.currentPage - 1)"
      :class="{
        'bg-gray-300 cursor-not-allowed': props.currentPage === 1,
        'bg-blue-500 hover:bg-blue-600': props.currentPage > 1,
      }"
      :disabled="props.currentPage === 1"
      class="px-4 py-2 text-white rounded transition duration-200"
    >
      Previous
    </button>
    <span class="px-4 py-2"
      >Page {{ props.currentPage }} of {{ props.totalPages }}</span
    >
    <button
      @click="emit('page-change', props.currentPage + 1)"
      :class="{
        'bg-gray-300 cursor-not-allowed':
          props.currentPage === props.totalPages,
        'bg-blue-500 hover:bg-blue-600': props.currentPage < props.totalPages,
      }"
      :disabled="props.currentPage === props.totalPages"
      class="px-4 py-2 text-white rounded transition duration-200"
    >
      Next
    </button>
  </div>
</template>

<style scoped></style>
