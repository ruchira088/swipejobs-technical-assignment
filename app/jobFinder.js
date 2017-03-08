const {getSwipeWorkers, getSwipeJobs} = require("./utils/http")
const {arrayIncludes} = require("./utils/object")
const {getDistanceBetweenTwoCoordinates} = require("./utils/math")

const getWorker = workerId => (
    getSwipeWorkers().then(workers => {
        const worker = workers.find(({userId}) => userId == workerId)

        if(worker != undefined) {
            return worker
        } else {
            return Promise.reject({status: 404, message: `Unable to find worker with Id: ${workerId}`})
        }
    })
)

const getJob = jobId => (
    getSwipeJobs()
        .then(jobs => {
            const job = jobs.find(job => job.jobId == jobId)

            if(job != undefined) {
                return job
            } else {
                return Promise.reject({status: 404, message: `Unable to find job with Id: ${jobId}`})
            }
        })
)

const jobFinder = workerId => (
    Promise.all([getWorker(workerId), getSwipeJobs()])
        .then(([worker, jobs]) => jobs.filter(isMatch(worker)))
)

const isMatch = worker => job => {
    const hasRequiredCertificates = arrayIncludes(worker.certificates, job.requiredCertificates)
    const driverLicenseCompliant = !job.driverLicenseRequired || worker.hasDriversLicense

    const {latitude, longitude, maxJobDistance} = worker.jobSearchAddress

    const withinDistance = maxJobDistance >= getDistanceBetweenTwoCoordinates({latitude, longitude}, job.location)

    return hasRequiredCertificates && driverLicenseCompliant && withinDistance
}

module.exports = {jobFinder, getWorker, getJob}