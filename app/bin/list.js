var db=require("./db.js")
var mongoose=require("mongoose")

var listSchema=new mongoose.Schema({
    address:{ //实验地址
        type:String
    },
    name:{  //实验室名称
        type:String,
    },
    listnumber:{   //设备数量
        type:String,
    },
    listZT:{   //设备状态
        type:String,
    },
    person:{ //联系人
        type:String,
    },
    state:{//实验室状态
        type:Array,
    }
})

var listModel=mongoose.model("list",listSchema,"list");

module.exports = listModel;