<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Nuxt Blog App</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink class="font-semibold" to="/">Home</NuxtLink></li>
          <li><NuxtLink class="font-semibold" to="/about">About</NuxtLink></li>
          <li><NuxtLink class="font-semibold" to="/blogs">Blogs</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
