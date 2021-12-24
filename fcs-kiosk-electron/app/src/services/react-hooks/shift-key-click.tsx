import { useState } from 'react'

export const useShiftKeyClick = (): [string, any] => {
  const [keyboardLayoutName, setKeyboardLayoutName] = useState('default')
  const setNewLayout = (currentLayout: string) => {
    const newLayout = currentLayout === 'default' ? 'shift' : 'default'
    setKeyboardLayoutName(newLayout)
  }
  return [keyboardLayoutName, setNewLayout]
}
