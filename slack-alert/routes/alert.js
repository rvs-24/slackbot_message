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
   // console.log('ho');
   const event = req.body.event
   console.log(event);
   //console.log(req.challenge);
   //console.log(req.body.event);
   //console.log(req);
   if(event.text==='hi'){
       n=n+1;
   console.log(`Received a message event: user ${event.user} in channel ${event.channel} texted ${event.text}`);
   console.log(n);
   }
   
   if(typeof event.user!=='undefined'){
   await Axios.post(
       "https://hooks.slack.com/services/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",
       {
           text: event.text,
       }
   );
}

//    console.log(req.body)
  res.json({
      challenge: event, 
  });
  //res.send('hi');
});

module.exports = router;

