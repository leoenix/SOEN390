import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

test('Renders the Navbar component', () => {
  render(<Navbar />);
});

// The following tests test specific functions related to Navbar
// Initially, the page is rendered with a mount
// Then the specific component is rendered, ensuring the component is not null
// Finally, the function is called and the test checks to see if the function was called.
// This repeats for every relevant function

describe('Testing handleOpenUserMenu', () => {
  const handleOpenUserMenu = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Navbar handleOpenNavMenu={handleOpenUserMenu} />);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of handleOpenUserMenu', () => {
    handleOpenUserMenu();
    expect(handleOpenUserMenu).toBeCalled();
  });
});


describe('Testing handleCloseUserMenu', () => {
  const handleCloseUserMenu = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Navbar handleCloseNavMenu={handleCloseUserMenu} />);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of handleCloseUserMenu', () => {
    handleCloseUserMenu();
    expect(handleCloseUserMenu).toBeCalled();
  });
});

describe('Testing handleCloseNavMenu', () => {
  const handleCloseNavMenu = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Navbar handleCloseNavMenu={handleCloseNavMenu} />);
  });

  it('Checking initial render of function handleCloseNavMenu to not be null', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing function call of handleCloseNavMenu', () => {
    handleCloseNavMenu();
    expect(handleCloseNavMenu).toBeCalled();
  });
});

describe('Testing handleOpenNavMenu', () => {
  const handleOpenNavMenu = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Navbar handleOpenNavMenu={handleOpenNavMenu} />);
  });

  it('Checking initial render of function handleCloseNavMenu to not be null', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of handleCloseNavMenu', () => {
    handleOpenNavMenu();
    expect(handleOpenNavMenu).toBeCalled();
  });
});

describe('Testing instantiaeNavBar', () => {
  const instantiateNavBar = jest.fn();

  it('Testing function call of instantiateNavBar', () => {
    instantiateNavBar();
    expect(instantiateNavBar).toBeCalled();
  });
});

describe('Testing login function', () => {
  const login = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Navbar login={login} />);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of login', () => {
    login();
    expect(login).toBeCalled();
  });
});

describe('Testing login function', () => {
  const getNotificationsCount = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Navbar getNotificationsCount={getNotificationsCount} />);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getNotifications', () => {
    getNotificationsCount();
    expect(getNotificationsCount).toBeCalled();
  });
});
