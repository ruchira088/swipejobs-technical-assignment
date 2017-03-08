const {Router} = require("express")
const {getJob} = require("../jobFinder")

const PATH = "/job"
const jobRouter = Router()

jobRouter.get("/", (request, response) => {
	response.json({
		links: {
			self: request.originalUrl,
			fetchJob: `${request.originalUrl}/{jobId}`
		}
	})
})

jobRouter.get("/:jobId", (request, response) => {
	const {jobId} = request.params

	getJob(jobId).then(job => {
        response.json({
            link: {
                self: request.originalUrl
            },
			data: job
        })
    })

})

module.exports = {
	PATH,
	router: jobRouter
}