import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

// Add global Request object
global.Request = class Request {
  url: string;
  method: string;
  body: any;
  headers: Headers;

  constructor(url: string, init?: RequestInit) {
    this.url = url;
    this.method = init?.method || 'GET';
    this.body = init?.body;
    this.headers = new Headers(init?.headers);
  }

  async json() {
    return JSON.parse(this.body);
  }
} as any;

// Mock Next.js components and utilities
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url) => ({
    url,
    method: 'GET',
    headers: new Headers(),
    json: jest.fn(),
  })),
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      status: init?.status || 200,
      body,
      headers: new Headers(),
      json: async () => body,
    })),
  },
}));

// Add a dummy test to avoid the "no test" warning
describe('Test Setup', () => {
  it('should have global fetch mock', () => {
    expect(global.fetch).toBeDefined();
  });
});

// Reset mocks before each test
beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
}); 