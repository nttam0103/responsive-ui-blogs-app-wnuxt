<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Api from "../../../common/api";
import { Blog } from "../../../types/interfaces";
import Notification from "../../../components/Notification.vue";

definePageMeta({
  layout: "false",
});

const isNotificationVisible = ref(false);
const router = useRouter();
const titleError = ref<string | null>(null);
const contentError = ref<string | null>(null);

function closeNotification() {
  isNotificationVisible.value = false;
}

const blog = ref<Blog>({
  id: 0,
  title: "",
  content: "",
  image: { url: "" },
  data: null,
});

const originalBlog = ref<Blog | null>(null);
const blogId = router.currentRoute.value.params.id;
const blogIdValue = Array.isArray(blogId) ? blogId[0] : blogId;

async function fetchBlog() {
  try {
    const response = await Api.getById<{ data: Blog }>(`blogs/${blogIdValue}`);
    blog.value = response.data;
    originalBlog.value = { ...response.data };
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
}

async function updateBlog() {
  titleError.value = null;
  contentError.value = null;
  if (!isModified.value) {
    alert("You haven't made any changes to update the blog!!!");
    return;
  }
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
    const response = await Api.put<{ status: number }>(
      `/blogs`,
      blogIdValue,
      blog.value
    );
    console.log("Blog updated successfully", response);
    if (response) {
      isNotificationVisible.value = true; // Hiển thị thông báo khi cập nhật thành công
      fetchBlog();
    }
  } catch (error: any) {
    console.error("Error updating blog:", error);
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

// Computed property to check if the form data has been modified
const isModified = computed(() => {
  return (
    blog.value.title !== originalBlog.value?.title ||
    blog.value.content !== originalBlog.value?.content ||
    blog.value.image.url !== originalBlog.value?.image.url
  );
});

// Lấy blog khi component được mount
onMounted(() => {
  fetchBlog();
});
</script>

<template>
  <header class="bg-sky-600 text-white py-4 mb-6 relative">
    <h2 class="text-3xl font-bold text-center">Blog List</h2>
    <nuxt-link
      to="/blogs"
      class="bg-white text-sky-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition duration-200 absolute left-4 top-1/2 transform -translate-y-1/2"
    >
      Blogs
    </nuxt-link>
  </header>
  <div class="container mx-auto my-10 px-4">
    <form @submit.prevent="updateBlog" class="space-y-4">
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
          :src="
            blog.image.url ===
            'https://mock-api.nals.vn/images/fallback/default.png'
              ? 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg'
              : blog.image.url
          "
          alt="Blog Image Preview"
          class="mt-2 mb-4 w-[200px] h-[200px] object-cover rounded"
        />
      </div>
      <div class="flex space-x-2 justify-end">
        <div
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          <button type="submit" class="px-4">Update</button>
        </div>
      </div>
    </form>

    <Notification
      v-if="isNotificationVisible"
      title="Update Successful"
      content="Your blog post was updated successfully."
      :showGoHomeButton="true"
      @close="closeNotification"
      @go-home="goBack"
    />
  </div>
</template>

<style scoped></style>
