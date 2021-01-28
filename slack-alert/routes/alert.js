var express = require('express');
var Axios=require('axios');
var router = express.Router();
const SECRET = '0c32ab2165c30e3771b88806535831d6'

/*const { createEventAdapter } = require('@slack/events-api')
const slackEvent = createEventAdapter(SECRET)

slackEvent.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel}`)
})*/

var n=0;
router.post('/', async(req, res, next) => {
   const challenge = req.body.challenge
   const event = req.body.event
   //console.log(event);
   console.log(req.body);
   if(event.text.includes('testing')){
      // n=n+1;
   console.log(`Received a message event: user ${event.user} in channel ${event.channel} texted ${event.text}`);
   //console.log(n);
   
   
   if(typeof event.user!=='undefined'){
   await Axios.post(
       "https://hooks.slack.com/services/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",
       {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${event.text} \n\n<https://example.com|View request>`
			        } 
		}
	         ]
       }
   );
 }
}


  res.json({
      challenge: event, 
  });
});

module.exports = router;

