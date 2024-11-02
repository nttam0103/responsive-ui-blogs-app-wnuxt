<script setup lang="ts">
import { useRoute } from "vue-router";
import Api from "../../../common/api";
import { Blog } from "../../../types/interfaces";
import { useAsyncData } from "nuxt/app";

definePageMeta({
  layout: "false",
});

const route = useRoute();
const { data: blog } = await useAsyncData(
  `blog-${route.params.id}`,
  () =>
    Api.getById<{ data: Blog }>(`blogs/${route.params.id}`).then(
      (response) => response.data
    ),
  {
    watch: [() => route.params.id],
  }
);
</script>

<template>
  <header class="bg-sky-600 text-white py-4 mb-6 relative">
    <h2 class="text-3xl font-bold text-center">Blog Detail</h2>
    <nuxt-link
      to="/blogs"
      class="bg-white text-sky-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition duration-200 absolute left-4 top-1/2 transform -translate-y-1/2"
    >
      Blog List
    </nuxt-link>
  </header>
  <div class="container mx-auto my-10 px-4">
    <div
      v-if="blog"
      class="w-full md:w-3/4 mx-auto p-4 bg-white rounded-md shadow-lg"
    >
      <h1 class="text-4xl font-semibold mb-4 text-center">{{ blog.title }}</h1>
      <div class="w-full flex justify-center">
        <img
          :src="
            blog.image.url ===
            'https://mock-api.nals.vn/images/fallback/default.png'
              ? 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg'
              : blog.image.url
          "
          alt="Blog Image"
          class="h-auto my-4 rounded-md shadow-md p-25"
        />
      </div>
      <p class="text-lg leading-relaxed">{{ blog.content }}</p>
    </div>
    <div v-else>
      <p class="text-gray-500 text-center">Loading blog details...</p>
    </div>
  </div>
</template>

<style scoped></style>
