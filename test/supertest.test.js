import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080/');

describe('Testing Proyecto', ()=>{
    describe('Test Ruta api/sessions/register', ()=>{
        it('El endpoint POST api/sessions/register debe registar un usuario', async ()=>{
            const userMock = {
                first_name: "FName1",
                last_name: "LName1",
                email: "FName1@LName1.com",
                age: 30,
                password: "1234",
            }

            const response = await requester.post('api/sessions/register').send(userMock);
            const {status,ok,_body} = response;
            expect(status).to.be.equal(302);
            //expect(_body).to.have.property('_id');
        });

        it('El endpoint POST api/sessions/register no debe registar un usuario', async ()=>{
            const userMock = {}

            const response = await requester.post('api/sessions/register').send(userMock);
            const {status,ok,_body} = response;
            expect(ok).to.be.equal(false);
            //expect(_body).to.have.property('_id');
        });

    } );
    //after();

    describe('Test Ruta api/products/', ()=>{
        it('El endpoint GET api/products/ debe devolver todos los productos', async ()=>{
            
            const response = await requester.get('api/products/');
            const {status,ok,_body} = response;
            expect(_body.payload).to.be.ok
            //expect(status).to.be.equal(200);
            //expect(_body).to.have.property('_id');
        });

        it('El endpoint POST api/products/ no debe agregar un producto', async ()=>{
            const productMock = {}

            const response = await requester.post('api/products/').send(productMock);
            const {status,ok,_body} = response;
            expect(ok).to.be.equal(false);
            //expect(_body).to.have.property('_id');
        });

    } );


    describe('Test Ruta api/carts/', ()=>{
        it('El endpoint POST api/carts/ debe crear un carrito vacio', async ()=>{
            
            const response = await requester.post('api/carts/');
            const {status,ok,_body} = response;
            expect(_body.payload).to.be.ok
            //expect(status).to.be.equal(200);
            //expect(_body).to.have.property('_id');
        });

    } );

} );