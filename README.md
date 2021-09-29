## electron-vue3-live2d
此项目为用vue3、electron实现的桌面看板娘  
**本项目包含的live2d文件仅供学习使用请勿用于商业**   
项目安装包：[百度云]()  

## 效果预览
![](https://cdn.jsdelivr.net/gh/q-mona/mona@latest/images/electron-live2d.gif)

## 使用注意
1. live2d列表的名称与你导入的文件夹名称一致     
   如果要修改默认live2d列表的名称   
   可以去 **项目路径/resourses/app/live2d/** 修改对应的文件夹名称      
   
2. 导入的live2d配置文件名称必须为 **改资源文件夹的名称.model.json**   
   例：文件夹名称为 **血小板**，则配置文件应为：血小板.model.json (注 此配置文件不是 physics.json之类)  
   如果不是重命名即可  
   导入时如果**文件夹重名**则会取消这次导入
   
3. 如果你的live2d有音频文件**必须**将音频文件夹名称修改为 **voice** 否则会找不到音频路径

4. **删除live2d**直接删除 **项目路径/resourses/app/live2d/** 中对应的文件即可  

5. 如果你有多个live2d资源 可以直接把live2d文件夹复制到 **项目路径/resourses/app/live2d/**   

6. 如需拖动live2d**请按住边缘拖动**，否则动不了 

详细信息可去看我的专栏: [地址]()

## 源码运行
```
npm install // 安装依赖
npm run electron:serve // 编译项目
npm run electron:build // 打包项目
```
如果运行遇到问题可以看我的electron踩坑笔记: [地址]()





