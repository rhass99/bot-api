import { apiai } from 'apiai';

const apiaiToken = process.env.APIAI_CLIENT;

const apiaiResponse = (text, sessionID) => {
  const request = app.textRequest(text, {
    sessionId: sessionID 
  });
  return request;
};



const witClient = new Wit({
  accessToken: witToken,
});

export default witClient;

console.log(uuidv5('rami@rami.com'))