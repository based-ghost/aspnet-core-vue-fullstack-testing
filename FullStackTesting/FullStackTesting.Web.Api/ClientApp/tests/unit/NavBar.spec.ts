import { shallowMount } from '@vue/test-utils';
import router from "@/router";
import Navbar from '@/components/NavBar.vue';
import { getObjectValues } from '@/utils';
import { RoutesConfig } from '@/config/routes.config';

/**
 * Component: NavBar.vue
 * Test 1: component should mount and render properly
 * Test 2: router-link anchor elements should be generated for each route defined in global routesConfig object
 */
describe("NavBar.vue (./components)", () => {
  const mountNavBar = () => {
    return shallowMount(Navbar, {
      router
    });
  };

  it("should mount and render properly", () => {
    const wrapper = mountNavBar();
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find("#nav").exists()).toBe(true);
  });

  it("router-links should be rendered for each route defined in global RoutesConfig object", () => {
    const wrapper = mountNavBar();
    const routerLinkIds = getObjectValues(RoutesConfig, "meta.id");

    routerLinkIds.forEach((anchorId) => {
      expect(wrapper.find(`#${anchorId}`).exists()).toBe(true);
    });
  });
});
