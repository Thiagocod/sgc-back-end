import multer from 'multer';
import path from "path";


export function postImage (){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'images');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)); // Adiciona timestamp ao nome do arquivo
        }
      });
    const upload = multer ({storage: storage});

    return upload

}

export default postImage