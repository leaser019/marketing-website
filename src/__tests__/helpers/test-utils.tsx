import { ThemeProvider } from '@/components/ui/themeProvider';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

// Tạo interface mở rộng RenderOptions để thêm các options cho Apollo
interface CustomRenderOptions extends RenderOptions {
  mocks?: MockedResponse[];
  addTypename?: boolean;
}

// Wrapper tổng hợp cung cấp tất cả các context cần thiết cho tests
const AllProviders = ({
  children,
  mocks = [],
  addTypename = false,
}: {
  children: ReactNode;
  mocks?: MockedResponse[];
  addTypename?: boolean;
}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      <ThemeProvider>{children}</ThemeProvider>
    </MockedProvider>
  );
};

// Hàm custom render sẽ thay thế hàm render mặc định của testing-library
export const renderWithProviders = (
  ui: ReactElement,
  { mocks = [], addTypename = false, ...renderOptions }: CustomRenderOptions = {}
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders mocks={mocks} addTypename={addTypename}>
        {children}
      </AllProviders>
    ),
    ...renderOptions,
  });
};

// Re-export mọi thứ từ testing-library
export * from '@testing-library/react';
