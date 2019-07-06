import config from 'config'
import jwt from 'jsonwebtoken';


export default {
    async Login(req, res) {
        const token = jwt.sign({id: req.user._id } , config.get('jwtPrivateKey'));
        let respo = {
            user: req.user,
            accessToken: token
        }
        res.send(respo);
    }


}