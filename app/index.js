const express = require("express")
const http = require("http")
const workerRouter = require("./routes/worker")
const jobRouter = require("./routes/job")

const {httpPort} = require("../config.json")
const {name, version, description} = require("../package.json")

const app = express()

app.use(workerRouter.PATH, workerRouter.router)
app.use(jobRouter.PATH, jobRouter.router)

app.get("/", (request, response) => {

    response.json({
        links: {
            self: request.originalUrl,
            worker: workerRouter.PATH
        },
        data: {name, version, description}
    })
})

http.createServer(app).listen(httpPort, () => {
    console.log(`The server is listening on port: ${httpPort}`)
})