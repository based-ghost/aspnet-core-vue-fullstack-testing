import { shallowMount } from '@vue/test-utils';
import router from "@/router";
import { Home } from '@/views';

/**
 * Component: Home.vue
 * Test 1: component should mount and render properly
 * Test 2: $router.currentRoute.name should equal the name for the Home.vue route
 */
describe('Home.vue', () => {
  const shallowMountHome = () => {
    return shallowMount(Home, {
      router
    });
  };

  it('should mount and render properly', async () => {
    const wrapper = shallowMountHome();

    expect(wrapper).toBeTruthy();
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('h1.main-title').exists()).toBe(true);
  });

  it('should enter/reflect the correct route', async () => {
    const wrapper = shallowMountHome();
    const currentRouteName = wrapper.vm.$router.currentRoute.name;
    const homeRouteName = wrapper.vm.$router.options.routes[0].name;

    expect(currentRouteName).toEqual(homeRouteName);
  });
});
