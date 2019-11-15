import { shallowMount, createLocalVue } from '@vue/test-utils';
import { routesConfig, routerOptions } from '@/router/routes';
import Home from '@/views/Home.vue';
import VueRouter from 'vue-router';

/**
 * Component: Home.vue
 * Test 1: component should mount and render properly
 * Test 2: $router.currentRoute.name should equal the name for the Home.vue route
 */
describe('Home.vue (./views)', () => {
  const mountHome = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter(routerOptions);
    return shallowMount(Home, {
      localVue,
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
    expect(wrapper.vm.$router.currentRoute.name).toEqual(routesConfig.home.name);
  });
});
