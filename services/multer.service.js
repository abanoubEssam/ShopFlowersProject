const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req , file , cb) {
        cb(null , './uploads');
    },
    filename: function (req , file , cb) {
        cb(null , file.originalname);
    }
});

const fileFilter = (req , file , cb) => {
 // reject a file
 if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
     cb(null , true);
 }else{
     cb(new Error('sorry this is not image'));
     
 }
}

const uploadIt = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
    });
exports.upload = uploadIt;