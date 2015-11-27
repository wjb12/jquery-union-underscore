### jquery-union-underscore
我的项目中常将jquery和underscore结合起来用，所以将一些好用的方法分享



### $(dom).render(tpl, list);
对dom元素写入字符串。在线示例：<http://runjs.cn/code/wxw9wkij/>

```html
<div id="wrap" data-name="wrap"></div>
<script type="text/html" id="tpl">
    <div><%= v.name %> - <%= v.age %></div>
</script>
```

```js
var list = [{
    name : 'kyo',
    age : 18
},{
    name : 'iori',
    age : 17
},{
    name : 'tirry',
    age : 19
}];
$('#wrap').render('#tpl', list);
```

### $(dom).trust([wait,] events,  [selector,]  [data,] handler(eventObject, self, data));
对jquery on事件进行扩展。   
1. 增加了wait，指定时间内只触发一次
2. handler 默认返回$(this)，和$(this).data();

例一：在线示例：<http://runjs.cn/code/orefcetx/>
```html
<div id="wrap">
    <button>狂点我试试</button>
</div>
<div id="output"></div>
```
```js
var times = 1;

//可以动手试一试，改一个1000这个数值或是去掉1000.
$('#wrap').trust(1000, 'click', function(event, my, data){
    
        var str = '第' + times + '次有效点击<br/>';
        times++;

        $('#output').append(str);
});
```

例二：在线示例：<http://runjs.cn/code/c8l2hqnn/>
```html
<div id="wrap"></div>
<p id="output">
    
</p>
<script type="text/html" id="tpl">
    <button data-name="<%= v.name %>" data-index="<%= k %>"><%= v.name %> - <%= v.age %> - 点我试试</button>
</script>
```

```js
var list = [{
    name : 'kyo',
    age : 18
},{
    name : 'iori',
    age : 17
},{
    name : 'tirry',
    age : 19
}];

$('#wrap')
    .render('#tpl', list)
    .trust('click', 'button', function(e, my, d){
            //my 就是$(this);
            //data-设置的值，都在d这个参数上
        $('#output').html(d.index + ':' + d.name);
    });
```