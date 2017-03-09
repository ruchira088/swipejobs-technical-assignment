const http = require("http")
const configJson = require("../../config.json")

const {baseUrl, endPoints} = configJson.apiServices.swipeJobs

/**
 * Takes a baseUrl, then takes a path and returns a promise that wraps a GET request
 */
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

/**
 * Returns a promise that contains all the workers from the SwipeJobs API
 */
const getSwipeWorkers = () => swipeJobGetRequest(endPoints.workers)

/**
 * Returns a promise that contains all the jobs from the SwipeJobs API
 */
const getSwipeJobs = () => swipeJobGetRequest(endPoints.jobs)

module.exports = {
    getSwipeJobs,
    getSwipeWorkers
}