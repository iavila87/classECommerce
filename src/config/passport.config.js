import passport from "passport";
import local from 'passport-local'
import usersModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
    
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        // logica
        const { first_name, last_name, email, age } = req.body;
        try{
            const user = await usersModel.findOne({ email: username });
            if(user){ // verifica si existe el usuario
                return done(null, false); // null se usa para indicar errores y false por ya existe el usuario
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            const result = await usersModel.create(newUser);
            return done(null, result);

        }catch(error){
            return done( {status: 'error', error: error.message} );
        }
    }));


    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try{
            const user = usersModel.findOne({email: username});

            if(!user){
                return done(null,false);
            }

            if(!isValidPassword(user, password)){
                return done(null, false);
            }

            return done(null, user);

        }catch(error){

        }
    }));


    passport.serializeUser( (user,done) =>{
        done( null, user._id );
    });

    passport.deserializeUser(async (id, done) =>{
        const user = await usersModel.findById(id);
        done(null,user);
    });


}

export default initializePassport;