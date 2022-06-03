const { validationResult } = require("express-validator");
const rethinkdb = require("rethinkdb");
const { DB } = require("../db");
const { comparePassword, generateToken, hashPassword } = require("../helpers");

const loginUsers = async(req,res,next)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error("login users");
            error.data = errors.array()
            error.statusCode = 422;
            throw error
        }
        else{
            DB.then(conn=>{
                rethinkdb.table('users').filter({email:req.body.email}).run(conn,(err,result)=>{
                    if(err) throw err;
                    if(result){
                        result.toArray().then(user=>{
                            if(user.length===1){
                              const existedUser = user[0]
                              const correctPassword = comparePassword(req.body.password,existedUser.password)
                              if(correctPassword){
                                  const accessToken = generateToken(existedUser);
                                  res.status(200).json({
                                      accessToken:accessToken,
                                      message:"success"
                                  })
                              }

                            }
                        })
                    }
                })
            })
        }
    } catch (error) {
            next(error)
    }
}

const signupUsers = async (req,res,next)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = new Error("Signup users");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else{
            DB.then(conn=>{
                rethinkdb.table("users").insert({
                    email:req.body.email,
                    password:hashPassword(req.body.password)
                })
            })
        }
    } catch (error) {
          next(error)  
    }
}

module.exports ={loginUsers,signupUsers}