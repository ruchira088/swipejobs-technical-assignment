/**
 * Returns true of all the items in the second array are included in the first array
 */
const arrayIncludes = (array = [], other = []) => (
    other.filter(value => !array.includes(value)).length == 0
)

module.exports = {
    arrayIncludes
}