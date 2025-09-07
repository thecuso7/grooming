<template>
    <div>
        <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5">
            <div class="flex flex-1 justify-between sm:hidden">
                <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                <p class="text-sm text-gray-700">
                    Показано
                    <span class="font-medium">1</span>
                    -
                    <span class="font-medium">{{ items.length }}</span>
                    из
                    <span class="font-medium">{{ totalCount }}</span>
                    записей
                </p>
                </div>
                <div>
                    <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        <NuxtLink v-if="currentPage - 1 > 0"
                            :to="{
                                name: 'admin-users', query: { page: currentPage - 1 }
                            }"
                            class="relative hidden items-center px-2 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                        <span v-else class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </span>
                            <template v-for="page in rangePagination">
                            
                            <span v-if="page == '...'" class="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-700 inset-ring inset-ring-gray-300 focus:outline-offset-0">...</span>
                            <NuxtLink v-else
                                :to="{
                                    name: 'admin-users', query: { page: page }
                                }"
                                :class="{'bg-indigo-600 text-white' : page == currentPage}" class="rounded-md relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >{{ page }}</NuxtLink>
                            </template>
                        <NuxtLink v-if="+currentPage + 1 <= totalPages"
                            :to="{
                                name: 'admin-users', query: { page: +currentPage + 1 }
                            }"
                            class="relative hidden items-center px-2 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                        <span v-else class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    const route = useRoute();
    const emit = defineEmits(['page-update']);

    const { items, totalCount, totalPages } = defineProps(['items', 'totalCount', 'totalPages']);

    const currentPage = ref(route.query?.page || 1);
    const maxLengthPagen = ref(6);


    const rangePagination = computed(() => {
        let range = [];
        let showRange = [];
        let past = false;

        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }

        if(totalPages > maxLengthPagen.value) {
            range.forEach((page, index) => {
                if(page == 1 || page == range.length) {
                    showRange.push(page);
                } else if (
                    (page < currentPage.value && (currentPage.value >= 4) && (currentPage.value - page > 1)) ||
                    (page > currentPage.value && (currentPage.value <= totalPages - 4) && (page - currentPage.value > 1))
                ) {
                    if(
                        (
                            currentPage.value < 4 && (page <= currentPage.value) && totalPages - currentPage.value > 2 ||
                            currentPage.value < 4 && (page <= 4) ||
                            (totalPages - currentPage.value < 4) && totalPages - page < 4 ||
                            totalPages - currentPage.value < 4 && page > totalPages - 4
                        )
                    ) {
                        showRange.push(page);
                    } else if(!past) {
                        showRange.push('...'); 
                        past = true;   
                    }
                } else {
                    showRange.push(page);
                    past = false;
                }
            })
        } else {
            showRange = range;
        }
        return showRange;
    });

    const callApi = () => {
        currentPage.value = route.query?.page || 1;
        emit('page-update', {page: route.query?.page || 1});
    }

    watch(() => route.query.page, callApi);
</script>