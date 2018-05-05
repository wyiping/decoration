const multer = require('multer')

function getType(obj){
    var index=obj.lastIndexOf(".");
    obj=obj.substring(index+1,obj.length);
//  console.log(obj);
    return obj;
}

var storage = multer.diskStorage({
    // 设置上传后的文件目录为upload，该目录会自动创建
    destination: './static/user',
    filename: function (req, file, cb) {
        cb(null,String(Math.random() * 10).replace('.','')  +'.' + getType(file.originalname))
    }
})

var upload = multer({storage})

module.exports = upload;