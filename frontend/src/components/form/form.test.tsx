import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Form from './Form';

describe('Test on <Form />', () => {
  const wrapper = shallow(<Form />);

  test('Should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('Should input change', () => {
    const value = 'Value';
    const input = wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value } });

    expect(input.prop('value')).toBe(value);
  });

  test('Should send data', () => {});
});
