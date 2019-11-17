import { shallowMount } from '@vue/test-utils';
import HomeContent from '@/components/HomeContent.vue';

/**
 * Component: HomeContent.vue
 * Test 1: component should mount and render properly
 * Test 2: mainSubTitle property is functional
 */
describe('HomeContent.vue', () => {
  const subtitle1 = 'First-Test-Subtitle';
  const subtitle2 = 'Second-Test-Subtitle';

  const wrapper = shallowMount(HomeContent, {
    propsData: {
      mainSubTitle: subtitle1
    },
  });

  it('should mount and render properly', async () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('.home-content').exists()).toBe(true);
  });

  it('renders props.mainSubTitle when initially passed & updated', async () => {
    expect(wrapper.text()).toMatch(subtitle1);
    wrapper.setProps({ mainSubTitle: subtitle2 });
    expect(wrapper.text()).toMatch(subtitle2);
  });
});
