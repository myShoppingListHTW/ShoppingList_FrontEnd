/**
 * @file editItemForm.spec.js
 * @description Unit tests for the EditItemForm.vue component.
 * Tests include editing item name and category and checking if the changes are correctly emitted.
 * @author Rita Chiblaq
 */
import { shallowMount } from '@vue/test-utils';
import EditItemForm from '@/components/EditItemForm.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('EditItemForm.vue', () => {
  let wrapper;
  let editedItem;
  let categories;

  beforeEach(() => {
    editedItem = { name: 'Old Item', category: 'FRUIT' };
    categories = ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'];
    wrapper = shallowMount(EditItemForm, {
      props: { editedItem, categories }
    });
  });

  it('emits the updated item when the name is edited', async () => {
    const nameInput = wrapper.find('input');
    await nameInput.setValue('New Item Name');

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('save-edits')[0][0]).toEqual({ name: 'New Item Name', category: 'FRUIT' });
  });

  it('emits the updated item when the category is edited', async () => {
    const categorySelect = wrapper.find('select');
    await categorySelect.setValue('VEGETABLE');

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('save-edits')[0][0]).toEqual({ name: 'Old Item', category: 'VEGETABLE' });
  });
});
