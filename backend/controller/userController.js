const User = require('../models/userModel')
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const {createToken,verifyToken} = require('../utils/jwt')

const login = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        const userExist = await User.findOne({
            where:{
                email:email
            }
        }) 
        if(userExist?.dataValues){
            if(userExist.dataValues.isBlocked){
                const error = new Error('You are temporarily suspended. Please contact officials.')
                error.statusCode = 403
                throw error
            }else{
                const matched = await bcrypt.compare(password,userExist.dataValues.password)
                if(matched){
                    const token =await createToken(userExist.dataValues.id)
                    const userPass = {
                        id:userExist.dataValues.id,
                        name:userExist.dataValues.name,
                        email:userExist.dataValues.email,
                        mobile:userExist.dataValues.mobile,
                        image:userExist.dataValues.image
                    }
                    if(token){
                        res.status(200).json({success:{token:token,data:userPass}});
                    }
                }else{
                const error = new Error('Invalid Credentials!!')
                error.statusCode = 400
                throw error
                }
            }
        }else{
            const error =  new Error('Invalid User!!')
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        console.log("log"+error.message);
        next(error)
    }
}

const signup = async (req,res,next)=>{
    try {
        const {name,email,mobile,password,cpassword} = req.body
        if(password === cpassword){
            const userExist = await User.findAll({
                where:{
                    email:email,
                }
            })
            if(userExist.length === 0){
                const hashedPassword = await bcrypt.hash(password,10)
                const userInsert = await User.create({
                    id:uuidv4(),
                    name,
                    email,
                    mobile,
                    password:hashedPassword
                })
                console.log(userInsert.dataValues);
                res.json({success:'Registered'})
            }else{
                throw new Error('Account Exists!!');
            }
            
        }else{
            throw new Error('Incorrect Password');
        }
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}

const profileUpdate = async (req,res,next)=>{
    try {
        console.log(req.body);
        console.log(req.file);
        console.log(req.user);
        if(req.file){
        const proImageName = 'http://localhost:3000/assets/'+req.file.filename
         await User.update({name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            image:proImageName},{
            where:{
                id:req.user
            }
        });
        }else{
            await User.update({name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,},{
                where:{
                    id:req.user
                }
            });
        }
        const udata = await User.findOne({where:{id:req.user}})
        console.log(udata.dataValues);
        const user = {
            name:udata.dataValues.name,
            email:udata.dataValues.email,
            mobile:udata.dataValues.mobile,
            image:udata.dataValues.image
        }
        res.status(200).json({success:user})
    } catch (error) {
        console.log(error);
        next(error)
    }
}



module.exports = {
    login,
    signup,
    profileUpdate,
}