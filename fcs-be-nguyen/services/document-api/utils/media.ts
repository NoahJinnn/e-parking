import { IFileUpload } from '../type'

export const CONTENT_TYPE_SUFFIX_MAPPINGS = {
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'application/json': 'json'
}

export function getSupportedContentTypes (): string[] {
  return Object.keys(CONTENT_TYPE_SUFFIX_MAPPINGS)
}

export function isValidContentType (contentType: string): boolean {
  return Object.keys(CONTENT_TYPE_SUFFIX_MAPPINGS).includes(contentType)
}

export function getFileSuffixForContentType (contentType: string): string | undefined {
  return CONTENT_TYPE_SUFFIX_MAPPINGS[contentType]
}

export function isSupportedFiles (files: IFileUpload[]) {
  for (let file of files) {
    if (!isValidContentType(file.contentType)) {
      return false
    }
  }
  return true
}
