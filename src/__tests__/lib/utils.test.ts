import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    // Arrange - chuẩn bị test data
    const classes1 = 'text-red-500 bg-blue-300';
    const classes2 = 'p-4 m-2';
    const classes3 = ['flex', 'items-center'];
    const conditionalClass = true && 'font-bold';
    const falseConditional = false && 'invisible';

    // Act - thực thi hàm cần test
    const result = cn(classes1, classes2, classes3, conditionalClass, falseConditional);

    // Assert - kiểm tra kết quả
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-300');
    expect(result).toContain('p-4');
    expect(result).toContain('m-2');
    expect(result).toContain('flex');
    expect(result).toContain('items-center');
    expect(result).toContain('font-bold');
    expect(result).not.toContain('invisible');
    expect(result).not.toContain('false');
  });

  test('should handle conditional classes correctly', () => {
    // Arrange
    const baseClasses = 'btn';
    const isActive = true;
    const isDisabled = false;

    // Act
    const result = cn(
      baseClasses,
      isActive && 'btn-active',
      isDisabled && 'btn-disabled'
    );

    // Assert
    expect(result).toContain('btn');
    expect(result).toContain('btn-active');
    expect(result).not.toContain('btn-disabled');
  });

  test('should properly handle conflicts with tailwind classes', () => {
    // Arrange - các class xung đột nhau (cùng một thuộc tính)
    const classes = cn('p-2', 'p-4', 'p-6');

    // Assert - class được định nghĩa sau sẽ được ưu tiên
    expect(classes).not.toContain('p-2');
    expect(classes).not.toContain('p-4');
    expect(classes).toContain('p-6');
  });
});
