// jest.setup.js
import '@testing-library/jest-dom';
// =================================================================
// Tăng thời gian chờ mặc định cho các test case
// =================================================================
// Đôi khi test liên quan đến API hoặc thao tác DOM phức tạp cần nhiều thời gian hơn 5 giây mặc định.
// Tăng lên 15 giây cho chắc cú.
// Joke: "Chạy test mà timeout hoài chắc do mạng VNPT chứ không phải do code mình đâu!"
jest.setTimeout(15000);

// =================================================================
// Polyfills & Mocks cho môi trường JSDOM
// =================================================================
// Môi trường test của Jest (JSDOM) không có tất cả các API của trình duyệt thật.
// Chúng ta cần "giả lập" (mock) một vài thứ để code không bị lỗi.

// --- Mocking window.matchMedia ---
// Cực kỳ hữu ích cho các thư viện UI như Ant Design, Material-UI...
// Chúng nó hay dùng cái này để làm responsive.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// --- Mocking IntersectionObserver ---
// Dùng cho các component lazy-loading hoặc animation khi cuộn trang.
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;


// --- Mocking window.scrollTo ---
// Nếu component của cậu có chức năng scroll lên đầu trang chẳng hạn.
window.scrollTo = jest.fn();

// --- Mocking localStorage & sessionStorage ---
// Nếu cậu cần test logic liên quan đến web storage.
const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
};

Object.defineProperty(window, 'localStorage', { value: createStorageMock() });
Object.defineProperty(window, 'sessionStorage', { value: createStorageMock() });


// =================================================================
// Thiết lập các hành động trước và sau mỗi test case
// =================================================================
// Dọn dẹp sau mỗi lần test để đảm bảo các test không ảnh hưởng lẫn nhau.
// "Ở dơ là không có bồ, test dơ là không có code sạch!"
afterEach(() => {
  // Dọn dẹp tất cả các mock để đảm bảo test sau chạy độc lập.
  jest.clearAllMocks();
});