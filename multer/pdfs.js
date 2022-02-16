const {v4: uuidv4} = require('uuid')
//lo uso para extraer la extensionde la img::
const path = require('path');
//modulo paara subir img:
const multer = require('multer');
//configuracion para usar dentro del midleware multter:
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve(__dirname,"../../public_html/assets/img/PDFS"))
    },
    filename: (req, file, cb)=>{
        const filT = /pdf/;
        const mimeT =  filT.test(file.mimetype);
        const extname = filT.test(path.extname(file.originalname));
        if(mimeT && extname){
            return cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
        }
        cb('Error')
    }
});

const archivopdf = multer({storage});

exports.archivopdf = archivopdf.single('video_noticia')
