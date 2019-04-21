
module.exports = responseSender = function (response,status, code, message, data) {
    response.json({
        meta: {
            status: status,
            code: code,
            message: message
        },
        data: data
    })
}