<template>
    <div>
        <div class="tw-flex tw-items-center tw-justify-between tw-border-t tw-border-gray-200 tw-bg-white tw-px-4 tw-py-3 sm:tw-px-6 tw-mt-5">
            <div class="tw-flex tw-flex-1 tw-justify-between sm:tw-hidden">
                <a href="#" class="tw-relative tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50">Previous</a>
                <a href="#" class="tw-relative tw-ml-3 tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50">Next</a>
            </div>
            <div class="tw-hidden sm:tw-flex sm:tw-flex-1 sm:tw-items-center sm:tw-justify-between">
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
                    <nav aria-label="Pagination" class="tw-isolate tw-inline-flex -space-x-px tw-rounded-md tw-shadow-xs">
                        <NuxtLink v-if="currentPage - 1 > 0"
                            :to="{
                                name: 'admin-users', query: { page: currentPage - 1 }
                            }"
                            class="tw-relative tw-hidden tw-items-center tw-px-2 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-inset-ring tw-inset-ring-gray-300 hover:tw-bg-gray-50 focus:tw-z-20 focus:tw-outline-offset-0 md:tw-inline-flex">
                            <svg width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                        <span v-else class="tw-relative tw-inline-flex tw-items-center tw-rounded-l-md tw-px-2 tw-py-2 tw-text-gray-400 tw-inset-ring tw-inset-ring-gray-300 hover:tw-bg-gray-50 focus:tw-z-20 focus:tw-outline-offset-0">
                            <svg width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </span>
                            <template v-for="page in rangePagination">
                                <span v-if="page == '...'" class="tw-relative tw-inline-flex tw-items-center tw-px-2 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-700 tw-inset-ring tw-inset-ring-gray-300 focus:tw-outline-offset-0">...</span>
                                <NuxtLink v-else
                                    :to="{
                                        name: 'admin-users', query: { page: page }
                                    }"
                                    :class="{'tw-bg-indigo-600 tw-text-white' : page == currentPage}" class="tw-rounded-md tw-relative tw-z-10 tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-text-sm tw-font-semibold focus:tw-z-20 focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
                                >{{ page }}</NuxtLink>
                            </template>
                        <NuxtLink v-if="+currentPage + 1 <= totalPages"
                            :to="{
                                name: 'admin-users', query: { page: +currentPage + 1 }
                            }"
                            class="tw-relative tw-hidden tw-items-center tw-px-2 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-inset-ring tw-inset-ring-gray-300 hover:tw-bg-gray-50 focus:tw-z-20 focus:tw-outline-offset-0 md:tw-inline-flex">
                            <svg width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                        <span v-else class="tw-relative tw-inline-flex tw-items-center tw-rounded-l-md tw-px-2 tw-py-2 tw-text-gray-400 tw-inset-ring tw-inset-ring-gray-300 hover:tw-bg-gray-50 focus:tw-z-20 focus:tw-outline-offset-0">
                            <svg width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
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

        console.log('showRange', showRange);
        return showRange;
    });

    const callApi = () => {
        currentPage.value = route.query?.page || 1;
        emit('page-update', {page: route.query?.page || 1});
    }

    watch(() => route.query.page, callApi);
</script>