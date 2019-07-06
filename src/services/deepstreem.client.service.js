const deepstream = require('deepstream.io-client-js');
const dsClient = deepstream('localhost:6020');

dsClient.login();

export default dsClient

// ds.event.emit( '/provider/id', userData );

