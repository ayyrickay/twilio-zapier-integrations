// ************************************************************
// Notes
// ************************************************************
// SAMPLE URL: https://finicky-lettuce-4404.twil.io/studio-engagement
// NOTE: Use these two functions to trigger a Studio Flow using the REST API
// The Zapier code goes in the Zapier Node.js runtime (https://zapier.com/help/code/)
// The Twilio Code would go in a Twilio Function

// ************************************************************
// Zapier Code
// ************************************************************
const queryString = require('querystring')

const body = {
  To: inputData.ToNumber,
  From: inputData.TwilioNumber,
  Parameters:JSON.stringify({
    Key1: 'Value1',
    Key2: 'Value2'
  })
}

const qs = queryString.stringify(body)
fetch(`<TWILIO_FUNCTION_PATH>?${qs}`, {
    method: 'POST',
  })
  .then((res) => res.text())
  .then(data => callback(null, data))
  .catch(callback)

// ************************************************************
// Twilio Function
// ************************************************************

exports.handler = function(context, event, callback) {
    const client = context.getTwilioClient()
    client.studio.flows('<FLOW_SID>').engagements.create({to: event.To, from: event.From, parameters: JSON.parse(event.Parameters)})
    .then((engagement) => {
        console.log(engagement.sid)
        callback(null, engagement.sid);
    })
};
