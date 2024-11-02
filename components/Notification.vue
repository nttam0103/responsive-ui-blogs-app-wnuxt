<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, defineEmits } from "vue";

const props = defineProps<{
  title: string;
  content: string;
  showGoHomeButton?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "go-home"): void;
}>();

// Hàm đóng pop-up
const closeNotification = () => {
  emit("close"); // Sử dụng emit thay vì $emit
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeNotification();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="modal-overlay" @click="closeNotification">
    <div
      class="notification bg-white border border-gray-300 rounded-lg p-4 shadow-md"
      @click.stop
    >
      <h2 class="text-xl font-bold">{{ props.title }}</h2>
      <p class="mt-2">{{ props.content }}</p>
      <div class="flex justify-end mt-4">
        <button
          @click="closeNotification"
          class="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded transition duration-200 mr-2"
        >
          Close
        </button>
        <button
          v-if="props.showGoHomeButton"
          @click="emit('go-home')"
          class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition duration-200"
        >
          Go Blogs
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.notification {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}
</style>
