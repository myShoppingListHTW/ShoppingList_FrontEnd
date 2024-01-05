/**
 * @file addItem.spec.js
 * @description Unit tests for the addItemButton.vue component.
 * Tests the functionality of adding an item through the component's form.
 *
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

/**
 * Unit tests for addItemButton.vue component.
 */
describe('addItemButton.vue', () => {
  let wrapper;

  /**
   * Before each test, shallow mount the addItemButton component
   * which isolates the test to this component only.
   */
  beforeEach(() => {
    wrapper = shallowMount(addItemButton);
  });

  /**
   * Test case: Adding an item correctly.
   * This test simulates user interaction with the form in the component
   * and checks if axios.post is called with correct arguments.
   */
  it('adds item correctly', async () => {
    // Trigger the popup to open
    const button = wrapper.find('.create-item-button');
    await button.trigger('click');

    // Simulate user input
    const inputName = wrapper.find('#itemName');
    await inputName.setValue('Apple');
    const selectCategory = wrapper.find('#category');
    await selectCategory.setValue('FRUIT');

    // Simulate form submission
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
