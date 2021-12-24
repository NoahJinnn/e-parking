import { useEffect, useState } from 'react'

export interface ICustomDivElement extends HTMLDivElement {
  currentInstanceName?: string
  keyboardDOM?: any
}

/**
 * @param {any} onTargetClickHandler the handler which called when HTML target is clicked
 * @param {any} onOutsideClickHandler the handler which called when the other HTML elements is clicked
 * @param {Array} targetList the list of targets which needs to perform `onTargetClickHandler`
 * @returns {Array} the flag indicates that the target element is clicking
 */
export const useOutsideClickInit = (
  onTargetClickHandler,
  onOutsideClickHandler,
  targetList: (React.RefObject<ICustomDivElement> | React.MutableRefObject<ICustomDivElement | undefined> | null)[],
): [boolean, (isTargetClicked: boolean) => any, (e: MouseEvent) => any] => {
  const [isTargetClicked, setTargetClicked] = useState(true)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false)
    }
  }, [])
  const handleClickOutside = (e: any) => {
    const eventTarget = e.target
    for (const target of targetList) {
      if (target) {
        if (target.current && target.current.currentInstanceName === 'virtualKeyboard') {
          if (target.current.keyboardDOM.contains(eventTarget)) {
            if (onTargetClickHandler) {
              onTargetClickHandler(e)
            }
            return
          }
        } else {
          if (target.current && target.current.contains(eventTarget)) {
            setTargetClicked(true)
            if (onTargetClickHandler) {
              onTargetClickHandler(e)
            }
            return
          }
        }
      }
    }

    if (onOutsideClickHandler) {
      onOutsideClickHandler()
    }
    setTargetClicked(false)
  }
  return [isTargetClicked, setTargetClicked, handleClickOutside]
}
