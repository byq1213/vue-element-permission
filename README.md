<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

#### 权限管理

 >  [原框架地址](https://github.com/PanJiaChen/vueAdmin-template)

##### 登录返回 roles

 > 超级管理员拥有所有页面权限 返回 ``` { roles :[ 'admin]}```

 ```json
 {
    "code": 200,
    "data": {
      "roles":[ "test2", "test3", "permissionManage" ],
      "name": "admin",
      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    }
  }
 ```
##### 路由设置
 > 父级目录不添加 ```name```，
 >子级目录必须添加 ```name```。