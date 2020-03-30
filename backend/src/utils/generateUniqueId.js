const crypto = require('crypto');

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');//Vai gerar 4 bytes de caracteres hexadecimais que vai virar um id
}