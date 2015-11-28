#### jquery-union-underscore
我的项目中常将jquery和underscore结合起来用，所以将一些好用的方法分享


#### _.pub(channel, data1, [data2,...]);             
发布信息，channel为频道，data为数据，可以一次发布多条数据。               
在线示例：<http://runjs.cn/code/wprllxs9/>                     

#### _.sub(channel, handler(data1, [data2,...]));              
订阅信息，channel为频道，handler参数为同频道_.pub发布的信息。                     
在线示例：<http://runjs.cn/code/wprllxs9/>                


#### $(dom).render(tplid, list);            
对dom元素写入字符串，tplId为模版的Html页面上模板id, list为传入的数据。             
在线示例：<http://runjs.cn/code/wxw9wkij/>              


#### $(dom).trust([wait,] events,  [selector,]  [data,] handler(event, self, data));         
对jquery on事件进行扩展。                         
1. 增加了wait，指定时间内只触发一次                              
2. handler参数依次为event对象，$(this)和$(this).data();                                

例一：在线示例：<http://runjs.cn/code/orefcetx/>          
例二：在线示例：<http://runjs.cn/code/c8l2hqnn/>    