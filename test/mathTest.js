const {assert} = require("chai")
const {getDistanceBetweenTwoCoordinates} = require("../app/utils/math")

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