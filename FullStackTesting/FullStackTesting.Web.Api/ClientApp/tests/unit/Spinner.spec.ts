import { shallowMount } from '@vue/test-utils';
import Spinner from '@/components/Spinner.vue';

/**
 * Component: Spinner.vue
 * Test 1: functional components should not be a Vue instance
 * Test 2: component renders properly
 * Test 3: props.show is FALSE - component should not be visible
 * Test 4: props.show is TRUE - component should be visible
 */
describe("Spinner.vue", () => {
  const spinnerParentElId = "#load-spinner";

  it("should NOT be a Vue instance (functional component)", async () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.isVueInstance()).toBeFalsy();
  });

  it("should render properly", async () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.find(spinnerParentElId).exists()).toBeTruthy();
  });

  it("when props.show is false v-show directive is functional and display style should render none", async () => {
    const show = false;
    const wrapper = shallowMount(Spinner, {
      context: {
        props: {
          show
        }
      }
    });
    expect(wrapper.find(spinnerParentElId).isVisible()).toBe(show);
  });

  it("when props.show is true v-show directive is functional and display style should render block (visible)", async () => {
    const show = true;
    const wrapper = shallowMount(Spinner, {
      context: {
        props: {
          show
        }
      }
    });
    expect(wrapper.find(spinnerParentElId).isVisible()).toBe(show);
  });
});
