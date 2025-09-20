<template>
	<div>
		<div id="step-2" class="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-p-6 md:tw-p-8">
			<h2 class="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-font-heading">Выбор услуг для Мурка</h2>
			<!-- Комплексы -->
			<div class="tw-space-y-6">
				<div>
					<h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">Комплексы услуг</h3>
					<div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
						<div class="tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-[#7D9E89] tw-border-blue-400 tw-bg-custom-purple">
							<div class="tw-flex tw-justify-between tw-items-start tw-mb-2">
								<h4 class="tw-font-semibold">Полный комплекс</h4>
								<span class="tw-text-green-600 tw-font-bold">2500 ₽</span>
							</div>
							<p class="tw-text-sm tw-text-gray-600 tw-mb-3">Мытье, сушка, стрижка, груминг, чистка ушей</p>
							<div class="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
								<i class="fas fa-clock tw-mr-1"></i>
								<span>2 часа 30 минут</span>
							</div>
						</div>

						<div class="tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-[#7D9E89]">
							<div class="tw-flex tw-justify-between tw-items-start tw-mb-2">
								<h4 class="tw-font-semibold">Базовый уход</h4>
								<span class="tw-text-green-600 tw-font-bold">1500 ₽</span>
							</div>
							<p class="tw-text-sm tw-text-gray-600 tw-mb-3">Мытье, сушка, стрижка когтей, чистка ушей</p>
							<div class="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
								<i class="fas fa-clock tw-mr-1"></i>
								<span>1 час 15 минут</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Основные услуги -->
				<div>
					<h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">Основные услуги</h3>
					<div class="tw-space-y-3">
						<label class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer">
							<input type="checkbox" class="tw-w-5 tw-h-5 tw-text-blue-600 tw-rounded focus:tw-ring-blue-500">
							<span class="tw-flex-1">
								<span class="tw-font-medium">Стрижка под машинку</span>
								<span class="tw-block tw-text-sm tw-text-gray-600">Полная стрижка корпуса</span>
							</span>
							<span class="tw-text-green-600 tw-font-bold">800 ₽</span>
						</label>

						<label class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer">
							<input type="checkbox" class="tw-w-5 tw-h-5 tw-text-blue-600 tw-rounded focus:tw-ring-blue-500" checked>
							<span class="tw-flex-1">
								<span class="tw-font-medium">Модельная стрижка</span>
								<span class="tw-block tw-text-sm tw-text-gray-600">Стрижка ножницами по породе</span>
							</span>
							<span class="tw-text-green-600 tw-font-bold">1200 ₽</span>
						</label>

						<label class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer">
							<input type="checkbox" class="tw-w-5 tw-h-5 tw-text-blue-600 tw-rounded focus:tw-ring-blue-500">
							<span class="tw-flex-1">
								<span class="tw-font-medium">Экспресс-линька</span>
								<span class="tw-block tw-text-sm tw-text-gray-600">Вычесывание подшерстка</span>
							</span>
							<span class="tw-text-green-600 tw-font-bold">600 ₽</span>
						</label>
					</div>
				</div>

				<!-- Дополнительные услуги -->
				<div>
					<h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">Дополнительные услуги</h3>
					<div class="tw-space-y-3">
						<label class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer">
							<input type="checkbox" class="tw-w-5 tw-h-5 tw-text-blue-600 tw-rounded focus:tw-ring-blue-500">
							<span class="tw-flex-1">
								<span class="tw-font-medium">Чистка зубов</span>
								<span class="tw-block tw-text-sm tw-text-gray-600">Специальной пастой</span>
							</span>
							<span class="tw-text-green-600 tw-font-bold">300 ₽</span>
						</label>

						<label class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer">
							<input type="checkbox" class="tw-w-5 tw-h-5 tw-text-blue-600 tw-rounded focus:tw-ring-blue-500">
							<span class="tw-flex-1">
								<span class="tw-font-medium">SPA-процедуры</span>
								<span class="tw-block tw-text-sm tw-text-gray-600">Лечебные маски и бальзамы</span>
							</span>
							<span class="tw-text-green-600 tw-font-bold">500 ₽</span>
						</label>

						<label class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer">
							<input type="checkbox" class="tw-w-5 tw-h-5 tw-text-blue-600 tw-rounded focus:tw-ring-blue-500">
							<span class="tw-flex-1">
								<span class="tw-font-medium">Удаление колтунов</span>
								<span class="tw-block tw-text-sm tw-text-gray-600">Аккуратное распутывание</span>
							</span>
							<span class="tw-text-green-600 tw-font-bold">400 ₽</span>
						</label>
					</div>
				</div>
			</div>

			<!-- Итоговая стоимость -->
			<div class="tw-bg-custom-purple tw-rounded-lg tw-p-4 tw-mt-6">
				<div class="tw-flex tw-justify-between tw-items-center">
					<span class="tw-font-semibold">Общая стоимость:</span>
					<span class="tw-text-xl tw-text-green-600 tw-font-bold">3700 ₽</span>
				</div>
				<div class="tw-flex tw-justify-between tw-items-center tw-mt-2">
					<span class="tw-text-sm tw-text-gray-600">Общее время:</span>
					<span class="tw-text-sm tw-font-medium">3 часа 15 минут</span>
				</div>
			</div>

			<div class="tw-flex tw-justify-between tw-mt-6">
				<button class="tw-px-6 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-text-gray-700 hover:tw-bg-gray-50 tw-transition-colors">
					<i class="fas fa-arrow-left tw-mr-2"></i>Назад
				</button>
				<button class="tw-px-6 tw-py-2 tw-bg-custom-btn tw-text-white tw-rounded-lg tw-transition-colors">
					Далее: Данные <i class="fas fa-arrow-right tw-ml-2"></i>
				</button>
			</div>
		</div>
	</div>
</template>


<script setup>
	
</script>