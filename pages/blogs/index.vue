<script setup lang="ts">
import { watch, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useState, useAsyncData } from "nuxt/app";
import Api from "../../common/api";
import { Blog } from "../../types/interfaces";
import Pagination from "../../components/Pagination.vue";
import Notification from "../../components/Notification.vue";
import BlogCard from "../../components/blogs/BlogCard.vue";

definePageMeta({
  layout: "false",
});

// Hàm debounce
const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const router = useRouter();
const route = useRoute();

const isNotificationVisible = ref(false);
const loading = ref(false);
const offset = ref<number>(10);
const totalPages = ref(0);
const sortBy = ref("created_at");
const sortDirection = ref("desc");
const currentPage = ref(Number(route.query.page as string) || 1);
const searchQuery = ref((route.query.search as string) || "");
const searchInput = ref<HTMLInputElement | null>(null);

// Use useAsyncData for fetching blogs
const { data: blogs, refresh } = await useAsyncData<Blog[]>(
  "blogs",
  async () => {
    loading.value = true;
    try {
      const response = await Api.getList<{
        data: {
          items: Blog[];
        };
        pagination: {
          count: number;
        };
      }>("/blogs", {
        search: searchQuery.value,
        page: currentPage.value,
        offset: offset.value,
        sort_by: sortBy.value,
        sort_direction: sortDirection.value,
      });

      totalPages.value = Math.ceil(response.pagination.count / offset.value);
      return response.data.items;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    } finally {
      loading.value = false;
    }
  }
);

const debouncedRefresh = debounce(refresh, 500);

function updateQueryAndFetch(query: string, page: number) {
  const sanitizedQuery = query.trim();

  router.push({
    query: {
      ...route.query,
      offset: offset.value,
      q: sanitizedQuery,
      page,
      sortBy: sortBy.value,
      sortDirection: sortDirection.value,
    },
  });
  currentPage.value = page;
  debouncedRefresh();
}
function searchBlogs() {
  updateQueryAndFetch(searchQuery.value, 1);
  searchInput.value?.blur();
}

watch(searchQuery, (newQuery, oldQuery) => {
  if (newQuery !== oldQuery) {
    updateQueryAndFetch(newQuery, 1);
  }
});

watch(currentPage, (newPage) => {
  updateQueryAndFetch(searchQuery.value, newPage);
});

// Watch for sortBy and sortDirection changes
watch(sortBy, () => {
  updateQueryAndFetch(searchQuery.value, currentPage.value);
});

watch(sortDirection, () => {
  updateQueryAndFetch(searchQuery.value, currentPage.value);
});

watch(offset, () => {
  updateQueryAndFetch(searchQuery.value, currentPage.value);
});

async function deleteBlog(id: number) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );
  if (!confirmDelete) {
    return;
  }
  try {
    await Api.delete(`/blogs/${id}`);
    isNotificationVisible.value = true;
    await refresh(); // Refresh the blog list after deletion
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
}

const closeNotification = async () => {
  isNotificationVisible.value = false;
};

function goToPage(page: number) {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    debouncedRefresh();
  }
}

// Fetch all blogs when the component is mounted
onMounted(() => {
  if (searchQuery.value || currentPage.value !== 1) {
    debouncedRefresh();
  }
});
</script>

<template>
  <header class="bg-blue-200">
    <div
      class="container mx-auto px-4 flex flex-col sm:items-center sm:justify-between sm:flex-row py-5 space-y-2 sm:space-y-0"
    >
      <NuxtLink to="/" class="text-3xl font-bold">Home</NuxtLink>
      <form @submit.prevent="searchBlogs" class="sm:w-1/2 w-full flex">
        <input
          type="search"
          class="form-control p-2 rounded-l-md border-solid border-2 border-sky-500 w-full"
          placeholder="Search blogs..."
          v-model="searchQuery"
          ref="searchInput"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
      </form>
      <NuxtLink
        to="/blogs/new"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
      >
        Add New Blog
      </NuxtLink>
    </div>
  </header>
  <div class="container mx-auto mt-5 px-4">
    <div class="w-full flex justify-end">
      <form
        @submit.prevent="searchBlogs"
        class="flex mb-4 space-x-2 sm:w-1/3 md:w-3/5 lg:w-1/3 w-full"
      >
        <select
          v-model="offset"
          class="form-control p-2 rounded-md border-solid border-2 border-sky-500 w-full mt-2"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <select
          v-model="sortBy"
          class="form-control p-2 rounded-md border-solid border-2 border-sky-500 w-full mt-2"
        >
          <option value="title">Title</option>
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>
          <option value="content">Content</option>
          <option value="id">Id</option>
        </select>
        <select
          v-model="sortDirection"
          class="form-control p-2 rounded-md border-solid border-2 border-sky-500 w-full mt-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </form>
    </div>
    <div v-if="loading" class="text-center my-8">
      <p class="text-gray-500">Loading blogs...</p>
    </div>
    <ul
      v-else-if="blogs.length"
      class="card-body rounded-md border-solid border-2 border-blue-400"
    >
      <BlogCard
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
        @delete="deleteBlog(blog.id)"
      />
      <Notification
        v-if="isNotificationVisible"
        title="Notification"
        content="Blog has been successfully deleted!"
        @close="closeNotification"
      />
    </ul>

    <div v-else class="text-center my-8">
      <p class="text-gray-500">No blogs found.</p>
    </div>
  </div>
  <Pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @page-change="goToPage"
  />
</template>

<style scoped>
.card-body {
  height: calc(100vh - 248px);
  overflow: auto;
}
</style>
