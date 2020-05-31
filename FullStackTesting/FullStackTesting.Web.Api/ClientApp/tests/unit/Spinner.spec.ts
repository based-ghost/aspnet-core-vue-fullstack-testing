import { shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils';
import Spinner from '@/components/Spinner.vue';
import '@testing-library/jest-dom';

/**
 * Component: Spinner.vue
 * Test 1: functional component is instantiated correctly
 * Test 2: component renders properly with element having id attribute with value of 'load-spinner'
 * Test 3: props.show is FALSE - component should not be visible
 * Test 4: props.show is TRUE - component should be visible
 */
describe("Spinner.vue", () => {
  const spinnerParentElId = "#load-spinner";

  const shallowMountSpinner = (
    options?: ThisTypedShallowMountOptions<Spinner>
  ) => {
    return shallowMount(Spinner, {
      ...options
    });
  };

  it("is instantiated correctly", async () => {
    const wrapper = shallowMountSpinner();
    expect(wrapper).toBeTruthy();
  });

  it("should render properly", async () => {
    const wrapper = shallowMountSpinner();
    expect(wrapper.find(spinnerParentElId).exists()).toBeTruthy();
  });

  it("when props.show is false v-show directive is functional and display style should render none", async () => {
    const wrapper = shallowMountSpinner({
      context: {
        props: {
          show: false
        }
      }
    });

    const spinnerParentEl = wrapper.find(spinnerParentElId).element;
    expect(spinnerParentEl).not.toBeVisible();
  });

  it("when props.show is true v-show directive is functional and display style should render block (visible)", async () => {
    const wrapper = shallowMountSpinner({
      context: {
        props: {
          show: true
        }
      }
    });

    const spinnerParentEl = wrapper.find(spinnerParentElId).element;
    expect(spinnerParentEl).toBeVisible();
  });
});
