import { shallowMount, createLocalVue } from '@vue/test-utils';
import { getObjectValues } from '@/utils/helper';
import { routesConfig } from '@/router/routes';
import NavBar from '@/components/NavBar.vue';
import VueRouter from 'vue-router';

/**
 * Component: NavBar.vue
 * Test 1: component should mount and render properly
 * Test 2: router-link anchor elements should be generated for each route defined in global routesConfig object
 */
describe('NavBar.vue (./components)', () => {
    const mountNavBar = () => {
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        return shallowMount(NavBar, {
          localVue
        });
      };

    it('should mount and render properly', () => {
        const wrapper = mountNavBar();
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper.find('#nav').exists()).toBe(true);
    });

    it('router-links should be rendered for each route defined in global routesConfig object', () => {
        const wrapper = mountNavBar();
        const routerLinkIds = getObjectValues(routesConfig, 'meta.id');

        routerLinkIds.forEach((anchorId) => {
            expect(wrapper.find(`#${anchorId}`).exists()).toBe(true);
        });
    });
});
