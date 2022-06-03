const {hashSync,compareSync} = require('bcrypt')
const {sign,verify} = require('jsonwebtoken');
const { jwtSecret } = require('../config');


const hashPassword = (password)=>{
    const hPassword = hashSync(password,12);
    return hPassword
}

const comparePassword = (password,hPassword)=>{
    const verifyPassword = compareSync(password,hPassword)
    return verifyPassword
}

const generateToken = (user)=>{
    const accessToken = sign(user,jwtSecret,{expiresIn:"1d"});

    return accessToken;
}

module.exports ={hashPassword,comparePassword,generateToken}