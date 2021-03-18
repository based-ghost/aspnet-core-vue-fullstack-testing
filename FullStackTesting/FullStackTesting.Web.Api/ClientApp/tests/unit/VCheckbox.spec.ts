import { shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { VCheckbox } from '@/components';

/**
 * Component: VCheckbox.render.tsx
 * Test 1: component mounts and renders properly
 * Test 2: css properties (wrapperClass, controlClass) ared functional
 * Test 3: reflects the disabled attribute on the input element when props.disabled is passed as true
 * Test 4: component events are wired up and triggered as expected (change event should trigger custom checked event)
 * Test 5: trailing label <span> is present when props.trailingLabel is passed with a truthy string value
 */
describe("VCheckbox.render.tsx", () => {
  const inputElQuery = 'input[type="checkbox"]';

  const shallowMountVCheckbox = (
    options?: ThisTypedShallowMountOptions<VCheckbox>
  ) => {
    return shallowMount(VCheckbox, {
      ...options,
    });
  };

  it("should mount and render properly", async () => {
    const wrapper = shallowMountVCheckbox();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find(inputElQuery).exists()).toBe(true);
  });

  it("renders CSS properties when passed (props.wrapperClass, props.controlClass)", async () => {
    const className = "is-medium";
    const wrapper = shallowMountVCheckbox({
      propsData: {
        wrapperClass: className,
        controlClass: className
      }
    });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.find(`p.${className}`).exists()).toBe(true);
  });

  it("'disabled' attribute is rendered on input element when the 'disabled' prop is defined", async () => {
    const wrapper = shallowMountVCheckbox({
      propsData: {
        disabled: true
      }
    });

    const inputEl = wrapper.find(inputElQuery).element;
    expect(inputEl.hasAttribute('disabled')).toBe(true);
  });

  it("emits the custom @checked event with new target value when the @change event is triggered", async () => {
    const wrapper = shallowMountVCheckbox({
      propsData: {
        checked: false
      }
    });

    const inputNode = wrapper.find(inputElQuery);
    const inputEl = inputNode.element as HTMLInputElement;

    inputEl.checked = true;
    inputEl.value = inputEl.checked.toString();

    await inputNode.trigger("change");

    expect(wrapper.emitted().checked).toBeTruthy();
  });

  it("trailing label <span> is present when props.trailingLabel is passed with a truthy string value", async () => {
    const trailingLabel = "Test Label";
    const labelSpanEl = `<span>${trailingLabel}</span>`;

    const wrapper = shallowMountVCheckbox({
      propsData: {
        trailingLabel
      }
    });

    expect(wrapper.html()).toMatch(labelSpanEl);
  });
});
