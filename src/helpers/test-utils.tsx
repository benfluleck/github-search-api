import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const AllTheProviders = ({ children }) => {
  return <Router>{children}</Router>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
