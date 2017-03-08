const {Router} = require("express")
const {getWorker, jobFinder} = require("../jobFinder")

const PATH = "/worker"
const workerRouter = Router()

workerRouter.get("/", (request, response) => {
    response.json({
        links: {
            self: request.originalUrl,
            fetchWorker: `${PATH}/{workerId}`
        }
    })
})

workerRouter.get("/:workerId", (request, response) => {
    const {workerId} = request.params

    getWorker(workerId)
        .then(worker => {

            response.json({
                links: {
                    self: request.originalUrl,
                    jobs: `${request.originalUrl}/jobs`
                },
                data: worker
             })
        })
})

workerRouter.get("/:workerId/jobs", (request, response) => {
    const {workerId} = request.params

    jobFinder(workerId)
        .then(jobs => {

            response.json({
                links: {
                    self: request.originalUrl,
                    worker: `${PATH}/${workerId}`
                },
                data: jobs.map(({jobId, company, jobTitle, about}) => ({
                    jobId,
                    company,
                    jobTitle,
                    about,
                    links: {
                        self: `/job/${jobId}`
                    }
                }))
            })
        })
})

module.exports = {
    PATH,
    router: workerRouter
}