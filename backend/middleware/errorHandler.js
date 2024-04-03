const errorHandler = (err,req,res,next)=>{
    console.log('err');
    res.status(err.statusCode ? err.statusCode : 500).json({error:err.message || 'Internal Server Error!!'})
}

module.exports = {errorHandler}