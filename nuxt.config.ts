import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
    strict: true,
  },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Blog App",
    },
  },
  compatibilityDate: "2024-10-29",
});
