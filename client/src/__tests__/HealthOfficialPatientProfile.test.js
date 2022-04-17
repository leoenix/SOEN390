import { render } from '@testing-library/react';
import HealthOfficialPatientProfile from '../pages/HealthOfficialPatientProfile';
import { BrowserRouter } from 'react-router-dom';

test('Renders the HealthOfficialPatientProfile page', () => {

  localStorage.setItem('role', 'HealthOfficial');

    render(
    <BrowserRouter>
    <HealthOfficialPatientProfile />
    </BrowserRouter>);
  });

  // describe('Testing getPatients', () => {
  //   const getPatients = jest.fn();
  //   let wrapper;
  
  //   beforeEach(() => {
  //     wrapper = mount(<BrowserRouter> <HealthOfficialPatientProfile getPatients={getPatients} /> </BrowserRouter>);
  //   });
  
  //   it('Checking initial render of component', () => {
  //     expect(wrapper).not.toBeNull();
  //   });
  
  //   it('Testing calling of getPatients', () => {
  //     getPatients();
  //     expect(getPatients).toBeCalled();
  //   });
  // });
  
  // describe('Testing getViewed', () => {
  //   const getViewed = jest.fn();
  //   let wrapper;
  
  //   beforeEach(() => {
  //     wrapper = mount(<BrowserRouter> <HealthOfficialPatientProfile getViewed={getViewed} /> </BrowserRouter>);
  //   });
  
  //   it('Checking initial render of component', () => {
  //     expect(wrapper).not.toBeNull();
  //   });
  
  //   it('Testing calling of getPatients', () => {
  //     getViewed();
  //     expect(getViewed).toBeCalled();
  //   });
  // });