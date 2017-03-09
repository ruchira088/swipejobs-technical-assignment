const {Router} = require("express")
const {getWorker, jobFinder} = require("../swipeJobs/query")
const {createResponse} = require("../utils/general")

const PATH = "/worker"
const workerRouter = Router()

workerRouter.get("/", (request, response) => {
    const links = {
        fetchWorker: `${PATH}/{workerId}`
    }

    response.json(createResponse(request, links))
})

workerRouter.get("/:workerId", (request, response) => {
    const {workerId} = request.params

    getWorker(workerId)
        .then(worker => {
            const links = {
                jobs: `${request.originalUrl}/jobs`
            }

            response.json(createResponse(request, links, worker))
        })
})

workerRouter.get("/:workerId/jobs", (request, response) => {
    const {workerId} = request.params

    jobFinder(workerId)
        .then(jobs => {
            const links = {
                worker: `${PATH}/${workerId}`
            }

            const data = jobs.map(({jobId, company, jobTitle, about}) => ({
                jobId, company, jobTitle, about,
                links: {
                    self: `/job/${jobId}`
                }
            }))

            response.json(createResponse(request, links, data))
        })
})

module.exports = {
    PATH,
    router: workerRouter
}