import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AskSensei } from '../components/AskSensei';
import { mockSenseiResponse, mockErrorResponse } from './utils';

// Mock fetch globally
global.fetch = jest.fn();

describe('AskSensei Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders input and submit button', () => {
    render(<AskSensei />);
    
    expect(screen.getByPlaceholderText(/ask about yield opportunities/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ask/i })).toBeInTheDocument();
  });

  it('handles successful query submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSenseiResponse
    });

    render(<AskSensei />);
    
    const input = screen.getByPlaceholderText(/ask about yield opportunities/i);
    const button = screen.getByRole('button', { name: /ask/i });

    fireEvent.change(input, { target: { value: 'Where should I stake 1000 USDC?' } });
    fireEvent.click(button);

    // Check loading state
    expect(screen.getByText(/thinking/i)).toBeInTheDocument();

    // Wait for response
    await waitFor(() => {
      expect(screen.getByText(/analysis/i)).toBeInTheDocument();
    });

    // Verify response content
    expect(screen.getByText(/recommendation/i)).toBeInTheDocument();
    expect(screen.getByText(/yield details/i)).toBeInTheDocument();
    expect(screen.getByText(/gas details/i)).toBeInTheDocument();
    expect(screen.getByText(/risk assessment/i)).toBeInTheDocument();

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith('/api/sensei', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'Where should I stake 1000 USDC?' })
    });
  });

  it('handles API error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse
    });

    render(<AskSensei />);
    
    const input = screen.getByPlaceholderText(/ask about yield opportunities/i);
    const button = screen.getByRole('button', { name: /ask/i });

    fireEvent.change(input, { target: { value: 'Invalid query' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/failed to get response/i)).toBeInTheDocument();
    });
  });

  it('handles network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<AskSensei />);
    
    const input = screen.getByPlaceholderText(/ask about yield opportunities/i);
    const button = screen.getByRole('button', { name: /ask/i });

    fireEvent.change(input, { target: { value: 'Test query' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('prevents empty query submission', () => {
    render(<AskSensei />);
    
    const button = screen.getByRole('button', { name: /ask/i });
    fireEvent.click(button);

    // Verify no API call was made
    expect(global.fetch).not.toHaveBeenCalled();
  });
}); 