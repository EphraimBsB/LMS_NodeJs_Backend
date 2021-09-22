import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file,cb) {
        cb(null, './assets')
    },
    filename: function (req, file,cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
 
const fileFilter = (req, file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(new Error('unsuppoted file'), false)
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*10
    },
    fileFilter:fileFilter
});
export default upload;