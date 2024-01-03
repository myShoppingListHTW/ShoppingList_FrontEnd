//addItem.test.js
import { shallowMount } from '@vue/test-utils';
import addItemButton from '@/components/addItemButton.vue';

describe('addItemButton.vue', () => {
  it('calls "addItem" method on form submission', async () => {
    const wrapper = shallowMount(addItemButton);
    const addItemSpy = jest.spyOn(wrapper.vm, 'addItem');

    // Mock form data
    wrapper.setData({ itemName: 'New Item', selectedCategory: 'FRUIT' });

    // Find form and trigger submit event
    await wrapper.find('form').trigger('submit.prevent');

    // Check if addItem method was called
    expect(addItemSpy).toHaveBeenCalled();
  });
});

