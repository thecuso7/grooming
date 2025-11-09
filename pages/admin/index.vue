<template>
    <div>
        <h1 class="tw-text-3xl tw-text-black tw-pb-6 tw-font-heading">Главная</h1>
        <!-- Графики и диаграммы -->
    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6">
      <!-- График активности -->
      <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">Активность за неделю</h3>
        <div class="tw-space-y-3">
          <div class="tw-flex tw-items-center tw-justify-between">
            <span class="tw-text-sm tw-text-gray-600">Понедельник</span>
            <div class="tw-w-32 tw-h-3 tw-bg-gray-200 tw-rounded-full">
              <div class="tw-h-3 tw-bg-blue-500 tw-rounded-full" style="width: 70%"></div>
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-justify-between">
            <span class="tw-text-sm tw-text-gray-600">Вторник</span>
            <div class="tw-w-32 tw-h-3 tw-bg-gray-200 tw-rounded-full">
              <div class="tw-h-3 tw-bg-blue-500 tw-rounded-full" style="width: 85%"></div>
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-justify-between">
            <span class="tw-text-sm tw-text-gray-600">Среда</span>
            <div class="tw-w-32 tw-h-3 tw-bg-gray-200 tw-rounded-full">
              <div class="tw-h-3 tw-bg-blue-500 tw-rounded-full" style="width: 60%"></div>
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-justify-between">
            <span class="tw-text-sm tw-text-gray-600">Четверг</span>
            <div class="tw-w-32 tw-h-3 tw-bg-gray-200 tw-rounded-full">
              <div class="tw-h-3 tw-bg-blue-500 tw-rounded-full" style="width: 90%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Круговая диаграмма -->
      <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
        <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">Распределение услуг</h3>
        <div class="tw-flex tw-items-center tw-justify-center">
          <div class="tw-relative tw-w-40 tw-h-40">
            <div class="tw-absolute tw-inset-0 tw-border-8 tw-border-blue-500 tw-rounded-full"></div>
            <div class="tw-absolute tw-inset-0 tw-border-8 tw-border-green-500 tw-rounded-full tw-clip-path-[polygon(0%_0%,_50%_0%,_50%_50%,_0%_50%)]"></div>
            <div class="tw-absolute tw-inset-0 tw-border-8 tw-border-yellow-500 tw-rounded-full tw-clip-path-[polygon(50%_0%,_100%_0%,_100%_50%,_50%_50%)]"></div>
          </div>
        </div>
        <div class="tw-mt-4 tw-space-y-2">
          <div class="tw-flex tw-items-center">
            <div class="tw-w-3 tw-h-3 tw-bg-blue-500 tw-rounded-full"></div>
            <span class="tw-text-sm tw-text-gray-600 tw-ml-2">Стрижка</span>
          </div>
          <div class="tw-flex tw-items-center">
            <div class="tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full"></div>
            <span class="tw-text-sm tw-text-gray-600 tw-ml-2">Мытье</span>
          </div>
          <div class="tw-flex tw-items-center">
            <div class="tw-w-3 tw-h-3 tw-bg-yellow-500 tw-rounded-full"></div>
            <span class="tw-text-sm tw-text-gray-600 tw-ml-2">Уход</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Быстрые действия -->
    <div class="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
      <h3 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-4">Быстрые действия</h3>
      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <button class="tw-p-4 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-text-gray-500 tw-hover:border-gray-400 tw-transition-colors">
          <div class="tw-text-center">
            <div class="tw-w-8 tw-h-8 tw-bg-gray-200 tw-rounded tw-mx-auto tw-mb-2"></div>
            <span class="tw-text-sm">Добавить пользователя</span>
          </div>
        </button>
        <button class="tw-p-4 tw-border-2 tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-text-gray-500 tw-hover:border-gray-400 tw-transition-colors">
          <div class="tw-text-center">
            <div class="tw-w-8 tw-h-8 tw-bg-gray-200 tw-rounded tw-mx-auto tw-mb-2"></div>
            <span class="tw-text-sm">Услуги</span>
          </div>
        </button>
      </div>
    </div>
    </div>
</template>

<script setup>
</script>