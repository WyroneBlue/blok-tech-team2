const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
module.exports = wrap
