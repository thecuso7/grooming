<template>
  <div>
    <NuxtLayout :name="layout">
      <v-app></v-app>
    </NuxtLayout>
    <error v-if="errorStore.globalErrors"></error>
  </div>
</template>

<script setup>
  import '~/assets/js/main.js'
  
  const route = useRoute();
  const errorStore = useErrorStore();

  const layout = computed(() => {
    return route.path.startsWith('/admin') ? 'admin' : 'default';
  });

</script>
