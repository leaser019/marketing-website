import { ThemeProviderState } from '@/types/theme'
import { createContext } from "react"

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

export const ThemeContext = createContext<ThemeProviderState>(initialState)