/**
 * Test unit for the ShareItemList component .
 *
 * This suite of tests focuses on the functionality related to copying the shopping list to the clipboard
 * and displaying alerts to the user. It includes tests for successful copying and error handling scenarios.
 */
import { shallowMount } from '@vue/test-utils';
import ShareItemList from '@/components/ShareItemList.vue'; // Update with your actual path
import { describe, it, expect, vi } from 'vitest';


describe('ShareItemList.vue', () => {
    /**
     * Test case: Copies empty items to clipboard and shows alert.
     *
     * This test verifies that when the user triggers the "shareShoppingList" function,
     * the shopping list with empty items is copied to the clipboard, and an alert is displayed.
     */
    it('copies empty items to clipboard and shows alert', async () => {
        // Mock clipboard API
        const clipboardSpy = vi.fn();
        global.navigator.clipboard = { writeText: clipboardSpy };

        // Mock window.alert
        window.alert = vi.fn();

        const items = [{ name: 'Item 1', empty: true }, { name: 'Item 2', empty: false }];
        const wrapper = shallowMount(ShareItemList, {
            props: { items },
            global: {
                stubs: {
                    'font-awesome-icon': true // Replace FontAwesomeIcon with a stub
                }
            }
        });

        // Trigger the method
        await wrapper.vm.shareShoppingList();

        // Check if clipboard.writeText was called with correct text
        const expectedText = 'Item 1'; // Updated expected text
        expect(clipboardSpy).toHaveBeenCalledWith(expectedText);

        // Check if alert was called
        expect(window.alert).toHaveBeenCalledWith('shopping list copied to clipboard!');
    });
    /**
     * Test case: Shows error alert if clipboard API fails.
     *
     * This test verifies that if an error occurs while attempting to copy the shopping list to the clipboard,
     * an error alert is displayed to the user.
     */
    it('shows error alert if clipboard API fails', async () => {
        // Mock clipboard API to throw error
        const clipboardSpy = vi.fn().mockRejectedValue(new Error('Clipboard error'));
        global.navigator.clipboard = { writeText: clipboardSpy };

        // Mock window.alert
        window.alert = vi.fn();

        const items = [{ name: 'Item 1', empty: true }];
        const wrapper = shallowMount(ShareItemList, {
            props: { items },
            stubs: {
                'font-awesome-icon': true // Stubbing FontAwesomeIcon locally
            }
        });

        // Trigger the method
        await wrapper.vm.shareShoppingList();

        // Check if error alert was called
        expect(window.alert).toHaveBeenCalledWith('Failed to copy shopping list to clipboard.');
    });
});
