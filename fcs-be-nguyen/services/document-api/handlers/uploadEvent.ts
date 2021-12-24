import { S3Event } from 'aws-lambda'
import S3 from 'aws-sdk/clients/s3'
import moment from 'moment'

import { END_POINT } from '../env'
import { addFilesToDocument } from '../lib/repositories/updateDocument.respotitory'

const s3 = new S3()

export const handler = async (event: S3Event): Promise<void> => {
  const s3Record = event.Records[0].s3

  // First fetch metadata from S3
  const s3Object = await s3.headObject({ Bucket: s3Record.bucket.name, Key: s3Record.object.key }).promise()
  if (!s3Object.Metadata) {
    // File dont have metadata => reject
    const errorMessage = 'Cannot process file as no metadata is set for it'
    throw new Error(errorMessage)
  }
  // S3 metadata field names are converted to lowercase, so need to map them out carefully
  const mediaDetails: IMediaFile = {
    note: s3Object.Metadata.description || '',
    contentType: s3Object.Metadata.contenttype,
    active: true,
    creation_date: moment().unix(),
    // Map the S3 bucket key to a CloudFront URL to be stored in the DB
    url: `${END_POINT}/${s3Record.object.key}`
  }
  // Now write to DDB
  await addFilesToDocument(s3Object.Metadata.documentid, [mediaDetails])
}
