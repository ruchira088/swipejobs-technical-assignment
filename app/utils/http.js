const http = require("http")
const configJson = require("../../config.json")

const {baseUrl, endPoints} = configJson.apiServices.swipeJobs

const getRequest = baseUrl => path => (
    new Promise((resolve, reject) => {
        const request = http.request(`${baseUrl}/${path}`, response => {
            response.setEncoding("utf8")

            let responseBody = ""

            response.on("data", data => {
                responseBody += data
            })

            response.on("end", () => {
                resolve(JSON.parse(responseBody))
            })

            response.on("error", reject)
        })

        request.end()
    })
)

const swipeJobGetRequest = getRequest(baseUrl)

const getSwipeWorkers = () => swipeJobGetRequest(endPoints.workers)

const getSwipeJobs = () => swipeJobGetRequest(endPoints.jobs)

module.exports = {
    getSwipeJobs,
    getSwipeWorkers
}