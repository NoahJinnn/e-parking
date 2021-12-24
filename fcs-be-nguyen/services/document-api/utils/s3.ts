import S3 from 'aws-sdk/clients/s3'
import { v4 as uuid } from 'uuid'

import { DOCUMENT_TYPE } from '@const/index'

import { AWS_CREDENTIAL, S3_NAME } from '../env'
import { IFileUpload } from '../type'
import { getFileSuffixForContentType } from './media'

export const generateUploadLink = async (
  file: IFileUpload,
  info: {
    type: valueof<typeof DOCUMENT_TYPE>
    ownerId: string
    description: string
    documentId: string
  }
) => {
  const s3 = new S3({
    credentials: AWS_CREDENTIAL
  })
  const fileId = uuid()
  const s3Req: S3.Types.PutObjectRequest = {
    Bucket: S3_NAME,
    Key: `uploads/${info.type}/${fileId}.${getFileSuffixForContentType(file.contentType)!}`,
    ContentType: file.contentType,
    ACL: 'public-read',
    CacheControl: 'max-age=31557600', // instructs CloudFront to cache for 1 year
    // Set Metadata fields to be retrieved post-upload and stored in DynamoDB
    Metadata: {
      ...info,
      contentType: file.contentType
    }
  }
  return s3.getSignedUrlPromise('putObject', s3Req)
}
