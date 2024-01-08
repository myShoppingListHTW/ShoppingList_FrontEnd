/**
 * @file filterSection.spec.js
 * @description Unit tests for the FilterSection.vue component.
 * These tests ensure the functionality of the filter section, including selecting a filter category
 * and selecting the 'No filter' option.
 */

import { shallowMount } from '@vue/test-utils';
import FilterSection from '@/components/FilterSection.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FilterSection.vue', () => {
  let wrapper;
  let categories;

  beforeEach(() => {
    categories = ['FRUIT', 'VEGETABLE', 'MEAT', 'FISH', 'DAIRY', 'BAKERY', 'SWEETS', 'DRINKS', 'ALCOHOL', 'OTHER'];
    wrapper = shallowMount(FilterSection, {
      props: { selectedFilterCategory: '', categories }
    });
  });

  it('emits the updated selected filter category when a category is selected', async () => {
    const select = wrapper.find('select');
    await select.setValue('FRUIT');
    expect(wrapper.emitted('update:selectedFilterCategory')[0][0]).toBe('FRUIT');
  });

  it('emits the updated selected filter category with an empty value when "No filter" is selected', async () => {
    const select = wrapper.find('select');
    await select.setValue('');
    expect(wrapper.emitted('update:selectedFilterCategory')[0][0]).toBe('');
  });
});
