import { shallowMount } from '@vue/test-utils';
import VCheckbox from '@/components/VCheckbox.render';

/**
 * Component: VCheckbox.render.tsx
 * Test 1: component mounts and renders properly
 * Test 2: css properties (wrapperClass, controlClass) ared functional
 * Test 3: reflects the disabled attribute on the input element when props.disabled is passed as true
 * Test 4: component events are wired up and triggered as expected (change event should trigger custom checked event)
 * Test 5: trailing label <span> is present when props.trailingLabel is passed with a truthy string value
 */
describe('VCheckbox.render.tsx (./components)', () => {
    const mountVCheckbox = (options: any = null) => {
        return shallowMount(VCheckbox, {
          ...options
        });
    };

    it('should mount and render properly', () => {
        const wrapper = mountVCheckbox();
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    });

    it('renders CSS properties when passed (props.wrapperClass, props.controlClass)', () => {
        const className = 'is-medium';
        const wrapper = mountVCheckbox({
            propsData: {
                wrapperClass: className,
                controlClass: className
            }
        });

        expect(wrapper.classes()).toContain(className);
        expect(wrapper.find(`p.${className}`).exists()).toBe(true);
    });

    it('reflects the disabled attribute on the input element when props.disabled is passed as true', () => {
        const wrapper = mountVCheckbox({
            propsData: {
                disabled: true
            }
        });

        expect(wrapper.find('input[type="checkbox"]').html()).toMatch('disabled');
    });

    it('emits the custom @checked event with new target value when the @change event is triggered', () => {
        const wrapper = mountVCheckbox({
            propsData: {
                checked: false
            }
        });

        const inputNode = wrapper.find('input[type="checkbox"]');
        (inputNode.element as HTMLInputElement).value = 'true';
        (inputNode.element as HTMLInputElement).checked = true;
        inputNode.trigger('change');

        expect(wrapper.emitted('checked')).toBeTruthy();
        expect(wrapper.emitted('checked')[0]).toEqual([true]);
    });

    it('trailing label <span> is present when props.trailingLabel is passed with a truthy string value', () => {
        const label = 'Test Label';
        const labelSpanEl = `<span>${label}</span>`;

        const wrapper = mountVCheckbox({
            propsData: {
                trailingLabel: label
            }
        });

        expect(wrapper.html()).toMatch(labelSpanEl);
    });
});
