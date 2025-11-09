import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
// import { mockApi } from '../setup';
import { createPinia, setActivePinia } from 'pinia';
import { ref } from 'vue';

/**
 * 
 * component testing
 * или unit test
 */

import Appointment from '../../components/public/appointment/appointment.vue';

const fetchPetsListResolved = {
	list: [
		{ 
			id: '1',
			name: 'Барсик',
			breed: 'Дворняга',
			age: '2 года',
			weight: '5 кг',
			features: 'Любит спать',
			image: null
		},
		{ 
			id: '2',
			name: 'Мурка',
			breed: 'Сфинкс',
			age: '1 год',
			weight: '3 кг',
			features: 'Игривая',
			image: null
		}
	]	
};

const $apiMock = vi.fn().mockResolvedValue(fetchPetsListResolved);
vi.stubGlobal('useNuxtApp', () => ({
  $api: $apiMock, // фиктивный API-ответ
}));

const makeField = () => ({
  $touch: vi.fn(),
  $errors: [],
});

vi.stubGlobal('useValidation', () => ({
  validate: () => ({
      v$: ref({
      name: makeField(),
      age: makeField(),
      weight: makeField(),
      breed: makeField(),
      features: makeField(),
      $anyDirty: false,
      $reset: vi.fn(),
    }),
      updateValidateFromApi: vi.fn(),
    }),
}));

// vi.mock('@/composables/validation', () => ({
//   useValidation: () => ({
//     validate: () => ({
//       v$: ref({
//         $anyDirty: false,
//         $errors: [],
//         $reset: vi.fn(),
//       }),
//       updateValidateFromApi: vi.fn(),
//     }),
//   }),
// }));

describe('Pets', () => {
  // beforeEach(() => {
	//   const pinia = createPinia();
  //   setActivePinia(pinia);

  //   // mockApi.mockReset(); // Очищаем мок перед каждым тестом
	//   // mockApi.mockResolvedValue(fetchPetsListResolved);
  // });

  it('should display pets data', async () => {
    // 1. Настраиваем ожидаемые данные
    /**
     * сюда надо как-то присобачить дефолтный pinia
     * 
     */
    const wrapper = mount(Appointment, {
      props: { ids: ['1', '2'] }
    });

    await flushPromises();

    expect(wrapper.text()).toContain('Барсик');
    expect(wrapper.text()).toContain('Мурка');
    expect($apiMock).toHaveBeenCalledWith('/api/pets?id=1,2');

    // await wrapper.find('.open-form').trigger('click');
    // expect(wrapper.vm.showFormAdd).toBe(true);

    // await wrapper.find('.close-form').trigger('click');
    // expect(wrapper.vm.showFormAdd).toBe(false);
  });
});