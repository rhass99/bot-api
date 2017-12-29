import http from 'http';
import service from '../server/service';
import { slackClient,
  addAuthenticatedHandler } from '../server/slackClient';

// Cache of data
const appData = {};

const server = http.createServer(service);

const rtm = slackClient();
rtm.start();

addAuthenticatedHandler(rtm, appData, () => server.listen(3000));

server.on('listening', () => {
  console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
});
