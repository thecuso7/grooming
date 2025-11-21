<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6">Животные</h1>
        <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-2 tw-gap-6">
			<div v-for="item in pets" class="tw-bg-custom-purple tw-rounded-xl tw-shadow-lg tw-p-6 hover:tw-shadow-lg tw-transition-shadow">
				{{ item.id }}
				<div class="tw-flex tw-justify-between tw-items-start tw-mb-4">
					<div class="tw-w-16 tw-h-16 tw-bg-custom-main tw-rounded-full tw-flex tw-items-center tw-justify-center">
						<v-img
							:src="item.image || '/placeholder.jpg'"
							max-width="300"
							max-height="300"
							cover
							class="mt-4 tw-rounded-full tw-w-[60px] tw-h-[60px] tw-mb-4 tw-m-auto"
						></v-img>
					</div>
					
				</div>
				<h3 class="tw-font-semibold tw-text-gray-800">{{ item.name }}</h3>
				<p class="tw-text-gray-600 tw-text-sm">{{ item.breed }} - {{ item.age }}</p>
			</div>
		</div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { type Pet } from '~/types/Pet';
    const { $api } = useNuxtApp();

    interface PetsResponse {
        list: Pet[],
        pagenParams: {
            totalCount?: number,
            totalPages?: number,
        }
    }

    const pets = ref<Pet[]>([]);
    const totalCount = ref(0);
    const totalPages = ref(0);

    const { data, clear, execute, status } = await useFetch<PetsResponse>(`/api/pets`);

    console.log(data);
    pets.value = data.value?.list || [];
    totalCount.value = data.value?.pagenParams?.totalCount ?? 0;
    totalPages.value = data.value?.pagenParams?.totalPages ?? 1;

    useSeoMeta({
        title: 'Заголовок страницы',
        description: 'Описание страницы для SEO',
        ogTitle: 'Заголовок для соцсетей',
        ogDescription: 'Описание для соцсетей',
        ogImage: '/images/og-image.jpg',
        ogUrl: 'https://site.com/page',
        twitterCard: 'summary_large_image',
        robots: 'index, follow'
    });
</script>