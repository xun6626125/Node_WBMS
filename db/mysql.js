var options = {
    'dbhost': '172.172.21.8',
    'port': '3306',
    'user': 'root',
    'password': '1234',
    'database': 'nodedb'
    //'charset': config.charset,
    //'connectionLimit': config.maxConnLimit,
    //'supportBigNumbers': true,
    //'bigNumberStrings': true
};

var mysql = require('mysql');
var pool = mysql.createPool(options);

/**
 * 释放数据库连接
 */
exports.release = function(connection) {
    connection.end(function(error) {
        console.log('Connection closed');
    });
};

/**
 * 执行查询
 */
exports.execQuery = function(sql, args, callback) {
    pool.getConnection(function(error, connection) {
        if(error) {
            console.log('DB-获取数据库连接异常！');
            throw error;
        }

        // 执行查询
        if(!args) {
            var query = connection.query(sql, function(error, results, fields) {
                if(error) {
                    console.log('DB-无参执行查询语句异常！- ');
                    callback(error, null, null);
                }
                // 处理结果
                callback(error, results, fields);
            });
            console.log(query.sql);
        } else {
            var query = connection.query(sql, args, function(error, results, fields) {
                if(error) {
                    console.log('DB-有参执行查询语句异常！');
                    callback(error, null, null);
                }
                // 处理结果
                callback(error, results, fields);
            });
            console.log(query.sql);
        }

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                console.log('DB-关闭数据库连接异常！');
                throw error;
            }
        });

    });
};

//exports.execQuery({"sql":"select c.id, c.username, c.password from userinfo c where c.username='aaa'","args":null,"handler":handler});