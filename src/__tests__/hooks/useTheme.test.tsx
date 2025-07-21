import { ThemeProvider } from '@/components/ui/themeProvider';
import { useTheme } from '@/hooks/useTheme';
import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

// Helper wrapper để cung cấp ThemeProvider cho hook
const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useTheme hook', () => {
  beforeEach(() => {
    // Mock localStorage trước mỗi test
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

    // Reset mocks
    jest.clearAllMocks();
  });

  test('should return theme and setTheme function', () => {
    // Arrange & Act
    const { result } = renderHook(() => useTheme(), { wrapper });

    // Assert
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('setTheme');
    expect(typeof result.current.setTheme).toBe('function');
  });

  test('should set theme to "light" by default', () => {
    // Arrange & Act
    const { result } = renderHook(() => useTheme(), { wrapper });

    // Assert
    expect(result.current.theme).toBe('light');
  });

  test('should change theme when setTheme is called', () => {
    // Arrange
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Act - thay đổi theme thành dark
    act(() => {
      result.current.setTheme('dark');
    });

    // Assert
    expect(result.current.theme).toBe('dark');
    
    // Act - thay đổi lại theme thành light
    act(() => {
      result.current.setTheme('light');
    });

    // Assert
    expect(result.current.theme).toBe('light');
  });

  test('should throw error when used outside ThemeProvider', () => {
    // Tắt console.error để test không bị log lỗi
    const originalError = console.error;
    console.error = jest.fn();
    
    // Arrange, Act & Assert - khi render không có wrapper sẽ gây lỗi
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    // Restore console.error
    console.error = originalError;
  });
});
