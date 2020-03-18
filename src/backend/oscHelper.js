var _socket;
var _portList = [];
exports.getName = function() {
  return _socket? _socket : false;
};

exports.setName = function(socket) {
  _socket = socket;
};

exports.getPortList = function() {
  return _portList? _portList : false;
};

exports.addPort = function(port) {
  _portList.push(port);
};