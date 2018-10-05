if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { RTMClient } = require('@slack/client');
//import nlpClient from './witClient'
import nlpClient from './apiaiClient'

const token = process.env.SLACK_OLD_BOT;
let rtm       = new RTMClient(token);
let nlp = nlpClient

const appData = {};

// Handle incoming message functions.
const handleIncoming = (message) => {
  if (nlp.name === 'wit') {
    nlp.sendMessage(rtm, message);
  } else if (nlp.name === 'api') {
    nlp.sendAiMessage(rtm, message);
  }
};

// Function used to show that we are properly connected.
const addAuthenticatedHandler = (rtm) => {
  // The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
  rtm.on('authenticated', (connectData) => {
  // Cache the data necessary for this app in memory
    appData.selfId = connectData.self.id;
    appData.name = connectData.self.name;
    console.log(`Logged in as ${appData.name}, with ID of ${appData.selfId}`);
  });
  rtm.on('message', handleIncoming);
  console.log(`Logged in as ${appData.name}, with ID of ${appData.selfId}`);
};

// Initialize the RTM client with the recommended settings. Using the defaults.
const slackClient = (nlpClient, callback) => {
  rtm = new RTMClient(token, {
    dataStore: false,
    useRtmConnect: true,
  });
  nlp = nlpClient;
  callback(rtm);
  addAuthenticatedHandler(rtm);
};

export default slackClient;
