import jwt from 'jsonwebtoken';
export default {
    async Login(req, res) {
        console.log(req.user);
        const token = jwt.sign({sub: req.user._id} , 'jwtPrivateKey');
        let respo = {
            user: req.user,
            accessToken: token
        }
        res.send(respo);
    }


}