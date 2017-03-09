const express = require("express")
const http = require("http")
const {createResponse} = require("./utils/general")
const workerRouter = require("./routes/worker")
const jobRouter = require("./routes/job")

const {httpPort} = require("../config.json")
const {name, version, description} = require("../package.json")

const app = express()

app.use(workerRouter.PATH, workerRouter.router)
app.use(jobRouter.PATH, jobRouter.router)

app.get("/", (request, response) => {

    const links = {
        workers: workerRouter.PATH,
        jobs: jobRouter.PATH
    }
    const data = {name, version, description}

    response.json(createResponse(request, links, data))
})

http.createServer(app).listen(httpPort, () => {
    console.log(`The server is listening on port: ${httpPort}`)
})