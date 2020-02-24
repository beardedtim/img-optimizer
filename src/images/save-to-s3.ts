import { S3 } from 'aws-sdk'

export const save = (key: string, value: any) => {
  const params = {
    Bucket: process.env.CACHE_BUCKET || '',
    Key: key,
    Body: value
  }

  return new Promise((res, rej) => {
    const s3 = new S3()

    s3.putObject(params, (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    })
  })
}
