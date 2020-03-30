const generateUniqueId = require('../../src/utils/generateUniqueId');//Tenho sempre que importar o arquivo que vou fazer o teste

describe('Generate Unique ID', ()=>{
    it('should generate unique ID', ()=>{//O determinada coisa deve fazer
        const id = generateUniqueId();
        expect(id).toHaveLenght(8);//espero que o id tenha 8 caracteres
    });
});