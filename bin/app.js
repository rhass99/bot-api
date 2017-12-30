import http from 'http';
import service from '../server/service';
import slackClient from '../server/slackClient';
import witClient from '../server/witClient';
//import apiaiClient from '../server/apiaiClient';

const server = http.createServer(service);
server.listen(3000);

slackClient(witClient, x => x.start());

server.on('listening', () => {
  console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
});
