import http from 'http';
import service from '../server/service';

const server = http.createServer(service);

server.listen(3000);

server.on('request', () => {
  console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')}`);
});
