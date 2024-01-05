/**
 * @file filterSection.spec.js
 * @description Unit tests for the FilterSection.vue component.
 * These tests ensure the functionality of the filter section, including selecting a filter category
 * and clearing the filter.
 *
 */

import { shallowMount } from '@vue/test-utils';
import FilterSection from '@/components/FilterSection.vue';
import { describe, it, expect, beforeEach } from 'vitest';


describe('FilterSection.vue', () => {
  let wrapper;
  let categories;

  /**
   * Before each test, shallow mount the FilterSection component with predefined props.
   * This setup provides a fresh instance of the component for each test case.
   */
  beforeEach(() => {
    categories = ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'];
    wrapper = shallowMount(FilterSection, {
      props: { selectedFilterCategory: '', categories }
    });
  });

  /**
   * Test to verify if the component emits the correct event when a filter category is selected.
   * This test simulates a user selecting a category from the dropdown and checks if the
   * 'update:selectedFilterCategory' event is emitted with the selected category.
   */
  it('emits the updated selected filter category', async () => {
    const select = wrapper.find('select');
    await select.setValue('FRUIT');
    expect(wrapper.emitted('update:selectedFilterCategory')[0][0]).toBe('FRUIT');
  });

  /**
   * Test to verify if the component emits the correct event when the filter is cleared.
   * This test sets a filter category, simulates clicking the clear button, and checks if the
   * 'update:deleteSelectedFilter' event is emitted.
   */
  it('emits an event to clear the filter', async () => {
    await wrapper.setProps({ selectedFilterCategory: 'FRUIT' });
    const clearButton = wrapper.find('.clear-filter-button');
    await clearButton.trigger('click');
    expect(wrapper.emitted('update:deleteSelectedFilter')).toBeTruthy();
  });
});
