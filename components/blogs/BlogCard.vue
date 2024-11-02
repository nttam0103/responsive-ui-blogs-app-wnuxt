<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Blog } from "../../types/interfaces";

const props = defineProps<{
  blog: Blog;
}>();

const emit = defineEmits<{
  (e: "delete"): void;
}>();

const deleteBlog = () => emit("delete");
</script>
<template>
  <li class="m-4 rounded-md border-solid border-2 border-amber">
    <div
      class="flex justify-between p-2 sm:flex-row sm:space-y-0 flex-col space-y-lg"
    >
      <div
        class="flex flex-col space-y-lg items-center w-full sm:flex-row sm:space-y-0 sm:items-start"
      >
        <NuxtLink :to="`blogs/${blog.id}`" class="image-wrapper">
          <img
            :src="
              blog.image.url ===
              'https://mock-api.nals.vn/images/fallback/default.png'
                ? 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg'
                : blog.image.url
            "
            alt="Blog Image"
            class="image-blog"
          />
        </NuxtLink>
        <div class="mx-4">
          <NuxtLink :to="`blogs/${blog.id}`" class="font-semibold text-2xl">
            {{ blog.title }}
          </NuxtLink>
          <p class="content-preview">{{ blog.content }}</p>
        </div>
      </div>
      <div class="flex flex-col justify-around">
        <NuxtLink
          :to="`blogs/${blog.id}`"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 text-center"
        >
          Detail
        </NuxtLink>
        <NuxtLink
          :to="`blogs/${blog.id}/edit`"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 my-1 text-center"
        >
          Edit
        </NuxtLink>
        <button
          @click="deleteBlog"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.image-wrapper {
  width: 150px;
  height: 150px;
  flex-shrink: 0; /* Ngăn giảm kích thước trong flex layout */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.image-blog {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-preview {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
