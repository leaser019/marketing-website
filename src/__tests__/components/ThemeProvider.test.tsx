import { ThemeProvider } from '@/components/ui/themeProvider';
import { act, render, screen } from '@testing-library/react';

describe('ThemeProvider', () => {
  // Setup các mock trước mỗi test case
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Reset document.documentElement.classList
    document.documentElement.classList.remove('dark');
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  test('should render children correctly', () => {
    // Arrange & Act
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>
    );

    // Assert
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('should use default theme "light" when no saved theme', () => {
    // Arrange
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);
    
    // Act
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    // Assert
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('should use saved theme from localStorage', () => {
    // Arrange
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce('dark');
    
    // Act
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    // Assert
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
  });

  test('should use system preference when no saved theme', () => {
    // Arrange
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);
    // Mock user's system preference to dark mode
    (window.matchMedia as jest.Mock).mockImplementationOnce(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    // Act
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    // Assert
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should update localStorage when theme changes', () => {
    // Arrange
    let setThemeCallback: ((theme: 'light' | 'dark') => void) | null = null;
    
    function TestComponent() {
      // Capture the setTheme callback from the context
      const { setTheme } = require('@/hooks/useTheme').useTheme();
      setThemeCallback = setTheme;
      return <div>Test Component</div>;
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Act - change theme to dark
    act(() => {
      if (setThemeCallback) setThemeCallback('dark');
    });

    // Assert
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Act - change theme back to light
    act(() => {
      if (setThemeCallback) setThemeCallback('light');
    });

    // Assert
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
