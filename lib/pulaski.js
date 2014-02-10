/**
 * Provide JavaScript functions to interact with Tomahawk instances.
 *
 * @module Pulaski
 */
var Pulaski = Pulaski || {};

/**
 * Connection to a Tomahawk instance
 *
 * @class Instance
 * @param {boolean} autodetect Automatically detect the location of the
 *  Tomahawk instance based on default values and gobal settings (which may
 *  come from browser extensions)
 * @param {Object} options Various settings for the manual connection to a
 *  Tomahawk instance. If `autodetect` is `true`, these settings will only
 *  be used if autodetecion failed.
 * @constructor
 */
Pulaski.Instance = function (autodetect, options) {
    // Assign default values to function parameters.
    autodetect = autodetect || true;
    var opt = options || {};
    this.host = opt.host || "localhost";
    this.port = opt.port || 60210;
};

Pulaski.Instance.prototype.get = function (apicall, cb) {
    var url = "http://" + this.host + ":" + this.port + "/api/1.5/" + apicall;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4) {
            if (xmlHttpRequest.status == 200) {
                cb(null, xmlHttpRequest.responseText);
            } else {
                cb(xmlHttpRequest.status, null);
            }
        }
    };
    xmlHttpRequest.send(null);
}


/**
 * Do a HTTP GET request and parse the JSON response.
 *
 * @param {String} apicall The API function that shall be invoked.
 * @param {Function (String,Object)->Void} cb Callback where the first argument
 *  is null on success or the error on failure. The second argument will be the
 *  parsed JSON response.
 */
Pulaski.Instance.prototype.getJSON = function (apicall, cb) {
    this.get(apicall, function (err, res) {
        if (res != null) {
            console.log(res);
            cb(err, JSON.parse(res));
        } else {
            cb(err, null);
        }
    });
};
/**
 * Check if we can successfully reach a Tomahawk instance.
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.ping = function (cb) {
    this.get("ping", cb);
};
