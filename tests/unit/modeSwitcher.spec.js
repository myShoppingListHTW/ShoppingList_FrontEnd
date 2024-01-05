/**
 * @file modeSwitcher.spec.js
 * @description Unit tests for the modeSwitcher.vue component.
 * Tests the functionality of the dark mode toggle switch, including its ability to emit an event upon change.
 *
 */

import { shallowMount } from '@vue/test-utils';
import ModeSwitcher from '@/components/modeSwitcher.vue';
import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Describes a suite of tests for the ModeSwitcher component.
 * Each test ensures that the component functions correctly and emits the appropriate events.
 */
describe('modeSwitcher.vue', () => {
  let wrapper;

  /**
   * Before each test, shallow mount the ModeSwitcher component with the darkMode prop set to false.
   * This setup provides a fresh instance of the component for each test case.
   */
  beforeEach(() => {
    wrapper = shallowMount(ModeSwitcher, {
      props: { darkMode: false }
    });
  });

  /**
   * Test to verify if the component emits the 'toggleDarkMode' event when the switch is clicked.
   * This test simulates a user interaction with the toggle switch and checks if the correct event is emitted.
   */
  it('emits toggleDarkMode event when the switch is clicked', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
    expect(wrapper.emitted('toggleDarkMode')).toBeTruthy();
  });
});
