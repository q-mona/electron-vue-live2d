# electron-vue-live2d
## 简介  
本项目是由electron+vue实现的桌面版live2d  
由于是边学习electron边写的并且爆肝两天的成品所以bug可能有很多  
win10运行还是比较正常的，不知道mac上怎么样=。= 谁叫我没钱买mac呢
## 源码使用
### 初始化
```
npm install
```
### 编译
```
npm run electron:serve
```
### 打包
```
npm run electron:build
```
### 修改默认配置
#### 修改互动内容
可以到asserts/js/message.js中随意修改
#### 添加或删除live2d
由于没完善electron读取本地文件的操作 只好改源代码导入live2d了  
##### 添加
1.将你的资源放到public/live2d的目录下面  
2.再将你的live2d信息写入asserts/js/liv2dPath.js  
```
// 此处为血小板live2d的例子
  {
    name: '血小板',
    path: 'live2d/live2d-widget-model-plt/assets/plt.model.json'
  }
```
其中name是显示的昵称(可随意) path是你模型的json文件  
此处为血小板live2d的json文件格式参考
```
{
    "version":"1.0.0",
    "model":"model.moc",
    "textures":[
        "textures/xxb.png"
    ],
    "layout":{
        "center_x":0.0,
        "center_y":-0.05,
        "width":2.0
    },
    "hit_areas_custom":{
        "head_x":[-0.35, 0.6],
        "head_y":[0.19, -0.2],
        "body_x":[-0.3, -0.25],
        "body_y":[0.3, -0.9]
    },
    "motions":{
        "idle":[    
            {"file": "motions/Idle.mtn"},
            {"file": "motions/Dance.mtn"},
            {"file": "motions/Anone_Synced.mtn"},
            {"file": "motions/Nemui.mtn"}
        ],
        "sleepy":[
            {"file": "motions/Nemui.mtn"}
        ],
        "flick_head":[
            {"file": "motions/Anone_Synced.mtn"}
        ],
        "tap_body":[
            {"file": "motions/Dance.mtn"}
        ],
        "":[]
    }
}

```
##### 删除
1.将public/live2d的资源删除   
2.再asserts/js/liv2dPath.js中的信息删除
