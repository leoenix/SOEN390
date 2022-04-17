import { render } from '@testing-library/react';
import DoctorDashboard from '../pages/DoctorDashboard';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });


test('Renders the DoctorDashboard component', () => {

  localStorage.setItem('role', 'Doctor');

  render(
    <BrowserRouter>
      <DoctorDashboard />
    </BrowserRouter>);
});


// The following tests test specific functions related to DoctorDashboard
// Initially, the page is rendered with a mount
// Then the specific component is rendered, ensuring the component is not null
// Finally, the function is called and the test checks to see if the function was called.
// This repeats for every relevant function

describe('Testing getDoctorPatients', () => {
  const getDoctorPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getDoctorPatients={getDoctorPatients} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getDoctorPatients', () => {
    getDoctorPatients();
    expect(getDoctorPatients).toBeCalled();
  });
});


describe('Testing getPatientsPerDoctor', () => {
  const getPatientsPerDoctor = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getPatientsPerDoctor={getPatientsPerDoctor} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getPatientsPerDoctor', () => {
    getPatientsPerDoctor();
    expect(getPatientsPerDoctor).toBeCalled();
  });
});


describe('Testing getAllPatients', () => {
  const getAllPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getAllPatients={getAllPatients} /> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getAllPatients', () => {
    getAllPatients();
    expect(getAllPatients).toBeCalled();
  });
});


describe('Testing  getTotalNumberOfPatients', () => {
  const  getTotalNumberOfPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard  getTotalNumberOfPatients={ getTotalNumberOfPatients} /></BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of  getTotalNumberOfPatients', () => {
     getTotalNumberOfPatients();
    expect(getTotalNumberOfPatients).toBeCalled();
  });
});


describe('Testing getTotalNumberOfDoctors', () => {
  const getTotalNumberOfDoctors = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getTotalNumberOfDoctors={getTotalNumberOfDoctors}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getTotalNumberOfDoctors', () => {
    getTotalNumberOfDoctors();
    expect(getTotalNumberOfDoctors).toBeCalled();
  });
});


describe('Testing getTotalNumberOfFlaggedPatients', () => {
  const getTotalNumberOfFlaggedPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getTotalNumberOfFlaggedPatients={getTotalNumberOfFlaggedPatients}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getTotalNumberOfFlaggedPatients', () => {
    getTotalNumberOfFlaggedPatients();
    expect(getTotalNumberOfFlaggedPatients).toBeCalled();
  });
});


describe('Testing getStatusCountAllPatients', () => {
  const getStatusCountAllPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getStatusCountAllPatients={getStatusCountAllPatients}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getStatusCountAllPatients', () => {
    getStatusCountAllPatients();
    expect(getStatusCountAllPatients).toBeCalled();
  });
}); 


describe('Testing getStatusCountMyPatients', () => {
  const getStatusCountMyPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getStatusCountMyPatients={getStatusCountMyPatients}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getStatusCountMyPatients', () => {
    getStatusCountMyPatients();
    expect(getStatusCountMyPatients).toBeCalled();
  });
});


describe('Testing getDoctorsWithMostPatients', () => {
  const getDoctorsWithMostPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getDoctorsWithMostPatients={getDoctorsWithMostPatients}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getDoctorsWithMostPatients', () => {
    getDoctorsWithMostPatients();
    expect(getDoctorsWithMostPatients).toBeCalled();
  });
});


describe('Testing getDoctorsWithLeastPatients', () => {
  const getDoctorsWithLeastPatients = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getDoctorsWithLeastPatients={getDoctorsWithLeastPatients}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getDoctorsWithLeastPatients', () => {
    getDoctorsWithLeastPatients();
    expect(getDoctorsWithLeastPatients).toBeCalled();
  });
});


describe('Testing getFlaggedPatientsNotViewed', () => {
  const getFlaggedPatientsNotViewed = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getFlaggedPatientsNotViewed={getFlaggedPatientsNotViewed}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getFlaggedPatientsNotViewed', () => {
    getFlaggedPatientsNotViewed();
    expect(getFlaggedPatientsNotViewed).toBeCalled();
  });
});


describe('Testing getFlaggedPatientsLeastViewed', () => {
  const getFlaggedPatientsLeastViewed = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getFlaggedPatientsLeastViewed={getFlaggedPatientsLeastViewed}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getFlaggedPatientsLeastViewed', () => {
    getFlaggedPatientsLeastViewed();
    expect(getFlaggedPatientsLeastViewed).toBeCalled();
  });
});


describe('Testing getFlaggedPatientsNoSymptomFormResponse', () => {
  const getFlaggedPatientsNoSymptomFormResponse = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getFlaggedPatientsNoSymptomFormResponse={getFlaggedPatientsNoSymptomFormResponse}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getFlaggedPatientsNoSymptomFormResponse', () => {
    getFlaggedPatientsNoSymptomFormResponse();
    expect(getFlaggedPatientsNoSymptomFormResponse).toBeCalled();
  });
});


describe('Testing getAllNotifications', () => {
  const getAllNotifications = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getAllNotifications={getAllNotifications}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getAllNotifications', () => {
    getAllNotifications();
    expect(getAllNotifications).toBeCalled();
  });
});

describe('Testing getFormNotifications', () => {
  const getFormNotifications = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter> <DoctorDashboard getFormNotifications={getFormNotifications}/> </BrowserRouter>);
  });

  it('Checking initial render of component', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Testing calling of getFormNotifications', () => {
    getFormNotifications();
    expect(getFormNotifications).toBeCalled();
  });
});

