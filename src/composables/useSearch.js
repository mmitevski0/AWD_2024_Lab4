import { ref, computed, reactive } from 'vue';

export function useSearch(items) {
  const searchTerm = ref('');
  const filters = ref(['title'])

  const filteredItems = computed(() => {
    if(!items.value || !Array.isArray(items.value)) return [];

    return items.value.filter((item) =>
      filters.value.some((filter) => {
        const value = item[filter];
        return value ? value.toString().toLowerCase().includes(searchTerm.value.toLowerCase()) : false;
      })
    );
  });

  return {
    searchTerm,
    filteredItems,
    filters,
  };
}