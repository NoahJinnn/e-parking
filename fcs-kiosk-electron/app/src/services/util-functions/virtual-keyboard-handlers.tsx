export const onKeyPressHandler = (button: string, currentInput = '', onEnter, onCapslock, onDown): string => {
  if (button === '{enter}') {
    onEnter()
    return currentInput
  }

  if (button === '{shift}' || button === '{lock}') {
    onCapslock()
    return currentInput
  }

  if (button === '{tab}' || button === '{space}') {
    return currentInput + ' '
  }

  if (button.trim() === '\u21b5') {
    return currentInput.slice(0, currentInput.length - 1)
  }

  if (button.trim() === '\u21b4') {
    onDown()
    return currentInput
  }

  return currentInput + button
}
