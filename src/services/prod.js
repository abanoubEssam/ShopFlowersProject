import compression from 'compression';
import helmet from 'helmet';


module.exports = function (app) {
    app.use(helmet())
    app.use(compression())
    
}