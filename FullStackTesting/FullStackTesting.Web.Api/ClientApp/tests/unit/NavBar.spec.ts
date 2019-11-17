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
describe("NavBar.vue", () => {
  const navbarParentElId = "#nav";

  const shallowMountNavbar = () => {
    return shallowMount(Navbar, {
      router
    });
  };

  it("should mount and render properly", async () => {
    const wrapper = shallowMountNavbar();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.find(navbarParentElId).exists()).toBeTruthy();
  });

  it("router-links should be rendered for each route defined in global RoutesConfig object", async () => {
    const wrapper = shallowMountNavbar();
    const routerLinkIds = getObjectValues(RoutesConfig, "meta.id");
    routerLinkIds.forEach((anchorId) => {
      expect(wrapper.find(`#${anchorId}`).exists()).toBeTruthy();
    });
  });
});
