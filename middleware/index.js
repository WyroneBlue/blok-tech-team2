const { loggedIn, guest } = require('./authorization');
const viewCounter = require('./viewCounter');

module.exports = {
    loggedIn: loggedIn,
    guest: guest,
    viewCounter: viewCounter,
}