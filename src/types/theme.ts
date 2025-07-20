export type ThemeProviderProps = {
  children: React.ReactNode
}

export type ThemeProviderState = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}