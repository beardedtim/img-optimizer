import { read as readFromURL } from './get-from-url'

export const read = (bucket: string, key: string) =>
  readFromURL(`https://${bucket}.s3.amazonaws.com/${key}`)
