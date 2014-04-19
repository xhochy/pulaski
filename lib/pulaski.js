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
        if (cb != null) {
            if (res != null) {
                cb(err, JSON.parse(res));
            } else {
                cb(err, null);
            }
        }
    });
};


/**
 * Skip to the next track in the play queue.
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.next = function (cb) {
    this.getJSON("playback/next", cb);
};


/**
 * Rewind to the previously played track.
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.previous = function (cb) {
    this.getJSON("playback/previous", cb);
};


/**
 * Toggle play/pause playback state
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.playpause = function (cb) {
    this.getJSON("playback/playpause", cb);
};


/**
 * Start playing the currently selected track
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.play = function (cb) {
    this.getJSON("playback/play", cb);
};


/**
 * Pause the playback
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.pause = function (cb) {
    this.getJSON("playback/pause", cb);
};


/**
 * Get the current volume level
 *
 * The volume is returned as the volume property of the respone object.
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.volume = function (cb) {
    this.getJSON("playback/volume", cb);
};


/**
 * Increase the volume
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.raiseVolume = function (cb) {
    this.getJSON("playback/raisevolume", cb);
};


/**
 * Lower the volume
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.lowerVolume = function (cb) {
    this.getJSON("playback/lowervolume", cb);
};


/**
 * Check if we can successfully reach a Tomahawk instance.
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.ping = function (cb) {
    this.get("ping", cb);
};

/**
 * Get information about the current playing track.
 *
 * @param {Function (String,Object)->Void} cb
 */
Pulaski.Instance.prototype.currentTrack = function (cb) {
    this.getJSON("playback/currenttrack", cb);
};

