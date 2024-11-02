<script setup lang="ts">
definePageMeta({
  layout: "false",
});

import { useRouter } from "vue-router";
import Api from "../../common/api";
import { Blog } from "../../types/interfaces";
import { useState } from "nuxt/app";
import { ref } from "vue";

const router = useRouter();
const titleError = ref<string | null>(null);
const contentError = ref<string | null>(null);

const blog = useState<Blog>("newBlog", () => ({
  id: 0,
  title: "",
  content: "",
  image: { url: "" },
  data: null,
}));

async function addBlog() {
  titleError.value = null;
  contentError.value = null;

  if (!blog.value.title) {
    titleError.value = "Please enter a Title for the blog.";
  }
  if (!blog.value.content) {
    contentError.value = "Please enter Content for the blog.";
  }
  if (titleError.value || contentError.value) {
    return;
  }

  try {
    await Api.post("/blogs", blog.value);
    await alert("Blog added successfully");
    goBack();
    blog.value = {
      id: 0,
      title: "",
      content: "",
      image: { url: "" },
      data: null,
    };
    titleError.value = null;
    contentError.value = null;
  } catch (error: any) {
    console.error("Error adding blog:", error);
    if (error.message.includes("422")) {
      titleError.value = "Title is too long (maximum is 50 characters).";
    } else {
      contentError.value = "An error occurred while adding the blog.";
    }
  }
}

function goBack() {
  router.back();
}
</script>

<template>
  <header class="bg-sky-600 text-white py-4 mb-6 relative">
    <h2 class="text-3xl font-bold text-center">Add New Blog</h2>
    <button
      @click="goBack"
      class="bg-white text-sky-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition duration-200 absolute left-4 top-1/2 transform -translate-y-1/2"
    >
      Back
    </button>
  </header>
  <div class="container mx-auto my-10 px-4">
    <form @submit.prevent="addBlog" class="space-y-4">
      <div>
        <label for="title" class="block text-lg font-semibold">Title</label>
        <input
          type="text"
          id="title"
          v-model="blog.title"
          class="form-control p-2 rounded-md border-solid border-2 border-sky-500 w-full"
        />
        <div v-if="titleError" class="text-red-500 text-sm mt-1">
          {{ titleError }}
        </div>
      </div>
      <div>
        <label for="content" class="block text-lg font-semibold">Content</label>
        <textarea
          id="content"
          v-model="blog.content"
          class="form-control p-2 rounded-md border-solid border-2 border-sky-500 w-full"
          rows="6"
        ></textarea>
        <div v-if="contentError" class="text-red-500 text-sm mt-1">
          {{ contentError }}
        </div>
      </div>
      <div>
        <label for="image" class="block text-lg font-semibold">Image URL</label>
        <input
          type="text"
          id="image"
          v-model="blog.image.url"
          class="form-control p-2 rounded-md border-solid border-2 border-sky-500 w-full"
          placeholder="Enter image URL"
        />
      </div>
      <div>
        <img
          v-if="blog.image.url"
          :src="blog.image.url"
          alt="Blog Image Preview"
          class="mt-2 mb-4 w-[200px] h-[200px] object-cover rounded"
        />
      </div>

      <div class="flex space-x-2 justify-end mt-6">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
