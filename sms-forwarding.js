// ************************************************************
// Notes
// ************************************************************
// URL TEMPLATE https://finicky-lettuce-4404.twil.io/<FUNCTION_PATH>?forwardingNumber=<PHONE_NUMBER>&zapUrl=<ZAPIER_WEBHOOK>
// SAMPLE URL: https://finicky-lettuce-4404.twil.io/smsforward?forwardingNumber=+14156608810&zapUrl=https%3A%2F%2Fhooks.zapier.com%2Fhooks%2Fcatch%2F836545%2Fft8z3w%2F
// NOTE: Use a url encoder like https://meyerweb.com/eric/tools/dencoder/ to encode your zapier webhook. Paste the encoded URL into the webhook template

// ************************************************************
// SMS Forwarding
// ************************************************************
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const got=require('got')
	got(event.zapUrl, {method: 'POST', body: event})
    .then((data) => {
    	// Send SMS with Twilio Client
      context.getTwilioClient().messages.create({
          body:`${event.From}: ${event.Body}`,
          to:event.forwardingNumber,
          from:event.To
      })
      .then((message) => callback(null, twiml))
    })
    .catch((err) => console.log(err))
}
