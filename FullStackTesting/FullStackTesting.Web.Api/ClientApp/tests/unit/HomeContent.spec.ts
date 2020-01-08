import { shallowMount } from '@vue/test-utils';
import HomeContent from '@/components/HomeContent.vue';

/**
 * Component: HomeContent.vue
 * Test 1: component should mount and render properly
 * Test 2: mainSubTitle property is functional and renders correctly
 */
describe('HomeContent.vue', () => {
  const mainSubTitle = 'First-Test-Subtitle';

  const wrapper = shallowMount(HomeContent, {
    propsData: {
      mainSubTitle
    },
  });

  it('should mount and render properly', async () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('.home-content').exists()).toBe(true);
  });

  it('property "mainSubTitle" renders text value correctly', async () => {
    expect(wrapper.text()).toMatch(mainSubTitle);
  });
});
