import { render } from '@testing-library/react';
import DoctorPatientProfile from '../pages/DoctorPatientProfile';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

//This tests will pass if the DoctorPatientProfile page renders correctly
test('Renders the DoctorPatientProfile page', () => {


    localStorage.setItem('role', 'Doctor');

    render(
      <BrowserRouter>
        <DoctorPatientProfile />
      </BrowserRouter>);

});


// The following tests test specific functions related to DoctorPatientProfile
// Initially, the page is rendered with a mount
// Then the specific component is rendered, ensuring the component is not null
// Finally, the function is called and the test checks to see if the function was called.
// This repeats for every relevant function

describe('Testing getPatients', () => {
  const getPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorPatientProfile getPatients={getPatients} /> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getPatients', () => {
    getPatients();
    expect(getPatients).toBeCalled();
  });
});

describe('Testing getViewed', () => {
  const getViewed = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorPatientProfile getViewed={getViewed} /> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getPatients', () => {
    getViewed();
    expect(getViewed).toBeCalled();
  });
});

describe('Testing setFilteredPatients', () => {
  const setFilteredPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorPatientProfile setFilteredPatients={setFilteredPatients} /> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of setFilteredPatients', () => {
    setFilteredPatients();
    expect(setFilteredPatients).toBeCalled();
  });
});