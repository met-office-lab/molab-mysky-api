/**
 * Created by tom on 07/04/16.
 */

var AWS = require('aws-sdk');
AWS.config.update({
    region: "eu-west-1",
});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

//logging
var debug = require('debug')('molab-wtf:services/molab-wtf/user-service');

module.exports = {

    addUser: function (username, password) {
        return new Promise(
            function(resolve, reject) {
                debug("adding user :", username);
                var params = {
                    TableName: "users",
                    Item: {
                        username: username,
                        password: password,
                        registration_dt: new Date().toISOString()
                    },
                    "ConditionExpression": "attribute_not_exists(username)"
                };
                docClient.put(params, function (err, data) {
                    if (err) {                              // an error occurred
                        debug(err, err.stack);
                        reject(err);
                    }
                    else {                                  // successful response from db
                        resolve(data);
                    }
                });
            });
    },

    findByUsername : function(username) {
        return new Promise(
            function(resolve, reject) {
                debug("finding user :", username);
                var params = {
                    TableName: "users",
                    Key: {
                        username: username
                    }
                };
                docClient.get(params, function (err, data) {
                    if (err) {                              // an error occurred
                        debug(err, err.stack);
                        reject(err);
                    }
                    else {                                  // successful response from db
                        if(data.hasOwnProperty('Item')) {
                            resolve(data.Item);
                        } else {
                            resolve(null);
                        }
                    }
                });
            });
    },

    updateUser: function (username, password) {
        //TODO
    },

    addUserOb: function (userId, location, obs, ob) {
        //TODO
    }

};