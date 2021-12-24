interface IMediaFile {
  contentType: string
  url: string
  note?: string
  active: boolean
  creation_date: number
}

interface IDocumentInfo {
  ownerId: string
  active?: boolean
  type: string
  description: string
  files?: IMediaFile[]
}

interface IDocument {
  id: string
  ownerId: string
  description: string
  active: boolean
  type: string
  files: IMediaFile[]
  creation_date: number
  updated_on: number
  deletion_date: number
}
