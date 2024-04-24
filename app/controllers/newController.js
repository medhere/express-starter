const Validator = require('validatorjs');
const fs = require('fs-jetpack')

exports.m = async(req,res) =>{
    // let validation = new Validator(req.body,{
    //     email: 'required|email',
    // })

    // if(validation.fails()){
    //     res.status(401).send(validation.errors.all())
    // }else{

    // }

    // try{ res.send(await conn('')) } 
    // catch(err){ res.status(400).send(err.code) } 
    res.send('we are live');   
}


//form example
const from = (req,res) => {
    console.log(req.files)
    //if multer.any()
    // files=req.files

    // if multer.fields([{name:'documents',maxCount:1}, ...])
    if(req.files?.documents){
        var files=req.files.documents
            if(Array.isArray(files)){
                files.map((file,index)=>{
                    var { originalname, destination, filename, size, mimetype } = file
                    var thisfile=destination+'/'+filename 
                    var name =originalname.split('.')[0]
                    var ext = mimetype.split('/')[1]
                    fs.moveAsync(thisfile, process.cwd() + '/uploads/files' + ext, {overwrite: true})
                    fs.remove(thisfile)
                })
            }else{
                var { originalname, destination, filename, size } = file
                var thisfile=destination+'/'+filename 
                var name =originalname.split('.')[0]
                var ext = mimetype.split('/')[1]
                fs.moveAsync(path, process.cwd() + '/uploads/files' + ext, {overwrite: true})
                fs.remove(thisfile)
            }
            res.send('recieved')
        }else{
            res.send('no file sent')
        }

}