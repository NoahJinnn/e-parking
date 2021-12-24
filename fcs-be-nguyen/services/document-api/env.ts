import { Credentials } from 'aws-sdk'

export const MEDIA_BUCKET_NAME = `${process.env.MEDIA_BUCKET_NAME || 'mediabucket'}`
export const DOCUMENT_TABLE_NAME = process.env.DOCUMENT_TABLE_NAME
export const END_POINT = process.env.S3_STORAGE_ENDPOINT || ''
export const S3_NAME = process.env.S3_STORAGE_NAME || ''
export const MAX_LENGTH_ARRAY_IN_RES = 10

export const AWS_CREDENTIAL = new Credentials({
  accessKeyId: process.env.AWS_CREDENTIAL_KEY!,
  secretAccessKey: process.env.AWS_CREDENTIAL_SECRET!
})
