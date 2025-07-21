# Hướng dẫn viết Test theo TDD (Test-Driven Development)

## Các bước cơ bản của TDD

1. **Red**: Viết một test case mô tả chức năng mong muốn (test này sẽ fail)
2. **Green**: Viết code đơn giản nhất để pass test case đó
3. **Refactor**: Tái cấu trúc code để làm cho nó tốt hơn mà không làm thay đổi hành vi

## Cấu trúc thư mục test

Chúng ta đã tổ chức các test theo cùng cấu trúc thư mục với source code:

```
src/
  __tests__/  # Thư mục chính chứa tất cả các test
    components/  # Test cho các components
    hooks/       # Test cho các custom hooks
    lib/         # Test cho các utility functions
    store/       # Test cho store management
    helpers/     # Các helper functions cho testing
```

## Cách chạy test

```bash
# Chạy tất cả các test
npm run test

# Chạy test với chế độ watch (tự động chạy lại khi có thay đổi)
npm run test:watch

# Chạy test và hiển thị coverage report
npm run test:coverage

# Chạy một file test cụ thể
npm test -- path/to/test-file.test.ts

# Chạy test có tên phù hợp với pattern
npm test -- -t "tên của test"
```

## Best practices khi viết test

1. **Đặt tên test rõ ràng**: Tên test nên mô tả đúng những gì test đang kiểm tra
   ```typescript
   test('should show error message when fetch fails', async () => {
     // ...
   });
   ```

2. **Sử dụng pattern AAA (Arrange-Act-Assert)**:
   - **Arrange**: Chuẩn bị dữ liệu, mock các dependencies
   - **Act**: Thực hiện hành động cần test
   - **Assert**: Kiểm tra kết quả

3. **Mỗi test chỉ test một chức năng**: Mỗi test nên tập trung vào một chức năng cụ thể

4. **Sử dụng các testing utilities đã được cung cấp**:
   - `renderWithProviders`: Để render component với đầy đủ context providers
   - Test DOM với `@testing-library/react`
   - Test user interactions với `@testing-library/user-event`

5. **Mock các external dependencies**:
   - GraphQL queries với `MockedProvider`
   - `localStorage`, `window` APIs, và các browser APIs khác

## Ví dụ về một test case tốt

```typescript
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../helpers/test-utils';
import Component from '@/components/MyComponent';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  test('should show loading state initially then display data', async () => {
    // Arrange - chuẩn bị mock data và render component
    renderWithProviders(<Component />);

    // Assert - kiểm tra loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Assert - đợi và kiểm tra kết quả sau khi loading
    await waitFor(() => {
      expect(screen.getByText('Expected data')).toBeInTheDocument();
    });
  });

  test('should handle user interaction correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    renderWithProviders(<Component />);

    // Act - thực hiện user interaction
    await user.click(screen.getByRole('button', { name: /click me/i }));

    // Assert - kiểm tra kết quả sau interaction
    expect(screen.getByText('Button was clicked')).toBeInTheDocument();
  });
});
```

## Các mẫu test đã được triển khai

1. **Utility functions**: Test cho `utils.ts`
2. **Custom hooks**: Test cho `useTheme` hook
3. **Components**: Test cho `Header` và `ThemeProvider`
4. **Data fetching**: Test cho `FilmsList` với GraphQL queries

## Thêm test cases mới

Khi thêm tính năng mới vào dự án, hãy nhớ làm theo quy trình TDD:

1. Viết test case mô tả hành vi mong muốn
2. Chạy test và xác nhận rằng nó fail
3. Triển khai code để pass test
4. Refactor nếu cần thiết
