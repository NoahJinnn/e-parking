/**
 * Split array into sub arrays with given length
 * @param arr Array need to be splitted
 * @param subLength Length of sub array after splitted
 */
export const toSubArrays = (arr: any[], subLength: number = 100): any[] => {
  let chunks = []
  let i = 0
  let n = arr.length
  while (i < n) {
    chunks.push(arr.slice(i, (i += subLength)))
  }
  return chunks
}
