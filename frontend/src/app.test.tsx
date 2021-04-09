import '@testing-library/jest-dom';
import { shallow } from 'enzyme'
import App from './App';


describe('Test on <App />', () => {
  const wrapper = shallow(<App />)
  
  test('Should render component', () => {
      expect(wrapper).toMatchSnapshot()
  });

});
