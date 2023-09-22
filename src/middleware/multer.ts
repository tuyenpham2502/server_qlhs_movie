import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, './public/FileStorage');
    },
    filename : function (req, file , cb){
        // image.jpg
       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    let ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        cb(new Error('File type is not supported'), false);
        return;
    }
    cb(null, true);
}


const store = multer({ storage : storage, fileFilter: fileFilter});

export default store;
