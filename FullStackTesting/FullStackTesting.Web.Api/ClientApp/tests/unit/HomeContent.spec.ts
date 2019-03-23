import { shallowMount } from '@vue/test-utils';
import HomeContent from '@/components/HomeContent.vue';

/**
 * Component: HomeContent.vue
 * Test 1: component should mount and render properly
 * Test 2: mainSubTitle property is functional
 */
describe('HomeContent.vue (./components)', () => {
  const firstSubtitle = 'First-Test-Subtitle';
  const secondSubtitle = 'Second-Test-Subtitle';

  const wrapper = shallowMount(HomeContent, {
    propsData: {
        mainSubTitle: firstSubtitle
    },
  });

  it('should mount and render properly', () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('.home-content').exists()).toBe(true);
  });

  it('renders props.mainSubTitle when initially passed & updated', () => {
    expect(wrapper.text()).toMatch(firstSubtitle);
    wrapper.setProps({ mainSubTitle: secondSubtitle });
    expect(wrapper.text()).toMatch(secondSubtitle);
  });
});
