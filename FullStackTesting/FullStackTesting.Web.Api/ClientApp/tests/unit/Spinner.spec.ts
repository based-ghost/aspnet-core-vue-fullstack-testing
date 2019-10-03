import { shallowMount } from '@vue/test-utils';
import Spinner from '@/components/Spinner.vue';

/**
 * Component: Spinner.vue
 * Test 1: functional components should not be a Vue instance
 * Test 2: component renders properly
 * Test 3: props.show is FALSE - component should not be visible
 * Test 4: props.show is TRUE - component should be visible
 */
describe("Spinner.vue (./components)", () => {
  it("should NOT be a Vue instance (functional component)", () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.isVueInstance()).toBe(false);
  });

  it("should render properly", () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.find("#load-spinner").exists()).toBe(true);
  });

  it("when props.show is false v-show directive is functional and display style should render none", () => {
    const wrapper = shallowMount(Spinner, {
      context: {
        props: {
          show: false
        }
      }
    });

    expect(wrapper.find("#load-spinner").isVisible()).toBe(false);
  });

  it("when props.show is true v-show directive is functional and display style should render block (visible)", () => {
    const wrapper = shallowMount(Spinner, {
      context: {
        props: {
          show: true
        }
      }
    });

    expect(wrapper.find("#load-spinner").isVisible()).toBe(true);
  });
});
