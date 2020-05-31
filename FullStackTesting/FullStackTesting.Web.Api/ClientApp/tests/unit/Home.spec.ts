import { shallowMount } from '@vue/test-utils';
import router from "@/router";
import { Home } from '@/views';
import { RoutesConfig } from '@/config/routes.config';

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
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper.find('h1.main-title').exists()).toBeTruthy();
  });

  it('should enter/reflect the correct route', async () => {
    const wrapper = shallowMountHome();
    expect(wrapper.vm.$router.currentRoute.name).toEqual(RoutesConfig.home.name);
  });
});
