const sessionController = require('../server/controller/sessionController');
const Sessions = require('../server/models/sessionModel.js');

describe('sessionController tests', () => {
  const req = {};
  const res = {
    cookie: jest.fn(),
  };
  const next = jest.fn();
  beforeAll((done) => {
    sessionController.setSSID(req, res, next);
    done();
  });

  it('creates a cookie with an SSID', () => {
    console.log('LSAT CALL:', res.cookie.mock.lastCall);
    expect(res.cookie.mock.lastCall[0]).toBe('SSID');
    expect(typeof res.cookie.mock.lastCall[1]).toBe('number');
  });

  it('creates a session document in the database with same SSID', async () => {
    const ssid = res.cookie.mock.lastCall[1];
    console.log('NEXT PARAM', next.mock.lastCall);
    const session = await Sessions.find({ cookieId: ssid });
    console.log('SESSION:', session);
  });

  xit('after 60 seconds, there is no longer a matching session in the database', () => {});
  xit('proceeds to the next middleware', () => {});
});

// VerifySSID: test that if there is no session that this fails
// then create a session (before all) and make sure that passes
// Then check after a certain amount of time and make sure it expired
