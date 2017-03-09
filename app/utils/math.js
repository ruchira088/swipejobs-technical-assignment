const constants = require("../constants")

const convertDegreesToRadians = degrees => degrees * Math.PI / 180

const squareValue = value => value * value

const convertToRadianCoordinates = ({latitude, longitude}) =>
    ({
        latitude: convertDegreesToRadians(latitude),
        longitude: convertDegreesToRadians(longitude)
    })

/**
 * Returns the distance between 2 coordinates in kms. The calculation is performed using the
 * Haversine formula.
 *
 * For more details, visit https://en.wikipedia.org/wiki/Haversine_formula
 *
 */
const getDistanceBetweenTwoCoordinates = (coordinates_1, coordinates_2) => {
    const {sin, cos, asin, sqrt} = Math
    const radius = constants.RADIUS_OF_EARTH

    const {latitude: lat_1, longitude: lon_1} = convertToRadianCoordinates(coordinates_1)
    const {latitude: lat_2, longitude: lon_2} = convertToRadianCoordinates(coordinates_2)

    const term_1 = squareValue(sin((lat_2-lat_1)/2))
    const term_2 = cos(lat_2) * cos(lat_1) * squareValue(sin((lon_2-lon_1)/2))

    return 2 * radius * asin(sqrt(term_1+term_2))
}

module.exports = {
    getDistanceBetweenTwoCoordinates
}