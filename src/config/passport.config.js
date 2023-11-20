import passport from "passport";
import passport_jwt, { Strategy } from 'passport-jwt' 
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import usersModel from "../dao/models/users.model.js";
import { JWT_PRIVATE_KEY, createHash, extractCookie, generateToken, isValidPassword } from "../utils.js";
import cartsModel from "../dao/models/carts.model.js";

const localStrategy = local.Strategy;
const JWTStrategy = passport_jwt.Strategy;

import { UsersService, CartsService } from '../repositories/index.js'

const initializePassport = () => {
    
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async(req, username, password, done) => {
        // logica
        const { first_name, last_name, email, age } = req.body;
        try{
            console.log("passport");
            const user = await UsersService.get(username);
            console.log("passport user: " + JSON.stringify( user ));
            if(user){ // verifica si existe el usuario
                return done(null, false); // null se usa para indicar errores y false por ya existe el usuario
            }

            const cartForNewUser = await CartsService.create();

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: cartForNewUser._id,
                role: (email === 'adminCoder@coder.com') ? 'admin' : 'user'
            }

            const result = await UsersService.create(newUser);
            return done(null, result);

        }catch(error){
            return done( {status: 'error', error: error.message} );
        }
    }));


    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try{
            console.log("username: "+ username + " pass " + password)
            const user = await UsersService.get(username); //await usersModel.findOne({email: username});
            console.log("user login " +JSON.stringify(user));
            if(!user){
                return done(null,false);
            }

            if(!isValidPassword(user, password)){
                return done(null, false);
            }

            //genero el token
            const token = generateToken(user);
            user.token = token;

            return done(null, user);

        }catch(error){

        }
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: passport_jwt.ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY
    }, async (jwtPayload, done) =>{
        done(null, jwtPayload)
    } ) );

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.392a5bdd41d2ea18',
        clientSecret: '088a4486b4e6f64aaae17e7652c9fcb4fb695aec',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        
        try{
            const user = await UsersService.get(username);//await usersModel.findOne({email:profile._json.email});
            if(user) return done(null,user);

            const newUser = await UsersService.create({ //await usersModel.create({
                first_name:profile._json.name,
                last_name:'',
                email:profile._json.email,
                password:''
            });
            
            done(null,newUser);

        }catch(error){
            return done('Error to login with github');
        }
        
    }));


    passport.serializeUser( (user,done) =>{
        done( null, user._id );
    });

    passport.deserializeUser(async (email, done) =>{
        const user =  await UsersService.get(email);//await usersModel.findById(id);
        done(null,user);
    });


}

export default initializePassport;