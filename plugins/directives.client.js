export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('click-outside', {
		mounted(el, binding) {
			el.clickOutsideEvent = (event) => {
				const excludeElement = binding.arg ? document.querySelector(binding.arg) : null;
				const isExcluded = excludeElement && (event.target === excludeElement || excludeElement.contains(event.target));

				if(!(el === event.target || el.contains(event.target)) && binding.value !== null && !isExcluded) {
					binding.value(event);
				}
			}
			document.addEventListener('click', el.clickOutsideEvent);
		},
		onUnmounted(el) {
			document.removeEventListener('click', el.clickOutsideEvent);
		}
	})
})