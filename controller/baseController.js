const responseSender = require("../middileware/responseSender")

class BaseController {
    constructor() { }

    getAll(Obj, att, response) {
        var query;
        if (att.length > 0) {
            query = Obj.findAll({ attributes: att }, { raw: true })
        } else {
            query = Obj.findAll({ raw: true })
        }

        query.then(res => {
            if (res) {
                responseSender(response, true, 200, "Recored Fetched!", res)
            }
        })
            .catch(error => {
                console.log(error)
                responseSender(response, false, 400, "Somthing went wrong", null)
            });
    }

    create(Obj, body, response) {
        console.log("body",body)
        Obj.create(body).then(res => {
            if (res) {
                responseSender(response, true, 201, "Record has been added", res)
            }
        }).catch(err => {
            console.log("create", err)
            responseSender(response, false, 400, "Something went worong", null)
        })
    }

    getSingle(Obj, where, response) {
        Obj.findAll({
            where,
            raw: true
        }).then(res => {
            if (res) {
                responseSender(response, true, 200, "Record Fetched", res)
            }
        }).catch(err => {
            console.log(err)
            responseSender(response, false, 400, "Something went worong", null)
        })
    }

    delete(Obj, id, response) {
        Obj.destroy({
            where: {
                id: id
            }
        }).then(res => {
            if (res) {
                responseSender(response, true, 200, "Record Fetched", res)
            }
        }).catch(err => {
            responseSender(response, false, 400, "Something went worong", null)
        })
    }

    update(Obj, body, response) {
        Obj.update(
            body,
            {
                where: { id: body.id }
            }).then(res => {
                if (res) {
                    responseSender(response, true, 200, "Record Updated", res)
                }
            }).catch(err => {
                responseSender(response, false, 400, "Something went worong", null)
            })
    }

}

module.exports = BaseController