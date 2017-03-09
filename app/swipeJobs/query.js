const {getSwipeWorkers, getSwipeJobs} = require("./api")
const {arrayIncludes} = require("../utils/object")
const {getDistanceBetweenTwoCoordinates} = require("../utils/math")
const {HTTP_STATUS_CODES} = require("../constants")
const {maxNumberOfJobs} = require("../../config.json")

/**
 * Fetch worker by ID
 */
const getWorker = workerId => (
    getSwipeWorkers().then(workers => {
        const worker = workers.find(({userId}) => userId == workerId)

        if(worker != undefined) {
            return worker
        } else {
            return Promise.reject({
                status: HTTP_STATUS_CODES.NOT_FOUND,
                message: `Unable to find worker with Id: ${workerId}`
            })
        }
    })
)

/**
 * Fetch job by ID
 */
const getJob = jobId => (
    getSwipeJobs()
        .then(jobs => {
            const job = jobs.find(job => job.jobId == jobId)

            if(job != undefined) {
                return job
            } else {
                return Promise.reject({
                    status: HTTP_STATUS_CODES.NOT_FOUND,
                    message: `Unable to find job with Id: ${jobId}`
                })
            }
        })
)

/**
 * Returns true if the worker has ALL the required certificates for the job
 */
const hasRequiredCertificates = (worker, job) => arrayIncludes(worker.certificates, job.requiredCertificates)

/**
 * Returns true if the job does NOT require a driver's license or if the worker has a driver's license
 */
const driverLicenseCompliant = (worker, job) => (!job.driverLicenseRequired || worker.hasDriversLicense)

/**
 * Returns true if the job location is within the max job distance radius of the worker
 */
const withinDistance = (worker, job) => {
    if(job.location == undefined) {
        return true
    } else {
        const {latitude, longitude, maxJobDistance} = worker.jobSearchAddress

        return maxJobDistance >= getDistanceBetweenTwoCoordinates({latitude, longitude}, job.location)
    }
}

/**
 * Returns true if the worker is a suitable match for the job and false if otherwise
 */
const isMatch = (worker, job) => {

    /**
     * Evaluates each condition sequentially. Returns true if all the conditions are met.
     */
    const evaluateMatch = matchingConditions => {
        const [condition, ...rest] = matchingConditions

        if(condition != undefined) {
            if(condition(worker, job)) {
                return evaluateMatch(rest)
            } else {
                return false
            }
        } else {
            return true
        }
    }

    return evaluateMatch([hasRequiredCertificates, driverLicenseCompliant, withinDistance])
}

/**
 * Finds matching jobs for the worker from the passed-in jobs. When the maximum number of results
 * are found, the search is stopped.
 */
const findJobs = (max, worker, jobs) => {
    const [job, ...rest] = jobs

    if(max === 0 || job == undefined) {
        return []
    } else {
        if(isMatch(worker, job)) {
            return [job].concat(findJobs(max-1, worker, rest))
        } else {
            return findJobs(max, worker, rest)
        }
    }
}

/**
 * Finds jobs that match for the worker
 */
const jobFinder = workerId => (
    Promise.all([getWorker(workerId), getSwipeJobs()])
        .then(([worker, jobs]) => findJobs(maxNumberOfJobs, worker, jobs))
)

module.exports = {jobFinder, getWorker, getJob, isMatch}