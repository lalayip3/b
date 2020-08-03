
(function(){


    var itemTmpl = '<a class="$key btn-item" href="$k.html"><div class="tab-icon"></div><div class="btn-name">$text</div></a>';


    function init(){
        var items = [{
            key: 'index',
            text: '首页'
        },{
            key: 'order',
            text: '订单'
        },{
            key: 'my',
            text: '我的'
        }];

        var str = '';

        items.forEach(function(item, index){
            str += itemTmpl.replace('$key',item.key)
                    .replace('$text',item.text)
                    .replace('$k',item.key)
        });

        $('.bottom-bar').append(str);
        console.log(1)
        var arr = window.location.pathname.split('/');
        var page = arr[arr.length-1].replace('.html','');

        $('a.'+page).addClass('active');
    }


    init();



})();
