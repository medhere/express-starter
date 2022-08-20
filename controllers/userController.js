const { conn } = require('../app/config');
const Validator = require('validatorjs');
const fs=require('fs-jetpack');
const axios = require('axios')
// TODO: var escapeHtml = require('escape-html')

exports.getUserInfo = async(req,res) =>{
    try{ res.send(await conn('users').where('id', req.user.id).first())}
    catch(err){ res.status(400).send(err.code) }
}

exports.updateUserInfo = (req,res) =>{
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

exports.createRequest = async(req,res) =>{    
    try{ 
        await conn('requests').insert({...req.body, user_id:req.user.id, created_at: new Date()})
        res.send('New Request Created') 
        const user = await conn('users').where({id: req.user.id}).first()
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

exports.getUserRequests = async(req,res) =>{    
    try{ res.send(await conn('requests').where('user_id',req.user.id).orderBy('id', 'desc')) } 
    catch(err){ res.status(400).send(err.code) }
}

exports.deleteUserRequest = async(req,res) =>{
    try{ 
        await conn('requests').where({id:req.params.id, user_id:req.user.id}).del()
        await conn('comments').where({request_id:req.params.id, user_id:req.user.id}).del()
        await conn('payments').where({request_id:req.params.id, user_id:req.user.id}).del()
        fs.removeAsync(process.cwd()+'/server/uploads/files/'+req.params.id)
        res.send('All Request Data Deleted')
    } 
    catch(err){ res.status(400).send(err.code) }
}

exports.getSingleUserRequest = async(req,res) =>{
    const request = await conn('requests').where('requests.id', req.params.id)
    console.log(request)
    if(request.length > 0){
        try{
            res.send({
                request: await conn('requests').where({id:req.params.id, user_id:req.user.id}).first(),
                comments: await conn('comments').where({request_id:req.params.id, user_id:req.user.id, visible: '1'}).select('comment','title','created_at'),
                payments: await conn('payments').where({request_id:req.params.id, user_id:req.user.id}).join('users', {'users.id': 'payments.user_id'}).select('payments.id','payments.reason','payments.amount','payments.paid_at','payments.paid_by','payments.created_at','users.firstname','users.lastname','users.email','users.phonenumber'),
                docs: await fs.inspectTreeAsync(process.cwd() + `/server/uploads/files/${req.params.id}`, {times:false, relativePath:true}),
                admin: await conn('users').where({user_type: 'admin'}).first().select('phonenumber','email')
            })
        }catch(err){ res.status(400).send(err.code) }
    }else{
        res.status(400).send('No Request')
    }
}


exports.userGetPayments = async(req,res) => {
    try{ 
        res.send(await conn('payments')
        .where({'payments.user_id': req.user.id})
        .join('requests', {'requests.id': 'payments.request_id'})
        .select('payments.id','payments.reason','payments.amount','payments.paid_at','payments.paid_by','payments.created_at','requests.id as request_id','requests.request_type','requests.created_at as request_date')
        .orderBy('payments.id','desc')) 
    }
    catch(err){ res.status(400).send(err.code) }
}


exports.getSinglePayment = async(req,res) => {
    try {res.send(await conn('payments').where({'payments.user_id': req.user.id, 'payments.id': req.params.id}).join('requests', {'requests.id': 'payments.request_id'}).first())} 
    catch (err) { res.status(400).send(err.code) }
}

async function sendVerifyMail(reference){
    const payment = await conn('payments').where({tx_ref: reference}).join('users',{'users.id':'payment.user_id'}).first()
    mailer.sendMail({
        from:'',
        sender:'',
        to:'',
        subject:'',
        html:``
    })
}

exports.verifyPayment = (req,res) =>{
    axios({
        url: `https://api.paystack.co/transaction/verify/${req.body.reference}`,
        method: 'GET',
        headers: {'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
    }).then(payment=>{ 
        if(payment.data.data.status === 'success'){
            conn('payments').update({tx_ref: `${req.body.reference}`, paid_at: new Date(), paid_by: 'User'}).where({id:payment.data.data.metadata.payment_id})
            .then(()=> {
                res.send('Payment Verified')
                sendVerifyMail(req.body.reference)
            })
            .catch(err=> res.send(err))
        }       
    }).catch(err=>{
        console.log(err)
        res.send(`Error Confirming Payment. Ref Code: ${req.body.reference}`)
    })
}


