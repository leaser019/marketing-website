import Header from '@/components/common/Header';
import { ThemeProvider } from '@/components/ui/themeProvider';
import { act, fireEvent, render, screen } from '@testing-library/react';

// Mock các module cần thiết
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock cho useTheme hook
jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('Header component', () => {
  beforeEach(() => {
    // Reset window.scrollY trước mỗi test
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    
    // Xóa tất cả các mock
    jest.clearAllMocks();
  });

  test('should render header with logo and theme toggle', () => {
    // Arrange & Act
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Assert
    expect(screen.getByText('StarWars')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /StarWars/i })).toHaveAttribute('href', '/');
  });

  test('should have transparent background when not scrolled', () => {
    // Arrange & Act
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Assert
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
    expect(header).not.toHaveClass('bg-white/80');
    expect(header).not.toHaveClass('shadow-md');
  });

  test('should change background when scrolled', () => {
    // Arrange
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Act - simulate scroll
    act(() => {
      // Set window.scrollY to simulate scrolling
      Object.defineProperty(window, 'scrollY', { value: 20 });
      // Trigger scroll event
      fireEvent.scroll(window);
    });

    // Assert
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/80');
    expect(header).toHaveClass('shadow-md');
    expect(header).not.toHaveClass('bg-transparent');
  });

  test('should cleanup event listener on unmount', () => {
    // Arrange
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    // Act
    const { unmount } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Unmount to trigger cleanup
    unmount();

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    
    // Cleanup
    removeEventListenerSpy.mockRestore();
  });
});
