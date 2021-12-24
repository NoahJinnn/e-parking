export const willDo = (cb: any, time: number) => {
  const timer = setTimeout(() => {
    cb()
    clearTimer(timer)
  }, time)
}

function clearTimer(timer) {
  clearTimeout(timer)
}
