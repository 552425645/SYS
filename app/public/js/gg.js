$(function(){
// 登陆的代码，选项卡
$(".inputHeader a").click(function () { 
    $(this).addClass("active").siblings().removeClass("active");
    $(".inputContent>div").eq($(this).index()).show().siblings().hide()
});

// 表单验证
// 登陆页面




//老师添加页面的大型选项卡
$(".title-xiangqing").click(function () { 
    $(this).addClass("active").siblings().removeClass("active");
    $(".xiangqing-content>ul").eq($(this).index()).show().siblings().hide()
});
})