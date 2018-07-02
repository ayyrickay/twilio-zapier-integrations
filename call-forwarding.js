// ************************************************************
// Notes
// ************************************************************
// URL TEMPLATE https://finicky-lettuce-4404.twil.io/<FUNCTION_PATH>?forwardingNumber=<PHONE_NUMBER>&zapUrl=<ZAPIER_WEBHOOK>
// SAMPLE URL: https://finicky-lettuce-4404.twil.io/smsforward?forwardingNumber=+14156608810&zapUrl=https%3A%2F%2Fhooks.zapier.com%2Fhooks%2Fcatch%2F836545%2Fft8z3w%2F
// NOTE: Use a url encoder like https://meyerweb.com/eric/tools/dencoder/ to encode your zapier webhook. Paste the encoded URL into the webhook template

// ************************************************************
// Call Forwarding
// ************************************************************
exports.handler = function(context, event, callback) {
  const got = require('got')
  // REQUIRED - you must set this
  let phoneNumber = event.forwardingNumber

  // generate the TwiML to tell Twilio how to forward this call
  let twiml = new Twilio.twiml.VoiceResponse();
 	twiml.dial(phoneNumber)
  // make an HTTP request to the Zapier URL
  got(event.zapUrl, {method: 'POST', body: event})
  .then((data) => {
      // Return TwiML to forward call
      callback(null, twiml) })
  .catch((err) => console.log(err))
}
