 FOLLOW A KUGOU
----------------


vuejs仿写酷狗音乐webapp
-----------------

更新日志：
> 2017/01/01：上一首，下一首功能<br>
> 2016/12/11：完成播放详情页面，进度条控制，歌词显示<br>
> 2016/11/22：导航栏透明渐变。<br>
> 2016/11/10：修改播放器样式，增加播放音乐时的loading状态<br>
> 2016/11/09：完成所有view级别组件<br>

[在线演示][1]<br>
[原站地址][2]<br>
[混合APP打包][5]

主要技术栈：
 - vuejs2.0
 - vue-router
 - vuex
 - vue-resource
 - mint-ui

由于本人的服务器有点渣，后台通过代理返回酷狗列表页这个阶段所需时间极不稳定，所以部分页面采用本地json模拟数据<br>
由于是单页应用，在路由切换时不会暂停音乐播放，是一个小亮点，也可以实现播放列表等功能，可能会加上。
如果觉得还可以的话，给颗star吧。^9^


项目截图：
----
![](http://p1.bqimg.com/567571/3c5a913634588182.png)<br><br>
![](http://p1.bqimg.com/567571/95d8eca41b39fbcf.png)<br><br>
![](http://p1.bqimg.com/567571/4f2f5522d5403c5d.png)<br><br>
![](http://p1.bqimg.com/567571/b05a4d612b40baca.png)<br><br>

如何使用
----

 1. 下载本项目到本地
 2. npm install下载依赖
 3. npm run dev

<!--
想了解我？
-----

[个人简介][3]<br>
[微博粉我][4]
-->


  [1]: http://cs003.m2828.com/demo/kugouApp/
  [2]: http://m.kugou.com
  [3]: http://cs003.m2828.com
  [4]: http://weibo.com/u/5921186675
  [5]: http://pan.baidu.com/s/1eSMb7e6
