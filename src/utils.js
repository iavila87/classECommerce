import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { fakerES as faker } from '@faker-js/faker';

export const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
	    description: faker.commerce.productName(),
	    code: faker.random.numeric(1),
	    price: faker.commerce.price(),
	    status: true,
	    stock: faker.random.numeric(1),
	    id: faker.database.mongodbObjectId()

    }
}

export const JWT_PRIVATE_KEY = 'claveSecreta';
export const JWT_COOKIE_NAME = 'myCookie'

// funciones helpers
//pass
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
//token
export const generateToken = user => jwt.sign({ user }, JWT_PRIVATE_KEY, {expiresIn: '24h'});
export const extractCookie = req => (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null;

export const passportCall = strategy => {
    return async ( req, res, next ) => {
        passport.authenticate( strategy, function( err, user, info ){
            if (err) return next(err);
            //if (!user) return res.status(401).render('error/base', {error: info.message})
            if (!user) return res.status(401).send('<h1>Error</h1>');
            req.user = user
            next();
        })(req,res,next)
    }
}

export const handlePolicies = policies => (req, res, next) => {
    const user = req.user.user || null;
    if( !policies.includes(user.role.toUpperCase()) ) 
    {
        return res.status(403).send('<h1>Error: Need Auth</h1>');
    }

    return next();
}

// generador de string random de longitud 'num'
export const generateRandomString = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    })
        .join('')
        .toUpperCase();
}