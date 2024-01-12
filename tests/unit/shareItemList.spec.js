import { shallowMount } from '@vue/test-utils';
import ShareItemList from '@/components/ShareItemList.vue'; // Update with your actual path
import { describe, it, expect, vi } from 'vitest';


describe('ShareItemList.vue', () => {
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
