var apn = require('apn');
var options = {
  token: {
    key: "AuthKey_42R9N7HP65.p8",
    keyId: "42R9N7HP65",
    teamId: "HQ8Q94QEQ3"
  },
  production: false
};

var apnProvider = new apn.Provider(options);

let deviceToken = "aa58cf1d390e7ec3626fdddac499fb8ca894dde6d7267d311bc93715089beae4";

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 Mosambee notification";
//note.alert = "\uD83D\uDCE7 \u2709 Nilesh bhau";

note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "com.mosambee.mpos";

apnProvider.send(note, deviceToken).then( (result) => {
  // see documentation for an explanation of result
  console.log(result);
});



