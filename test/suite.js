const {assert} = require("chai")
const {getDistanceBetweenTwoCoordinates} = require("../app/utils/math")
const {isMatch} = require("../app/swipeJobs/query")

const createCoordinates = (latitude, longitude) => ({latitude, longitude})

const isInAcceptableRange = (actualValue, expectedValue) => {
    const ERROR_MARGIN = 0.01;

    const max = expectedValue * (1 + ERROR_MARGIN)
    const min = expectedValue * (1 - ERROR_MARGIN)

    return actualValue >= min && actualValue <= max
}

describe("Testing app/utils/math.js", () => {
    describe("getDistanceBetweenTwoCoordinates(coordinates_1, coordinates_2)", () => {
        const TEST_VALUES = [
            {
                coordinate_1: createCoordinates(36.12, -86.67),
                coordinate_2: createCoordinates(33.94, -118.40),
                distance: 2887.26
            },
            {
                coordinate_1: createCoordinates(38.898556, -77.037852),
                coordinate_2: createCoordinates(38.897147, -77.043934),
                distance: 0.55
            },
            {
                coordinate_1: createCoordinates(39.156, -77.037852),
                coordinate_2: createCoordinates(38.897147, -77.043934),
                distance: 28.8
            },
            {
                coordinate_1: createCoordinates(20, 20),
                coordinate_2: createCoordinates(19.5, 20),
                distance: 55.6
            }
        ]

        TEST_VALUES.forEach(({coordinate_1, coordinate_2, distance}) => {
            const calculatedDistance = getDistanceBetweenTwoCoordinates(coordinate_1, coordinate_2)

            it(`actual distance: ${distance}, calculate distance: ${calculatedDistance}`, () => {
                assert.isTrue(isInAcceptableRange(calculatedDistance, distance))
            })
        })
    })
})

describe("Tesing app/jobFinder.js", () => {
    describe("isMatch(worker, job)", () => {
        const TEST_VALUES = [
            {
                worker: {
                    "hasDriversLicense": false,
                },
                job:  {
                    "driverLicenseRequired": true,
                },
                match: false
            },
            {
                worker: {
                    "hasDriversLicense": true,
                },
                job:  {
                    "driverLicenseRequired": true,
                },
                match: true
            },
            {
                worker: {
                    certificates: [
                        "Cats"
                    ]
                },
                job: {
                    requiredCertificates: [
                        "The Human Handbook",
                        "Outstanding Memory Award",
                        "Excellence in Organization"
                    ]
                },
                match: false
            },
            {
                worker: {
                    certificates: [
                        "The Human Handbook",
                        "Outstanding Memory Award",
                        "Excellence in Organization",
                        "Cat whisperer"
                    ]
                },
                job: {
                    requiredCertificates: [
                        "The Human Handbook",
                        "Outstanding Memory Award",
                        "Excellence in Organization"
                    ]
                },
                match: true
            },
            {
                worker: {
                    jobSearchAddress: {
                        maxJobDistance: 20,
                        longitude: "13.971284",
                        latitude: "49.782281"
                    }
                },
                job: {
                    location: {
                        "longitude": "13.864602",
                        "latitude": "49.93359"
                    }
                },
                match: true
            },
            {
                worker: {
                    jobSearchAddress: {
                        maxJobDistance: 30,
                        longitude: "13.971284",
                        latitude: "49.636"
                    }
                },
                job: {
                    location: {
                        "longitude": "13.864602",
                        "latitude": "49.93359"
                    }
                },
                match: false
            }
        ]

        TEST_VALUES.forEach(({worker, job, match}) => {
            it(`Should match: ${match}`, () => {
                assert.equal(isMatch(worker, job), match)
            })
        })
    })
})