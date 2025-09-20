<template>
	<div>
		<div id="step-3" class="tw-bg-white tw-rounded-xl tw-shadow-[0px_0px_15px_3px_rgba(0,_0,_0,_0.2)] tw-p-6 md:tw-p-8">
			<h2 class="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-font-heading">Контактные данные</h2>
			
			<div class="tw-grid md:tw-grid-cols-2 tw-gap-6 tw-mb-6">
				<div>
					<label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Имя *</label>
					<input type="text" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-focus-ring" value="Анна">
				</div>
				
				<div>
					<label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Фамилия *</label>
					<input type="text" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-focus-ring" value="Иванова">
				</div>

				<div>
					<label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Телефон *</label>
					<input type="tel" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-focus-ring" value="+7 (912) 345-67-89">
				</div>

				<div>
					<label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Email</label>
					<input type="email" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-focus-ring" value="anna@example.com">
				</div>
			</div>

			<h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">Выбор даты и времени</h3>
			
			<div class="tw-grid md:tw-grid-cols-3 tw-gap-4 tw-mb-6">
				<div class="tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-blue-400">
					<div class="tw-text-center">
						<div class="tw-text-lg tw-font-semibold">Сегодня</div>
						<div class="tw-text-sm tw-text-gray-600">15 ноября</div>
						<div class="tw-text-sm tw-font-medium tw-mt-2">14:00 - 15:30</div>
					</div>
				</div>

				<div class="tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-blue-400 tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-blue-400 tw-border-blue-400 tw-bg-blue-50">
					<div class="tw-text-center">
						<div class="tw-text-lg tw-font-semibold">Завтра</div>
						<div class="tw-text-sm tw-text-gray-600">16 ноября</div>
						<div class="tw-text-sm tw-font-medium tw-mt-2">11:00 - 12:30</div>
					</div>
				</div>

				<div class="tw-border-2 tw-border-gray-200 tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all hover:tw-border-blue-400">
					<div class="tw-text-center">
						<div class="tw-text-lg tw-font-semibold">Сб, 18 нояб</div>
						<div class="tw-text-sm tw-text-gray-600">10:00 - 11:30</div>
						<div class="tw-text-sm tw-text-green-600 tw-font-medium tw-mt-2">Есть слоты</div>
					</div>
				</div>
			</div>

			<div class="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-6">
				<h4 class="tw-font-semibold tw-mb-2">Комментарий к записи</h4>
				<textarea class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-focus-ring" rows="3" placeholder="Особые пожелания или примечания..."></textarea>
			</div>

			<div class="tw-flex tw-justify-between">
				<button class="tw-px-6 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-text-gray-700 hover:tw-bg-gray-50 tw-transition-colors">
					<i class="fas fa-arrow-left tw-mr-2"></i>Назад
				</button>
				<button class="tw-px-6 tw-py-2 tw-bg-custom-btn tw-text-white tw-rounded-lg tw-transition-colors">
					Далее: Подтверждение <i class="fas fa-arrow-right tw-ml-2"></i>
				</button>
			</div>
		</div>
	</div>
</template>


<script setup>
	
</script>