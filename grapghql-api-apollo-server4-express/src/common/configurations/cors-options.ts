type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[]
type CorsCallback = (err: Error | null, origins?: StaticOrigin) => void
type OriginType = string | undefined

const corsOptions = {
  origin: (origin: OriginType, callback: CorsCallback): void => {
    if (!origin) {
      return callback(null, true)
    }
    if ((process.env.WHITE_LIST_URLS as string[] | undefined)?.indexOf(origin) === -1) {
      return callback(
        new Error('The CORS policy for this site does not allow access from the specified Origin.'),
        false,
      )
    }
    return callback(null, true)
  },
  credentials: true,
}

export default corsOptions
