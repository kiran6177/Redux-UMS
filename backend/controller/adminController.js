const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const {createToken} = require('../utils/jwt');
const {v4:uuidv4} = require('uuid');

const login = async (req,res,next)=>{
    try {
        console.log(req.body);
        const findAdmin = await User.findOne({
            where:{
                email:req.body.email,
                isAdmin:true
            }
        })
        if(findAdmin){
            const verified = await bcrypt.compare(req.body.password,findAdmin.dataValues.password);
            if(verified){
                const token = await createToken(findAdmin.dataValues.id)
                const adminData = {
                    name:findAdmin.dataValues.name,
                    email:findAdmin.dataValues.email,
                    mobile:findAdmin.dataValues.mobile,
                    age:findAdmin.dataValues.age,
                    image:findAdmin.dataValues.image
                }
                res.status(200).json({token,adminData})
            }else{
                const error = new Error('Invalid Password.');
                error.statusCode = 403
                throw error
            }
        }else{
            const error = new Error('Invalid Credentials.');
            error.statusCode = 403
            throw error
        }

    } catch (error) {
        console.log(error.message);
        next(error)
    }
}

const getUsers = async(req,res,next)=>{
    try {
        const users = await User.findAll({
            where:{
                isAdmin:false
            }
        })
        const userData = users.map((user)=>{
           return{
            id:user.dataValues.id,
            name:user.dataValues.name,
            email:user.dataValues.email,
            mobile:user.dataValues.mobile,
            age:user.dataValues.age,
            isBlocked:user.dataValues.isBlocked,
            image:user.dataValues.image
           } 

        })
        if(userData.length > 0){
            res.status(200).json({userData})
        }else{
            res.status(200).json({userData})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const editUser = async (req,res,next)=>{
    try {
        const {id,name,email,mobile,age} = req.body
        let data
        if(req.file){
            data = {
                name,
                email,
                mobile,
                age,
                image:'http://localhost:3000/assets/'+req.file.filename
            }
        }else{
            data = {
                name,
                email,
                mobile,
                age
            }
        }
        const edited = await User.update(data,
            {where:{
                id:id
            }})
         const user = await User.findOne({where:{id:id}})
         const usertoPass = {
            id:user.dataValues.id,
            name:user.dataValues.name,
            email:user.dataValues.email,
            mobile:user.dataValues.mobile,
            age:user.dataValues.age,
            isBlocked:user.dataValues.isBlocked,
            image:user.dataValues.image
         }
         console.log(usertoPass);
         res.status(200).json({user:usertoPass});
        } catch (error) {
        console.log(error);
        next(error)
    }
}

const blockUnblock = async(req,res,next)=>{
    try {
        const {id} = req.query
        const userFind = await User.findOne({where:{id:id}})
        await User.update({
            isBlocked:!userFind.dataValues.isBlocked,
        },{where:{id:id}})
        res.status(200).json({message:!userFind.dataValues.isBlocked,id})
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const deleteUser = async(req,res,next)=>{
    try {
        const {id} = req.query
        await User.destroy({
            where:{id:id}
        })
        res.status(200).json({message:'Deleted',id})
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const createUser = async (req,res,next)=>{
    try {
        const {name,email,mobile,age,password} = req.body
        const hashed = await bcrypt.hash(password,10)
        const create = await User.create({
            id:uuidv4(),
            name,
            email,
            mobile,
            age,
            password:hashed
        })
        const udata = {
            id:create.dataValues.id,
            name:create.dataValues.name,
            email:create.dataValues.email,
            mobile:create.dataValues.mobile,
            age:create.dataValues.age,
            isBlocked:create.dataValues.isBlocked,
            image:create.dataValues.image
        }
        res.status(200).json({user:udata});
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    login,
    getUsers,
    editUser,
    blockUnblock,
    deleteUser,
    createUser
}