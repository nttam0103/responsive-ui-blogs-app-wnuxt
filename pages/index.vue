<script setup lang="ts"></script>
<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center p-4"
  >
    <h1 class="text-7xl font-bold mb-6">Home Page</h1>
    <p class="text-lg max-w-2xl leading-relaxed mb-4">
      Welcome to our website! Discover our range of services designed to make
      your experience seamless and enjoyable.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div class="p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">Service 1</h2>
        <p class="text-md leading-relaxed">
          Explore our premium offerings and see how we can help you achieve your
          goals.
        </p>
      </div>

      <div class="p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">Service 2</h2>
        <p class="text-md leading-relaxed">
          Benefit from our top-notch support and expertise at every step.
        </p>
      </div>

      <div class="p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">Feature A</h2>
        <p class="text-md leading-relaxed">
          Discover how our innovative solutions can streamline your tasks.
        </p>
      </div>

      <div class="p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">Feature B</h2>
        <p class="text-md leading-relaxed">
          Experience unmatched quality and performance with our tools.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-page {
  height: calc(100vh - 200px);
}
</style>
