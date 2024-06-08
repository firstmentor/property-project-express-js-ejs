const mongoose= require('mongoose')
const url= "mongodb://127.0.0.1:27017/apartmenthouse"
const connectdb=()=>{
    return mongoose.connect(url)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports=connectdb