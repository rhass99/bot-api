import { RtmClient, CLIENT_EVENTS } from '@slack/client';

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// Function used to show that we are properly connected.
export const addAuthenticatedHandler = (rtm, appCacheData, callback) => {
  // The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
  // (before the connection is open)
  const appData = appCacheData;
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
  // Cache the data necessary for this app in memory
    appData.selfId = connectData.self.id;
    appData.name = connectData.self.name;
    console.log(`Logged in as ${appData.name}, with ID of ${appData.selfId} of team ${connectData.team.id}`);
  });
  rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN, () => {
    console.log('Ready');
  });
  callback();
};

// export const rtmReady = (rtm) => {
//   rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN, () => {
//     console.log('Ready');
//   });
// };

// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
export const slackClient = () => {
  const rtm = new RtmClient(token, {
    dataStore: false,
    useRtmConnect: true,
    logLevel: 'verbose',
  });
  return rtm;
};

// The client will emit an RTM.RTM_CONNECTION_OPEN the connection is ready for
// sending and recieving messages

