const {Router} = require("express")
const {getJob} = require("../swipeJobs/query")
const {createResponse} = require("../utils/general")

const PATH = "/job"
const jobRouter = Router()

jobRouter.get("/", (request, response) => {
	const links = {
        getJobDetails: `${request.originalUrl}/{jobId}`
	}

	response.json(createResponse(request, links))
})

jobRouter.get("/:jobId", (request, response) => {
    const {jobId} = request.params

    getJob(jobId)
        .then(job => {
            response.json(createResponse(request, undefined, job))
        })
        .catch(({status, message}) => {
            response.status(status).json(message)
        })
})

module.exports = {
	PATH,
	router: jobRouter
}