const Validator = require('validatorjs');
const { conn } = require('../app/config');
const { UID } = require('../app/crypto');
const fs = require('fs-jetpack')
const axios = require('axios')
// TODO: var escapeHtml = require('escape-html')


exports.dashboardData = async(req,res) =>{
    try{ 
        res.send({
            completedPayments: await conn('payments').count({completedPayments:'id'}).where('paid_by','=','').first(),
            uncompletedPayments: await conn('payments').count({uncompletedPayments:'id'}).where({paid_by:''}).first(),
            totalUsers: await conn('users').count({totalUsers:'id'}).first(),
            totalRequests: await conn('requests').count({totalRequests:'id'}).first(),
            completedRequests: await conn('requests').count({completedRequests:'id'}).where({request_status:'Completed'}).first(),
            uncompletedRequests: await conn('requests').count({uncompletedRequests:'id'}).where('request_status','!=','Completed').first(),
            latestUsers: await conn('users').limit(10).orderBy('id', 'desc'),
            latestRequests: await conn('requests')
                .join('users', {'users.id': 'requests.user_id'})
                .limit(10)
                .orderBy('requests.id', 'desc'),
            latestPayments: await conn('payments')
                .join('requests', {'requests.id': 'payments.request_id'})
                .join('users', {'users.id': 'payments.user_id'})
                .limit(10)
                .orderBy('payments.id', 'desc'),
        })
    }
    catch(err){ res.status(400).send(err.code) }
}

exports.getAdminInfo = async(req,res) =>{
    try{ res.send(await conn('users').where('id', req.user.id).first())}
    catch(err){ res.status(400).send(err.code) }
}

exports.updateAdminInfo = (req,res) =>{
    let validation = new Validator(req.body,{
        firstname: 'required',
        lastname: 'required',
        email: 'required|email',
        phonenumber: 'required|min:11',
        address: 'required',
        occupation: 'required',
        gender: 'required',
        dob: 'required'
    })
    if(validation.fails()){
        res.status(401).send(validation.errors.all())
    }else{
    conn('users').update(req.body).where('id', req.user.id)
        .then(() => res.send('Successfully Updated'))
        .catch(err=> res.status(400).send(err.code))
    }
}


exports.getUsers = async(req,res) =>{
    try{ res.send(await conn('users').where('user_type','!=','admin').orderBy('id','desc')) } 
    catch(err){ res.status(400).send(err.code) }
}

exports.updateUser = async(req,res) =>{
    delete req.body.id
    try{ 
        await conn('users').update(req.body).where({id: req.params.id})
        res.send('User Information Updated')
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.resetUserPassword = async(req,res) =>{
    var password = UID(6)
    try{ 
        await conn('users').update({password: password, reset:''}).where({id: req.params.id})
        res.send(password)
        const user = await conn('users').where({id: req.params.id}).first()
        mailer.sendMail({
            from:'',
            sender:'',
            to:'',
            subject:'',
            html:``
        })
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.setUserActivation = async(req,res) =>{
    try{ await conn('users').update(req.body).where({id: req.params.id})
        res.send('Activation Status Changed') 
    } 
    catch(err){ res.status(400).send(err.code) }    
}


exports.deleteUser = async(req,res) =>{
    try{ 
        const requests = await conn('requests').where({user_id:req.params.id})
        if(requests.length > 0){
            requests?.map((request,i)=>{
                fs.removeAsync(process.cwd()+'/server/uploads/files/'+request.id)
            })            
        }
        await conn('users').del().where({id: req.params.id})
        await conn('requests').where({user_id:req.params.id}).del()
        await conn('comments').where({user_id:req.params.id}).del()
        await conn('payments').where({user_id:req.params.id}).del()
        res.send('Succesfully Deleted Data')
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.getRequests = async(req,res) =>{
    try{ 
        res.send(await conn('requests')
        .join('users', {'users.id': 'requests.user_id'})
        .select('requests.id','requests.request_type','requests.request_reason','requests.request_status','requests.created_at','users.firstname','users.lastname')
        .orderBy('requests.id', 'desc')) 
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.updateRequest = async(req,res) =>{
    delete req.body.id
    try{ 
        await conn('requests').update(req.body).where({id: req.params.id})
        res.send('Request Information Updated')
    } 
    catch(err){ res.status(400).send(err.code) }  
}

exports.deleteRequest = async(req,res) =>{
    try{ 
        await conn('requests').where({id:req.params.id}).del()
        await conn('comments').where({request_id:req.params.id}).del()
        await conn('payments').where({request_id:req.params.id}).del()
        fs.removeAsync(process.cwd()+'/server/uploads/files/'+req.params.id)
        res.send('All Request Data Deleted')
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.getUserRequest = async(req,res) =>{
    const request = await conn('requests').where('requests.id', req.params.id)
    if(request.length > 0){
        try{
            res.send({
                request: await conn('requests')
                    .where('requests.id', req.params.id)
                    .join('users', {'users.id': 'requests.user_id'}).first()
                    .select('requests.id','requests.request_type','requests.request_reason','requests.created_at','requests.request_status','users.id as user_id','users.firstname','users.lastname','users.gender','users.occupation','users.email','users.phonenumber','users.address','users.dob','users.created_at'),
                comments: await conn('comments').where({request_id:req.params.id}),
                payments: await conn('payments').where({request_id:req.params.id}),
                docs: await fs.inspectTreeAsync(process.cwd() + `/server/uploads/files/${req.params.id}`, {times:false, relativePath:true}),
            })
        }catch(err){ res.status(400).send(err.code) }
    }else{
        res.status(400).send('No Request')
    }


}

exports.updateRequestStatus = async(req,res) =>{
    try{ 
        await conn('requests').update(req.body).where({id:req.params.id})
        res.send('Request Succesfully Updated')
    } 
    catch(err){ res.status(400).send(err.code) }   
}


exports.addComment = async(req,res) =>{
    try{ res.send(await conn('comments').insert(req.body)) } 
    catch(err){ res.status(400).send(err.code) }    
}

exports.setCommentStatus = async(req,res) =>{
    try{ 
        await conn('comments').update(req.body).where({id:req.params.id})
        res.send('Comments Updated')
    } 
    catch(err){ res.status(400).send(err.code) }   
}

exports.deleteStatus = async(req,res) =>{
    try{
        await conn('comments').where({id:req.params.id}).del()
        res.send('Deleted Status')
    } 
    catch(err){ res.status(400).send(err.code) }    
}

exports.getPayments = async(req,res) =>{
    try{ res.send(await conn('payments')
        .join('requests',{'requests.id': 'payments.request_id'})
        .join('users',{'users.id':'payments.user_id'})
        .select('payments.id','payments.reason','payments.amount','payments.paid_at','payments.paid_by','payments.created_at','requests.id as request_id','requests.request_type','requests.created_at as request_date','users.firstname','users.lastname')
        .orderBy('payments.id','desc')
    )} 
    catch(err){ res.status(400).send(err.code) }
}

exports.getSinglePayment = async(req,res) => {
    try {res.send(await conn('payments').where({'payments.id': req.params.id}).join('requests', {'requests.id': 'payments.request_id'}).first())} 
    catch (err) {res.status(400).send(err.code) }
}


exports.addPayment = async(req,res) =>{
    try{ 
        await conn('payments').insert(req.body)
        res.send('Payment Added') 
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.updatePayment = async(req,res) =>{
    try{ 
        await conn('payments').update(req.body).where({id:req.params.id})
        res.send('Payment Updated')
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.deletePayment = async(req,res) =>{
    try{ 
        await conn('payments').where({id:req.params.id}).del()
        res.send('Delete Payment')
    } 
    catch(err){ res.status(400).send(err.code) }
}