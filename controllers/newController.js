
const newUser = (req, res) => {

}

const findUser = (req, res) => {
    

}

//form example
const from = (req,res) => {
    if(req.files?.file){
    var files=req.files.file
        if(Array.isArray(files)){
            files.map((file,index)=>{
                var { originalname, destination, filename, size }=file,
                path=destination+'/'+filename, [name,ext]=originalname.split('.')
        
                // fs.unlink(file.path,(err) => console.log(err));        
            })
        }else{
            var { originalname, destination, filename, size }=files,
            path=destination+'/'+filename, [name,ext]=originalname.split('.')

            // fs.unlink(files.path,(err) => console.log(err));
        }
        res.send('recieved')
    }else{
        res.send('no file sent')
    }

}


module.exports =  {
    newUser,
    findUser
};