/*
    Develop by: Eduardo Vizuete
*/

("use strict");

require("../../models/userSchema");

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var createHash = require("sha.js");
var jwt = require("jsonwebtoken");

// schema
var dataSchema = mongoose.model("User");

const MSGERROR = "Login error";
var HttpException = require("./exceptions/httpException");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

// middleware authenticate user and return token generate
/**
 * @api {post} /apiv1/login Authenticate user and return token generate
 * @apiName /apiv1/login
 * @apiGroup Login
 *
 * @apiParam {String} username User name.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {String} success     true.
 * @apiSuccess {String} token       Token generate.
 * @apiSuccess {String} id          Id user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success"  : "true",
 *       "token"    : "eyJhbGc...",
 *       "id"       : "1234..."
 *     }
 *
 * @apiError {String}   success     false.
 * @apiError {String}   status      http status code.
 * @apiError {String}   name        name or description http status code.
 * @apiError {String}   message     error message.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 422 Unprocessable Entity
 *      {
 *          "success": false,
 *          "status": 422,
 *          "name": "Unprocessable Entity",
 *          "message": "Error message",
 *      }
 */

/* POST data */

router.post(
  "/",
  [
    // Validate field is not empty
    // Sanitize (trim and escape)
    body("username").exists().isLength({ min: 1 }).trim().escape(),
    body("password").exists().isLength({ min: 1 }).trim().escape(),
  ],
  function(req, res, next) {
    console.log("Body: ", req.body);

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      var username = req.body.username;
      var password = req.body.password;

      // encriptar clave
      var sha256 = createHash("sha256");
      var encrip = sha256.update(password, "utf8").digest("hex");
      password = encrip;
      console.log("Clave encriptada: ", password);

      // save data
      dataSchema.findOne(
        {
          username: username,
          password: password
        },
        function(err, dataFind) {
          if (err) {
            var exception = new HttpException(false, 422, "", MSGERROR);
            return res.status(422).json(exception.getMessageJson());
          } else {
            if (dataFind != null) {
              // generate token
              let token = jwt.sign(
                {
                  id: username
                }, "1234abcd", {
                  expiresIn: "2 days"
                }
              );

              res.json({
                success: true,
                token: token,
                id: dataFind._id
              });
              console.log("Successfully generate token");
            } else {
              console.log(MSGERROR + ": " + "Data not found " + username);
              var exception = new HttpException(false, 422, "", MSGERROR);
              res.status(422).json(exception.getMessageJson());
            }
          }
        }
      );
    } else {
      console.log(MSGERROR + ": " + "Body values required");
      var exception = new HttpException(false, 400, "", MSGERROR);
      res.status(400).json(exception.getMessageJson());
    }
  }
);

module.exports = router;
