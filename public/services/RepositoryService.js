(function (app) {
    "use strict";

    app.service("RepositoryService", RepositoryService);

    RepositoryService.$inject = ["$log", "$http"];

    function RepositoryService($log, $http) {
        var svc = this;

        var apiUrl = "/api/";

        svc.getContacts = function (fields) {
            var queryString = [];

            if (fields.pageSize) {
                queryString.push("pageSize=" + fields.pageSize);
            }

            if (fields.contactName) {
                queryString.push("contactName=" + fields.contactName);
            }

            if (fields.contactPhoto) {
                queryString.push("contactPhoto=" + fields.contactPhoto);
            }

            if (fields.contactFavorite) {
                queryString.push("contactFavorite=" + fields.contactFavorite);
            }

            var url = apiUrl + "contact";

            var fullUrl = queryString.length == 0 ? url : [url, "?", queryString.join("&")].join("");

            return $http.get(fullUrl);
        };

        svc.getContact = function (id) {
            return $http.get(apiUrl + "contact/" + id);
        };

        svc.createContact = function (model) {

            console.log(model);
            return $http.post(apiUrl + "contact", model);
        };

        svc.updateContact = function (id, model) {
            return $http.put(apiUrl + "contact/" + id, model);
        };

        svc.deleteContact = function (id) {
            console.log(apiUrl + "contact/" + id);
            
            return $http.delete(apiUrl + "contact/" + id);
        };
    };
})(angular.module("contactManager"));
