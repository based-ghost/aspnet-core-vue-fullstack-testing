import { shallowMount } from '@vue/test-utils';
import router from '@/router';
import { RouteConfig } from 'vue-router';
import { Navbar } from '@/components';

/**
 * Component: NavBar.vue
 * Test 1: component should mount and render properly
 * Test 2: router-link anchor elements should be generated for each route defined in global $router.options.routes array
 */
describe("NavBar.vue", () => {
  const navbarParentElId = "#nav";

  const shallowMountNavbar = () => {
    return shallowMount(Navbar, {
      router
    });
  };

  it("should mount and render properly", async () => {
    const wrapper = shallowMountNavbar();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(navbarParentElId).exists()).toBe(true);
  });

  it("router-links should be rendered for each route defined in global $router.options.routes object", async () => {
    const wrapper = shallowMountNavbar();
    const { routes } = wrapper.vm.$router.options;

    routes.forEach((route: RouteConfig) => {
      expect(wrapper.find(`#${route.meta.id}`).exists()).toBe(true);
    });
  });
});
