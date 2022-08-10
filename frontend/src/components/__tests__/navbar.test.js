import { render, screen,cleanup } from '@testing-library/react';
import NavBar from '../NavBar';



test('navbar logo text test', () => {
    render(<NavBar/>);
    const navElement = screen.getByTestId('logo-text');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveTextContent('SURGE ASSIGNMENT');
  });

  test('navbar login button', () => {
    render(<NavBar/>);
    const navElement = screen.getByTestId('login-btn');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveTextContent('Login');
  });