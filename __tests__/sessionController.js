const sessionController = require('../server/controller/sessionController');
const sessionModel = require('../server/models/sessionModel');

// Test that when setSSID is run, there is a session in the database that corresponds.

describe('sessionController tests', () => {
  const req = {};
  const res = {
    cookie: jest.fn(),
  };
  const next = jest.fn();
  beforeAll((done) => {
    sessionController.setSSID(req, res, next);
    console.log('COOKIE TEST:', res.cookie.mock.lastcall);
    done();
  });

  //res.cookie.mock.lastcall should return an array of ['SSID', <ssid#>]
  xit('creates a session document in the database', () => {});
  it('creates a cookie with same SSID as database document', () => {
    expect(1).toBe(1);
  });
  xit('after 60 seconds, there is no longer a matching session in the database', () => {});
  xit('proceeds to the next middleware', () => {});
});

// VerifySSID: test that if there is no session that this fails
// then create a session (before all) and make sure that passes
// Then check after a certain amount of time and make sure it expired
