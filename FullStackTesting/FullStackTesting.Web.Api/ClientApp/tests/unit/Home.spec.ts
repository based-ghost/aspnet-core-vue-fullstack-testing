import { shallowMount } from '@vue/test-utils';
import router from "@/router";
import { Home } from '@/views';
import { RoutesConfig } from '@/config/routes.config';

/**
 * Component: Home.vue
 * Test 1: component should mount and render properly
 * Test 2: $router.currentRoute.name should equal the name for the Home.vue route
 */
describe('Home.vue (./views)', () => {
  const mountHome = () => {
    return shallowMount(Home, {
      router
    });
  };

  it('should mount and render properly', () => {
    const wrapper = mountHome();
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('h1.main-title').exists()).toBe(true);
  });

  it('should enter/reflect the correct route', () => {
    const wrapper = mountHome();
    expect(wrapper.vm.$router.currentRoute.name).toEqual(RoutesConfig.home.name);
  });
});
