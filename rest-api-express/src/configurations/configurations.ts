export const environment = (): string => process.env.NODE_ENV || 'development'

export const serverPort = (): number => Number(process.env.PORT) || 3010

export const whiteListUrls = (): string[] | undefined =>
    process.env.WHITE_LIST_URLS as string[] | undefined

export const mongoConnString = (): string =>
    'mongodb://localhost:27017/mydatabase';
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/?retryWrites=true&w=majority` ||
    ''