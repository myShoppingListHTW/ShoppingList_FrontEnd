
// Remove the default export from the Table component
// export default {
//   name: 'Table',
//   // ...
// };
<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
  { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
  {
    isActive: false,
    age: 9,
    name: { first: 'Mini', last: 'Navarro' },
    _rowVariant: 'success'
  },
  { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
  { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
  { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
  { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
  {
    isActive: true,
    age: 87,
    name: { first: 'Larsen', last: 'Shaw' },
    _cellVariants: { age: 'danger', isActive: 'warning' }
  },
  { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
  { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
  { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
  { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
]);

const fields = ref([
  { key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc' },
  { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
  {
    key: 'isActive',
    label: 'Is Active',
    formatter: (value: any, key: string, item: any) => {
      return value ? 'Yes' : 'No';
    },
    sortable: true,
    sortByFormatted: true,
    filterByFormatted: true
  },
  { key: 'actions', label: 'Actions' }
]);

const totalRows = ref(1);
const currentPage = ref(1);
const perPage = ref(5);
const pageOptions = ref([5, 10, 15, { value: 100, text: 'Show a lot' }]);
const sortBy = ref('');
const sortDesc = ref(false);
const sortDirection = ref('asc');
const filter = ref(null);
const filterOn = ref([]);

const infoModal = ref({
  id: 'info-modal',
  title: '',
  content: ''
});

const sortOptions = computed(() => {
  // Create an options list from our fields
  return fields.value
    .filter(f => f.sortable)
    .map(f => {
      return { text: f.label, value: f.key };
    });
});
/*
function info(item, index, button) {
  infoModal.value.title = `Row index: ${index}`;
  infoModal.value.content = JSON.stringify(item, null, 2);
  appContext.emit('bv::show::modal', infoModal.value.id, button);
}
*/
function resetInfoModal() {
  infoModal.value.title = '';
  infoModal.value.content = '';
}

function onFiltered(filteredItems: Array<any>) {

  // Trigger pagination to update the number of buttons/pages due to filtering
  totalRows.value = filteredItems.length;
  currentPage.value = 1;
}
</script>

<template>
  <!-- Your template code here -->
</template>

<script>
import { computed, getCurrentInstance } from 'vue';

export default {
 /* setup() {
    const appContext = getCurrentInstance().appContext;

    return {
      items,
      fields,
      totalRows,
      currentPage,
      perPage,
      pageOptions,
      sortBy,
      sortDesc,
      sortDirection,
      filter,
      filterOn,
      infoModal,
      sortOptions,
      info,
      resetInfoModal,
      onFiltered
    };
  }*/
};
</script>

</template>
