var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wangwenhao', { useNewUrlParser: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('数据库连接成功')
    }
});
module.exports=mongoose;