import { shallowMount, createLocalVue } from '@vue/test-utils';
import { dropdownTestData } from '@/config/constants';
import VDropdown from '@/components/VDropdown.render';
import vClickOutside from '@/plugins/vue-click-outside';

/**
 * Component: VDropdown.render.tsx
 * Test 1: component mounts and renders properly
 * Test 2: custom ref attributes exist on component (dropdownButton, dropdownMenu)
 * Test 3: css properties (wrapperClass, buttonClass) ared functional
 * Test 4: options array type detection is functional (is the array of options of singleton (e.g. 1) or object (e.g. { value: 1, label: 'Option 1' }))
 * Test 5: onClick and onKeydown events on button control correctly toggle $data.open; if $data.open === true, the options menu should be visible in DOM
 */
describe("VDropdown.render.tsx (./components)", () => {
  const mountVDropdown = (options: any = null) => {
    const localVue = createLocalVue();
    localVue.use(vClickOutside);
    return shallowMount(VDropdown, {
      localVue,
      ...options
    });
  };

  it("should mount and render properly", () => {
    const wrapper = mountVDropdown({
      propsData: {
        options: dropdownTestData
      }
    });

    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.find(".dropdown").exists()).toBe(true);
  });

  it("custom ref attributes exist and are functional on component (dropdownButton, dropdownMenu)", () => {
    const wrapper = mountVDropdown({
      propsData: {
        options: dropdownTestData
      }
    });

    expect(wrapper.find({ ref: "dropdownButton" }).exists()).toBe(true);
    expect(wrapper.find({ ref: "dropdownMenu" }).exists()).toBe(true);
  });

  it("renders CSS properties when passed (props.wrapperClass, props.buttonClass)", () => {
    const className = "is-medium";
    const wrapper = mountVDropdown({
      propsData: {
        options: dropdownTestData,
        wrapperClass: className,
        buttonClass: className
      }
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.find(`button.${className}`).exists()).toBe(true);
  });

  it("detects if individual options are singleton or object, and detects changes to the options property", () => {
    const wrapper = mountVDropdown({
      propsData: {
        options: dropdownTestData
      }
    });

    // Standard test data should return true since each option is of type { value: 1, label: 'Option 1' }
    expect(wrapper.vm.isArrayOfObjects).toEqual(true);

    // Update options to be array of strings, so each option is of type 'test string' (check should then return false)
    wrapper.setProps({ options: ["string", "array"] });
    expect(wrapper.vm.isArrayOfObjects).toEqual(false);
  });

  it("onClick and onKeydown events on button control correctly toggle $data.open; if $data.open === true, the options menu should be visible in DOM", () => {
    const wrapper = mountVDropdown({
      propsData: {
        options: dropdownTestData
      }
    });

    wrapper.setData({ open: false });

    // When $data.open === true, the component adds 'is-active' class to root component element
    const isActiveClass = "is-active";
    const buttonNode = wrapper.find({ ref: "dropdownButton" });

    // $data.open should default to false (menu not visible)
    expect(wrapper.vm.open).toEqual(false);
    expect(wrapper.classes(isActiveClass)).toBe(false);

    // Simulate click event on dropdown button control
    buttonNode.trigger("click");

    // $data.open should reflect true after initial toggle and menu should then be visible
    expect(wrapper.vm.open).toEqual(true);
    expect(wrapper.classes()).toContain(isActiveClass);

    // Simulate onKeyDown event on dropdown button control (keyCode === 38 (up))
    buttonNode.trigger("keydown.up");

    // $data.open should get toggled and revert back to false
    expect(wrapper.vm.open).toEqual(false);
    expect(wrapper.classes(isActiveClass)).toBe(false);
  });
});
