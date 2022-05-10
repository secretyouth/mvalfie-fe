const express = require('express')
const sslRedirect = require('heroku-ssl-redirect').default
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    // redirect to SSL
    server.use(sslRedirect())

    // redirect old urls
    server.use((req, res, next) => {
        if (req.hostname === 'www.mvalfie.com.au' || req.hostname === 'mvalfie.com.au' || req.hostname === 'mvalfieandco.com.au') {
            return res.redirect(301, `${process.env.BASE_URL}${req.url}`)
        }

        next()
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
