var  mysql = require('../../db/mysql');
var  uid = require('../../utils/uuid');//用于生成id
var tableName = "userinfo";

function  User(user) {
    this.username = user.username;
    this.password = user.password;
}
module.exports = User;

//新增用户
User.prototype.addUser = function addUser(callback) {
    // 用户对象
    var  user = {
        username: this.username,
        password: this.password
    };
    var uuid = uid.v4();
    //插入数据库
    var sql ="insert into userinfo (id, username, password) values(?,?,?)";

    mysql.execQuery(sql, [uuid, user.username, user.password], function(err, results, fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};

//根据ID修改用户
User.prototype.updateUser = function updateUser(userid, callback) {
    // 用户对象
    var  user = {
        username: this.username,
        password: this.password
    };
    //插入数据库
    var sql ="update userinfo set username='"+user.username+"', password='"+user.password+"' where id='"+userid+"'";

    mysql.execQuery(sql, null, function(err, results, fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, userid, fields);
        }
    });
};

//根据用户名获取用户
User.getUserByName = function getUserByName(username, callback) {
    var sql = "select c.id, c.username, c.password from userinfo c where c.username='"+username+"'";
    mysql.execQuery(sql, null, function(error, results, fields){
        if(error){
            throw error;
        }else{
            return callback(error, results[0], fields);
        }
    })
};

//根据查询参数获取用户列表数据
User.getUserList = function getUserList(queryparam, callback) {
    var sql = "select * from userinfo";
    mysql.execQuery(sql, null, function(error, results, fields){
        if(error){
            throw error;
        }else{
            return callback(error, results, fields);
        }
    })
};

//根据用户ID删除用户
User.deleteUser = function deleteUser(id, callback) {
    var sql = "delete from userinfo where id='"+id+"';";
    mysql.execQuery(sql, null, function(error, results, fields){
        if(error){
            throw error;
        }else{
            return callback(error, results, fields);
        }
    })
};

