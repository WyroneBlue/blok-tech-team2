const { loggedIn, guest } = require('./authorization');
const sessionWrap  = require('./socket');
const viewCounter = require('./viewCounter');

module.exports = {
    loggedIn: loggedIn,
    guest: guest,
    wrap: sessionWrap,
    viewCounter: viewCounter,
}