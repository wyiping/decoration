var app = require('./server/bin/app')

// 用户路由
app.use('/', require('./server/router/user'))

// 监听端口
app.listen(3500, () => console.log('启动成功，端口3500.'))