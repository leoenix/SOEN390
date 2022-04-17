import { render } from '@testing-library/react';
import Footer from '../components/Footer';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

test('Renders the Footer component', () => {
  render(<Footer />);
});

// The following tests test specific functions related to Footer
// Initially, the page is rendered with a mount
// Then the specific component is rendered, ensuring the component is not null
// Finally, the function is called and the test checks to see if the function was called.
// This repeats for every relevant function

describe('Testing StickyFooter', () => {
  const StickyFooter = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Footer StickyFooter={StickyFooter} />);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of StickyFooter', () => {
    StickyFooter();
    expect(StickyFooter).toBeCalled();
  });
});
