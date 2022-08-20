const crypto = require('crypto')

exports.UID = (count = 5) => { return crypto.randomBytes(count).toString('hex')}

exports.encrypt = (text) =>{
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.CRYOTO_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    //return {iv: iv.toString('hex'),content: encrypted.toString('hex')};
    return iv.toString('hex')+'::'+encrypted.toString('hex');
}


exports.decrypt = (text) =>{
    // if array, replace hasharrar with text.iv and text.content
    hasharray=text.split('::');
    const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.CRYOTO_KEY, Buffer.from(hasharray[0], 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hasharray[1], 'hex')), decipher.final()]);
    return decrpyted.toString();
}

exports.crypto={
    encrypt(text){
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', process.env.CRYOTO_KEY, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        //return {iv: iv.toString('hex'),content: encrypted.toString('hex')};
        return iv.toString('hex')+'::'+encrypted.toString('hex');
    },
    decrypt(text){
        // if array, replace hasharrar with text.iv and text.content
        hasharray=text.split('::');
        const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.CRYOTO_KEY, Buffer.from(hasharray[0], 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hasharray[1], 'hex')), decipher.final()]);
        return decrpyted.toString();
    }
}
