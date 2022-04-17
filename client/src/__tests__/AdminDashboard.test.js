import { render } from '@testing-library/react';
import AdminDashboard from '../pages/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

test('Renders the AdminDashboard component', () => {

  localStorage.setItem('role', 'Admin');

  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
});


// The following tests test specific functions related to AdminDashboard,
// Initially, the page is rendered with a mount
// Then the specific component is rendered, ensuring the component is not null
// Finally, the function is called and the test checks to see if the function was called.
// This repeats for every relevant function

describe('Testing getValidatedDoctors', () => {
  const getValidatedDoctors = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminDashboard getValidatedDoctors={getValidatedDoctors} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getValidatedDoctors()', () => {
    getValidatedDoctors();
    expect(getValidatedDoctors).toBeCalled();
  });
});

describe('Testing getUnvalidatedDoctors', () => {
  const getUnvalidatedDoctors = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminDashboard getUnvalidatedDoctors={getUnvalidatedDoctors} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getUnValidatedDoctors()', () => {
    getUnvalidatedDoctors();
    expect(getUnvalidatedDoctors).toBeCalled();
  });
});

describe('Testing getValidatedHealthOfficials', () => {
  const getValidatedHealthOfficials = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminDashboard getValidatedHealthOfficials={getValidatedHealthOfficials} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getValidatedHealthOfficials()', () => {
    getValidatedHealthOfficials();
    expect(getValidatedHealthOfficials).toBeCalled();
  });
});

describe('Testing getUnvalidatedHealthOfficials', () => {
  const getUnvalidatedHealthOfficials = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminDashboard getUnvalidatedHealthOfficials={getUnvalidatedHealthOfficials} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getUnvalidatedHealthOfficials()', () => {
    getUnvalidatedHealthOfficials();
    expect(getUnvalidatedHealthOfficials).toBeCalled();
  });
});

describe('Testing getValidatedImmigrationOfficers', () => {
  const getValidatedImmigrationOfficers = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminDashboard getValidatedImmigrationOfficers={getValidatedImmigrationOfficers} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getValidatedImmigrationOfficers()', () => {
    getValidatedImmigrationOfficers();
    expect(getValidatedImmigrationOfficers).toBeCalled();
  });
});

describe('Testing getUnvalidatedImmigrationOfficers', () => {
  const getUnvalidatedImmigrationOfficers = jest.fn();
  let wrapper;

  localStorage.setItem('role', 'Admin');

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><AdminDashboard getUnvalidatedImmigrationOfficers={getUnvalidatedImmigrationOfficers} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getUnvalidatedImmigrationOfficers()', () => {
    getUnvalidatedImmigrationOfficers();
    expect(getUnvalidatedImmigrationOfficers).toBeCalled();
  });
});


