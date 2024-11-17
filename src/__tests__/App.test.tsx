// src/__tests__/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders main heading', async () => {
    render(<App />);
    const headingElement = await screen.findByText(/Kapkac Mini App/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders menu tabs', () => {
    render(<App />);
    const earnTab = screen.getByText(/Earn/i);
    const gameTab = screen.getByText(/Game/i);
    const leaderboardTab = screen.getByText(/Leaderboard/i);
    expect(earnTab).toBeInTheDocument();
    expect(gameTab).toBeInTheDocument();
    expect(leaderboardTab).toBeInTheDocument();
  });

  // TODO: Add more tests for interactions and component behaviors
});
