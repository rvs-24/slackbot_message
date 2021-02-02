var express = require('express');
var Axios=require('axios');
var router = express.Router();
const SECRET = '0c32ab2165c30e3771b88806535831d6'
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

const client = new WebClient({
    token: "xoxb-1655473715655-1655502593719-LBzMRmP7mkslXvk3QNiX9ilO",
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
  });

// WebClient insantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.


/*const { createEventAdapter } = require('@slack/events-api')
const slackEvent = createEventAdapter(SECRET)

slackEvent.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel}`)
})*/

var n=0;
const names=new Map();
names.set('U01KHDUNN1L','Rigved');

router.post('/history',async(req,res,next)=>{
    
    const content=req.body;
    console.log(content);
    const userId = content.text.split('|')[0].split('@')[1]
    const channelID = content.text.split('|')[1].split('#')[1]
    console.log(content.text);
    console.log(userId, channelID)

    /*const s=await Axios.get(
        "https://slack.com/api/conversations.history?channel=C01KQ7K336E&inclusive=true&latest=1612186385.000300&limit=4&oldest=1612155937.001900&pretty=1",
        "Authorization: Bearer xoxb-1655473715655-1655502593719-LBzMRmP7mkslXvk3QNiX9ilO"
    );
    console.log(s);*/

    // Axios.get("https://", {
    //     header:{
    //         Authorization: "Bearer",
    //         channelID
    //     }
    // })

    

    let conversationHistory;
// ID of channel you watch to fetch the history for
    //let channelId = "C01LPPFND32";


  // Call the conversations.history method using WebClient
  const result = await client.conversations.history({
    token: "xoxb-1655473715655-1655502593719-LBzMRmP7mkslXvk3QNiX9ilO",
    channel: channelID,
    //latest: '1612186386.000400',
      // Limit results
    //oldest:'1612155937.001900',
    //inclusive: true,
    //limit: 20
  });

  conversationHistory = result.messages;

  // Print results
  //console.log(conversationHistory);

    const textArray=conversationHistory.filter(el=>{
        if(el.user===userId){return el}
    }).map(el => {
        return el.text + '\n'
    })
  

  console.log(textArray);
  //console.log(conversationHistory);
  const l=textArray.length;

  await Axios.post(
    "https://hooks.slack.com/services/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",
    {
 "blocks": [
     {
         "type": "section",
         "text": {
             "type": "mrkdwn",
             "text": `${textArray} \n ${l}<https://example.com|View request>`
                 } 
     }
          ]
    }
)

   
    res.json({
        content: content, 
    });

 });
 
router.post('/alert', async(req, res, next) => {
   const challenge = req.body.challenge
   
   const event = req.body.event
   //console.log(event);
   console.log(req._startTime);
   console.log(req.body);
   let name;
   if(names.has(event.user)){
        name=names.get(event.user);
   }
   else{
        name=event.user;    
   }

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
				"text": `${event.text} ${name}\n\n<https://example.com|View request>`
			        } 
		}
	         ]
       }
   );
 }
}

else if(event.text.includes('hello')){
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
              "text": `${event.text} ${name}\n\n<https://example.com|View request>`
                  } 
      }
           ]
     }
 );
}
}


  res.json({
      challenge: challenge, 
  });
});

module.exports = router;

