var db=require("./db.js")
var mongoose=require("mongoose")

var lingdaoSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    psw:{
        type:String,
    },

})
//连接到collection集合//领导的
var lingdaoModel=mongoose.model("lingdao",lingdaoSchema,"lingdao");

module.exports = lingdaoModel;