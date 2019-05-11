import * as functions from 'firebase-functions'
import * as next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: { distDir: './next' } })
const handle = app.getRequestHandler()

export const nextApp = functions.https.onRequest(
  (req, res): Promise<void> => {
    console.log('File: ' + req.originalUrl)

    return app.prepare().then(
      (): Promise<void> => {
        console.log(req.originalUrl)
        if (req.originalUrl.indexOf('/l/') !== -1) {
          const page = `${req.originalUrl.split('/l/')[0]}`
          console.log({ page })
          const slug = req.originalUrl.split('l/')[1]
          console.log({ slug })
          return app.render(req, res, page, {
            slug
          })
        } else {
          return handle(req, res)
        }
      }
    )
  }
)
