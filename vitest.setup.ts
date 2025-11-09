console.log('vitest setup');
import { vi, beforeEach } from 'vitest';
import { ref, computed, reactive } from 'vue';
import { createPinia, setActivePinia } from 'pinia';


vi.stubGlobal('ref', ref);
vi.stubGlobal('computed', computed);
vi.stubGlobal('reactive', reactive);

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

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});

vi.mock('~/middleware/auth.global.ts', () => ({
  default: () => console.log('Public middleware mocked')
}));

// vi.mock('#app', async (importOriginal) => {
//     const actual = await importOriginal() as any;

//     console.log('actual', actual);
//     return {
//         ...actual,
//         useNuxtApp: () => ({
//             $api: vi.fn().mockResolvedValue(fetchPetsListResolved),
//         }),
//     }
// });

// vi.mock('#app', async () => {
//   const actual = await vi.importActual<any>('#app');
//   return {
//     ...actual,
//     useNuxtApp: () => ({
//       $api: vi.fn().mockResolvedValue(fetchPetsListResolved),
//     }),
//   };
// });

vi.stubGlobal('useNuxtApp', () => ({
  $api: vi.fn().mockResolvedValue(fetchPetsListResolved), // фиктивный API-ответ
}));