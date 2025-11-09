import { vi, beforeEach } from 'vitest';
import { config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

// Просто создаем мок-функцию для API
const mockApi = vi.fn();

beforeEach(() => {
  const pinia = createPinia();
  setActivePinia(pinia);
});

export { mockApi };