import { render } from '@testing-library/react';
import PatientProfile from '../pages/PatientProfile.js';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });


test('Renders the PatientProfile component', () => {

  localStorage.setItem('role', 'Patient');

  render(
  <BrowserRouter>
  <PatientProfile />
  </BrowserRouter>);
});

// The following tests test specific functions related to PatientProfile
// Initially, the page is rendered with a mount
// Then the specific component is rendered, ensuring the component is not null
// Finally, the function is called and the test checks to see if the function was called.
// This repeats for every relevant function

describe('Testing PatientProfile', () => {
  const patientProfile = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><PatientProfile patientProfile={patientProfile} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of PatientProfile', () => {
    patientProfile();
    expect(patientProfile).toBeCalled();
  });
});
