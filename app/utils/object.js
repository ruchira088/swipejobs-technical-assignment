const arrayIncludes = (array, other) => (
    other.filter(value => !array.includes(value)).length == 0
)

module.exports = {
    arrayIncludes
}