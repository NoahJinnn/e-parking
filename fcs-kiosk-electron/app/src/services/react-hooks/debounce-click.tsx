import { willDo } from '../util-functions/delay-action'

export const useDebounceClick = (debounceTime = 500): [(f: any) => void] => {
  let isClicked = false
  const onDebounceClick = (cb?: any) => {
    if (isClicked) {
      return
    }
    isClicked = true
    cb?.()
    willDo(() => {
      isClicked = false
    }, debounceTime)
  }
  return [onDebounceClick]
}
