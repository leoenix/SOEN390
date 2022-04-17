import { render } from '@testing-library/react';
import HealthOfficialViewingPatient from '../pages/HealthOfficialViewingPatient';
import { BrowserRouter } from 'react-router-dom';

test('Renders the HealthOfficialViewingPatient page', () => {

  localStorage.setItem('role', 'Health Official');

  render(
    <BrowserRouter>
      <HealthOfficialViewingPatient />
    </BrowserRouter>);

});