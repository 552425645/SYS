var express = require('express');
var router = express.Router();
var fs=require('fs')
var st=require('silly-datetime')

var url=require('url')

// 引入数据库表
var lingdaoList=require("../bin/lingdao");
var teacherList=require("../bin/teacher.js");
var studentList=require("../bin/admin.js");
var SYSList=require("../bin/list.js");



// var teacherModel=teacherList()

var globalname=null;
var globalzhuangtai=false;
var globaltt=false;
//这是查找修改老师学生的id全局变量
var id=null


var time=st.format(new Date(),"YYYY"+"年"+"MM"+"月"+"DD"+"日")
  var mydate=new Date().getDay()
  var arr=["日","一","二","三","四","五","六"]





//渲染主页面
router.get("/",(req,res)=>{
  res.render("/index.html",dir) 
})


//渲染登陆页面
router.get("/login",(req,res)=>{
  
  res.render("denglu")
})




//领导登陆
router.post("/lingdao",(req,res)=>{
  var body=req.body;
  console.log(body)
  lingdaoList.findOne({"usernumber":body.userNumber},(err,data)=>{
    if(err){
      res.send("账号错误！！！")
    }else{
      console.log(data)
      if(data.psw!=body.psw){
        res.send("密码错误！！！")
      }else{
        teacherList.find({},(err,data)=>{
          globalname=body.userNumber;
          globalzhuangtai=true;
          globaltt=true;
          res.render("领导添加老师管理员.ejs",{
             list: data,
             globalname:globalname,
             globalzhuangtai:globalzhuangtai,
             globaltt:globaltt,
            })
        })
      }
    }
  })
  
})

// 退出登陆
router.get("/tuichu",(req,res)=>{
  globalname=null;
  globalzhuangtai=false;
  globaltt=false;

  res.render("denglu")

})

//领导登陆后教师列表
router.get("/teacherlistaaa",(req,res)=>{

  teacherList.find({},(err,data)=>{
    res.render("领导查看老师列表.ejs",{
      list: data,
      globalname:globalname,
      globalzhuangtai:globalzhuangtai,
      globaltt:globaltt
      })
  }) 
})
//登陆后的学生列表
router.get("/studentlistaaa",(req,res)=>{
  studentList.find({},(err,data)=>{
    res.render("领导查看学生列表.ejs",{ liststu: data,
    globalname:globalname,
    globalzhuangtai:globalzhuangtai,
    globaltt:globaltt
    
    })
  }) 
})



//教师登陆
router.post("/teacherlogin",(req,res)=>{
  var body=req.body;
  teacherList.findOne({"admin":body.admin},(err,data)=>{
    if(err){
      res.send("账号错误！！！")
    }else{
      teacherList.findOne({"psw":body.psw},(err,data)=>{
        if(err){
          res.send("密码错误！！！")
        }else{
          //需要渲染实验室列表
            // res.render("领导添加老师管理员.ejs",{ list: data })
            res.send("登陆成功")

        }
      })
    }
  })

})
//管理员登陆
router.post("/adminlogin",(req,res)=>{
  var body=req.body;
  studentList.findOne({"admin":body.admin},(err,data)=>{
    if(err){
      res.send("账号错误！！！")
    }else{
      studentList.findOne({"psw":body.psw},(err,data)=>{
        if(err){
          res.send("密码错误！！！")
        }else{
          //需要渲染实验室列表，以及可以上传新闻公告列表
            // res.render("领导添加老师管理员.ejs",{ list: data })
            res.send("管理员登陆成功")
        }
      })
    }
  })
})


// 添加教师
router.get("/addteacher",(req,res)=>{
  res.render("添加老师详情.ejs",{
    globalname:globalname,
    globalzhuangtai:globalzhuangtai,
    globaltt:globaltt
  })
})

router.post("/addteacher",(req,res)=>{
  var body=req.body;
  // var

  teacherList.findOne({"nameNumber":body.nameNumber},(err,data)=>{
    if(data!=null){
      res.send("教师已经存在")
    }else{
      var list=new teacherList()
      list.nameNumber=body.nameNumber;
      list.name=body.name;
      list.job=body.job;
      list.phoneNumber=body.phoneNumber;
      list.admin=body.admin;
      list.psw=body.psw;
      list.save((err)=>{
        res.send('<script>alert("是否添加该教师?");location.href="/teacherlistaaa"</script>')
      }) 
    }
  })

})




//添加学生管理员
router.post("/addstudent",(req,res)=>{
  var body=req.body;
  studentList.findOne({"nameNumber":body.nameNumber},(err,data)=>{
    if(data!=null){
      res.send("学生已经存在")
    }else{
      var list=new studentList()
      list.nameNumber=body.nameNumber;
      list.name=body.name;
      list.job=body.job;
      list.phoneNumber=body.phoneNumber;
      list.admin=body.admin;
      list.psw=body.psw;
      list.save((err)=>{
        res.send('<script>alert("添加学生成功");location.href="/studentlistaaa"</script>')
      }) 
    }
  })

})

//教师删除修改
router.get("/changeTlist",(req,res)=>{
    id=url.parse(req.url,true).query.id
    teacherList.findById(id).exec((err,data)=>{
      res.render("修改老师学生.ejs",{
        list:data,
        globalname:globalname,
        globalzhuangtai:globalzhuangtai,
        globaltt:globaltt
      });
    })
})
//修改老师信息
router.post("/changeteacherlist",(req,res)=>{
  var body=req.body;
  teacherList.findById(id).exec((err,data)=>{
    data.nameNumber=body.nameNumber;
    data.name=body.name;
    data.job=body.job;
    data.phoneNumber=body.phoneNumber;
    data.admin=body.admin;
    data.psw=body.psw;
    data.save((err)=>{
      res.send('<script>alert("修改老师成功");location.href="/teacherlistaaa"</script>')
    })
  })
})
//删除老师信息
router.get("/removeTlist",(req,res)=>{
  id=url.parse(req.url,true).query.id;
  teacherList.findById(id).exec((err,data)=>{
    data.remove((err)=>{
      res.send('<script>alert("删除老师成功");location.href="/teacherlistaaa"</script>')
    })
  })
})




//学生删除修改
router.get("/changeSlist",(req,res)=>{
  id=url.parse(req.url,true).query.id
  studentList.findById(id).exec((err,data)=>{
    res.render("修改学生.ejs",{
      list:data,
      globalname:globalname,
      globalzhuangtai:globalzhuangtai,
      globaltt:globaltt
    });
  })
})
//修改老师信息
router.post("/changestudentlist",(req,res)=>{
var body=req.body;
studentList.findById(id).exec((err,data)=>{
  data.nameNumber=body.nameNumber;
  data.name=body.name;
  data.job=body.job;
  data.phoneNumber=body.phoneNumber;
  data.admin=body.admin;
  data.psw=body.psw;
  data.save((err)=>{
    res.send('<script>alert("修改学生管理员成功");location.href="/studentlistaaa"</script>')
  })
})
})
//删除老师信息
router.get("/removeSlist",(req,res)=>{
id=url.parse(req.url,true).query.id;
studentList.findById(id).exec((err,data)=>{
  data.remove((err)=>{
    res.send('<script>alert("删除学生成功");location.href="/studentlistaaa"</script>')
  })
})
})

// 搭建实验室列表   固定页面


router.get("/List",(req,res)=>{
  SYSList.find({},(err,data)=>{
    res.render("实验室列表.ejs",{list:data})
  })

})
// 渲染预约的实验室
router.get("/yuyue",(req,res)=>{
  id=url.parse(req.url,true).query.id
  SYSList.find({"_id":id},(err,data)=>{
   res.render("预约实验室.ejs")
})

})




module.exports = router;
