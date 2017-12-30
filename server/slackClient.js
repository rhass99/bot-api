import { RtmClient, CLIENT_EVENTS, RTM_EVENTS } from '@slack/client';

const token = process.env.SLACK_TOKEN;
let rtm = null;
let nlp = null;
const appData = {};

// Handle incoming message functions.
const handleIncoming = (message) => {
  nlp.sendMessage(rtm, message);
};

// Function used to show that we are properly connected.
const addAuthenticatedHandler = (rtmClient) => {
  // The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
  rtmClient.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
  // Cache the data necessary for this app in memory
    appData.selfId = connectData.self.id;
    appData.name = connectData.self.name;
    console.log(`Logged in as ${appData.name}, with ID of ${appData.selfId}`);
  });
  rtmClient.on(RTM_EVENTS.MESSAGE, handleIncoming);
};

// Initialize the RTM client with the recommended settings. Using the defaults.
const slackClient = (nlpClient, callback) => {
  rtm = new RtmClient(token, {
    dataStore: false,
    useRtmConnect: true,
    logLevel: 'verbose',
  });
  nlp = nlpClient;
  callback(rtm);
  addAuthenticatedHandler(rtm);
};

export default slackClient;
