var db=require("./db.js")
var mongoose=require("mongoose")

var teacherSchema=new mongoose.Schema({
    nameNumber:{ //教师工号
        type:String
    },
    name:{  //姓名
        type:String,
    },
    job:{   //密码
        type:String,
    },
    phoneNumber:{   //联系电话
        type:String,
    },
    admin:{ //登陆的用户名
        type:String,
    },
    psw:{   //密码
        type:String,
    }
})
//连接到collection集合//领导的
var teacherModel=mongoose.model("teacher",teacherSchema,"teacher");

module.exports = teacherModel;