import { S3 } from 'aws-sdk'
const bucket = process.env.CACHE_BUCKET || ''

export const cache = {
  has: async (key: string) => {
    const s3 = new S3()

    try {
      await s3.headObject({ Bucket: bucket, Key: key }).promise()
      return true
    } catch (e) {
      return false
    }
  },
  get: (key: string) => {
    const s3 = new S3()

    return s3.getObject({ Bucket: bucket, Key: key }).createReadStream()
  },
  set: (key: string, value: any) => {
    const s3 = new S3()

    value.on('data', (msg: any) => {
      s3.putObject(
        {
          Bucket: bucket,
          Key: key,
          Body: msg,
          ACL: 'public-read'
        },
        (err, data) => {
          console.dir(err)
          console.dir(data)
        }
      )
    })
    return value
  }
}

export default cache
