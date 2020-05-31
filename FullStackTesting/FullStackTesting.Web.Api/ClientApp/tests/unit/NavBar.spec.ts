import { shallowMount } from '@vue/test-utils';
import router from "@/router";
import Navbar from '@/components/NavBar.vue';
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
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(navbarParentElId).exists()).toBeTruthy();
  });

  it("router-links should be rendered for each route defined in global RoutesConfig object", async () => {
    const wrapper = shallowMountNavbar();
    const routerLinkIds: string[] = Object.keys(RoutesConfig).map((key: string) => RoutesConfig[key].meta.id);

    routerLinkIds.forEach((anchorId: string) => {
      expect(wrapper.find(`#${anchorId}`).exists()).toBeTruthy();
    });
  });
});
