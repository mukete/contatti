function api (app) {
    var mongojs = require("mongojs");
    
    var db = mongojs("contactapp", ["contacts"]);

    app.get("/api/contact", function (request, response) {
        var pageSize = 20;
        var contactName = request.query.contactName;
        var contactPhone = request.query.contactPhone;
        var contactEmail = request.query.contactEmail;
        var contactPhoto = request.query.contactPhoto;
        var contactFavorite = request.query.contactFavorite;

        var find = {};

        if (contactName) {
            find.contactName = new RegExp(contactName, "i");
        }

        var fields = {
            contactName: 1,
            contactPhone:1,
            contactEmail:1,
            contactFavorite:1,
            contactPhoto:1,
        };

        var result = db.contacts.find(find, fields).limit(pageSize, function (err, docs) {
            response.json(docs);
        });
    });

    app.get("/api/contact/:id", function (request, response) {
        var id = request.params.id;

        db.contacts.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });

    app.post("/api/contact", function (request, response) {
        db.contacts.insert(request.body, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });

    app.put("/api/contact/:id", function (request, response) {
        var id = request.params.id;

        db.contacts.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    contactName: request.body.contactName,
                    contactPhoto: request.body.contactPhoto,
                    contactFavorite: request.body.contactFavorite,
                    contactPhone: request.body.contactPhone,
                    contactEmail: request.body.contactEmail
                }
            },
            new: true
        }, function (err, doc) {
            response.json(doc);
        });
    });

    app.delete("/api/contact/:id", function (request, response) {
        var id = request.params.id;

        console.log(id);

        db.contacts.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });
};

module.exports = api;
