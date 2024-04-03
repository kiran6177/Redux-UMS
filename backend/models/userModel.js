const {DataTypes} = require('sequelize');

const {sequelize} = require('../config/config')

const User = sequelize.define('user',{
    id:{
        type:DataTypes.STRING,
        allowNull:false, 
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        defaultValue:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZLVQWm0gocTw1yyhcV1sEMyfrenm4uYHF1HeYmZtq6g&s'
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mobile:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    isBlocked:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports = User
