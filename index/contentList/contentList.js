
(function(){
    // 商家详情模版
    let page=0
    let isLoading=false

    var itemTmpl = '<div class="r-item-content scale-1px">'+
                        '<img class="item-img" src=$pic_url />'+
                        '$brand'+
                        '<div class="item-info-content">'+
                            '<p class="item-title">$name</p>'+
                            '<div class="item-desc clearfix">'+
                               '<div class="item-score">$wm_poi_score</div>'+
                               '<div class="item-count">月售$monthNum</div>'+
                               '<div class="item-distance">&nbsp;$distance</div>'+
                                '<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
                            '</div>'+
                            '<div class="item-price">'+
                                '<div class="item-pre-price">$min_price_tip</div>'+
                                '$meituanFlag'+
                            '</div>'+
                            '<div class="item-others">'+
                                '$others'+
                            '</div>'+
                        '</div>'+
                    '</div>';

    /**
     * 请求数据
     * @param 
     */
    
    function getList(){
        $.get('../json/homelist.json', function(data){
            console.log(data);
            var list = data.data.poilist || [];
            initContentList(list);
        });
    }


    /**
     * 渲染是否是新到和品牌标签
     * @param {*} data 
     */
    function getBrand(data) {
        if (data.brand_type) {
            return '<div class="brand brand-pin">品牌</div>';
        } else {
            return '<div class="brand brand-xin">新到</div>';
        }
    }

    /**
     *  渲染月售数量
     * @param {*} data 
     */
    function getMonthNum(data) {
        var num = data.month_sale_num;

        // 大于999采用999+
        if (num > 999) {
            return '999+';
        }

        return num;
    }

    /**
     * 是否需要渲染美团专送tag
     * @param {*} data 
     */
    function getMeituanFlag(data) {

        if(data.delivery_type) {
            return '<div class="item-meituan-flag">美团专送</div>';
        }

        return '';
    }

    /**
     * 渲染商家活动
     * @param {*} data 
     */
    function getOthers(data) {
        var array = data.discounts2;
        var str = '';
        array.forEach((item, index)=>{
            var _str = '<div class="other-info">'+
                            '<img src=$icon_url class="other-tag"/>'+
                            '<div class="other-content one-line">$info</div>'+
                        '</div>';
            _str = _str.replace('$icon_url',item.icon_url)
                   .replace('$info',item.info);


            str = str + _str;
        });

        return str;
    }
    /**
     * 渲染列表
     * @param [*] array 
     */
    function initContentList(list) {


        list.forEach(function(item, index){


            var str = itemTmpl.replace('$pic_url',item.pic_url)
            .replace('$name',item.name)
            .replace('$distance',item.distance)
            .replace('$mt_delivery_time',item.mt_delivery_time)
            .replace('$min_price_tip',item.min_price_tip)


            .replace('$brand',getBrand(item))

            .replace('$monthNum',getMonthNum(item))

            .replace('$meituanFlag',getMeituanFlag(item))
            
            .replace('$others', getOthers(item))

            .replace('$wm_poi_score',new StarScore(item.wm_poi_score).getStars());


            $('.list-wrap').append(str);

        });
    }


    function addClick(){
        $('.category-content').on('click','.category-item', function(){
            alert(1);
        });
    }

    /**
     * @constructor init
     * @description 列表单个组件
     */
    function init(argument) {
        getList();
        addEvent()
    }

    function addEvent() {
        window.addEventListener('scroll',function () {
            let scrollTop=document.documentElement.scrollTop||document.body.scrollTop
            let clientHeight=document.documentElement.clientHeight
            let scrollHeight=document.body.scrollHeight
            if (scrollTop+clientHeight>=scrollHeight){
                if (page<3){
                    if (isLoading){
                        return
                    }
                    getList()
                }

            }
        })
    }


    init();
})();
