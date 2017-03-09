const createResponse = (request, links = {}, data) => ({
    links: Object.assign({self: request.originalUrl}, links),
    data
})

module.exports = {
    createResponse
}

