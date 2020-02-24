import sharp from 'sharp'

export const parse = (stream: any, args: any) => {
  const {
    width,
    height,
    fit = 'inside',
    format = 'jpeg',
    quality = 80,
    ...rest
  } = args
  let sharpPipe = sharp()

  // format to requested type/quality/etc
  sharpPipe = (sharpPipe as any)[format]({
    quality: Number(quality),
    ...rest
  })
  // resize to requested size
  sharpPipe = sharpPipe.resize({
    width: width ? Number(width) : width,
    height: height ? Number(height) : height,
    fit
  })

  return stream.pipe(sharpPipe)
}
