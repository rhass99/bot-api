import { Wit } from 'node-wit';

const witToken = process.env.WIT_SERVER_ACCESS_TOKEN;

const witClient = new Wit({
  accessToken: witToken,
});

export default witClient;
