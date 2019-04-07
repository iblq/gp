/**
 * Created by root on 12/2/14.
 */
const crypto = require('crypto');

const DEFAULT_SECRET = 'Westdc is good';

exports.encrypt = (str, secret) => {
    let cipher = crypto.createCipher('aes192', secret || DEFAULT_SECRET);
    if (typeof str !== 'string') {
        str = str.toString();
    }
    let enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

exports.decrypt = (str, secret) => {
    try {
        let decipher = crypto.createDecipher('aes192', secret || DEFAULT_SECRET);
        let dec = decipher.update(str, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    catch (e){
        console.log(e);
        return null;
    }
};

exports.md5 = (str) =>  {
    return crypto.createHash('md5').update(str).digest('hex');
};

exports.randomString = (size) => {
    size = size || 6;
    let code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let max_num = code_string.length + 1;
    let new_pass = '';
    while (size > 0) {
        new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
        size--;
    }
    return new_pass;
};