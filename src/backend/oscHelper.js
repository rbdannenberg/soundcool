var _socket;
var _sockets = [];
var _portList = [];
exports.getName = function() {
  // return _socket ? _socket : false;
  return _sockets ? _sockets : false;
};

exports.setName = function(socket) {
  _socket = socket;
  _sockets.push(socket);
};

exports.getPortList = function() {
  return _portList ? _portList : false;
};

exports.addPort = function(port) {
  _portList.push(port);
};
