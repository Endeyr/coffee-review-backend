import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'node:http'
import path from 'node:path'
import { CLIENT_HOST, PORT } from '../utils/config'

dotenv.config()
const app = express()
app.use(express.static(path.join(__dirname, 'build')))
const corsOptions = {
	origin: CLIENT_HOST,
	optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
const server: http.Server = http.createServer(app)
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	console.log(req.headers.host)
	res
		.status(200)
		.send(
			'Welcome to the server. Authorized users can access the api endpoints.'
		)
})

server
	.listen(PORT, () => {
		console.log(`SERVER IS RUNNING ON ${PORT}`)
	})
	// Fix for error EADDRINUSE
	.on('error', function (err) {
		console.error(err)
		process.once('SIGUSR2', function () {
			process.kill(process.pid, 'SIGUSR2')
		})
		process.on('SIGINT', function () {
			// this is only called on ctrl+c, not restart
			process.kill(process.pid, 'SIGINT')
		})
	})
