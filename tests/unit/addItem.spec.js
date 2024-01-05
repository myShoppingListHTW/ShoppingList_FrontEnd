/**
 * @file addItem.spec.js
 * @description Unit tests for the addItemButton.vue component.
 * Tests the functionality of adding an item through the component's form.
 *
 * @author Rita Chiblaq
 */

import { shallowMount } from '@vue/test-utils';
import addItemButton from '@/components/addItemButton.vue';
import axios from 'axios';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('axios', async () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { name: 'Apple', category: 'FRUIT' } }))
  }
}));

describe('addItemButton.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(addItemButton);
  });

  it('adds item correctly', async () => {
    const button = wrapper.find('.create-item-button');
    await button.trigger('click');

    expect(wrapper.find('.popup').isVisible()).toBe(true);

    const inputName = wrapper.find('#itemName');
    await inputName.setValue('Apple');
    const selectCategory = wrapper.find('#category');
    await selectCategory.setValue('FRUIT');

    await wrapper.find('form').trigger('submit.prevent');

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      name: 'Apple',
      empty: true,
      category: 'FRUIT',
    });
    expect(wrapper.vm.itemName).toBe('');
    expect(wrapper.vm.selectedCategory).toBe('');
    expect(wrapper.vm.popupVisible).toBe(false);
  });
});
