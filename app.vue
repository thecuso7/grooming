<template>
  <div>
    <NuxtLayout :name="layout">
      <v-app></v-app>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import '~/assets/js/main.js'

  const route = useRoute()

  const layout = computed(() => {
    return route.path.startsWith('/admin') ? 'admin' : 'default';
  });
</script>
