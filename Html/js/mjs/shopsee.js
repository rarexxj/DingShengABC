$(function () {
    // $.checkuser();
    var id = $.getUrlParam('id');
    var gid = $.getUrlParam('gid');
    var type = $.getUrlParam('type');
    var mode = $.getUrlParam('mode');
    new Vue({
        el: '#shop',
        data: {
            info: {},
            nowinfo: {},
            kaiguan: false
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {
                _this.submit();
                // $.RMLOAD()
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Merchant/GetAllMerchant',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.pimg();

                    }
                })
            },
            pimg: function () {
                var _this = this;
                var map = new BMap.Map("allmap");
                var j = [];
                // var mapStyle = {
                //     features: ["road", "building", "water", "land"],//隐藏地图上的poi
                //     style: "dark"  //设置地图风格为高端黑
                // }
                var mapStyle={
                    styleJson:[
                        // {
                        //     "featureType": "all",
                        //     "elementType": "all",
                        //     "stylers": {
                        //         // "color": "#000000"
                        //     }
                        // },
                        // {
                        //     "featureType": "arterial",
                        //     "elementType": "geometry",
                        //     "stylers": {
                        //         "color": "#444444",
                        //         "hue": "#000000",
                        //         "lightness": -46,
                        //         "visibility": "on"
                        //     }
                        // },
                        // {
                        //     "featureType": "boundary",
                        //     "elementType": "all",
                        //     "stylers": {
                        //         "color": "#444444",
                        //         "lightness": -62,
                        //         "visibility": "on"
                        //     }
                        // },
                        // {
                        //     "featureType": "poi",
                        //     "elementType": "labels.text.fill",
                        //     "stylers": {
                        //         "color": "#ffffff",
                        //         "lightness": -60,
                        //         "visibility": "on"
                        //     }
                        // },
                        // {
                        //     "featureType": "label",
                        //     "elementType": "labels.text.fill",
                        //     "stylers": {
                        //         "color": "#ffffff",
                        //         "lightness": -60
                        //     }
                        // }
                    ]
                }
                map.setMapStyle(mapStyle);


                for (i = 0; i < _this.info.length; i++) {
                    var c = {
                        lat: _this.info[i].Latitude,
                        lng: _this.info[i].Longitude,
                        info: _this.info[i],
                        name:_this.info[i].MerchantName
                    };
                    j.push(c);
                }

                var json_data = j;
                console.log(json_data);
                var pointArray = new Array();
                for (var i = 0; i < json_data.length; i++) {
                    var myIcon = new BMap.Icon("/Html/css/img/logo59.png", new BMap.Size(40,40));
                    // var marker = new BMap.Marker(new BMap.Point(json_data[i].lng, json_data[i].lat), {icon: myIcon}); // 创建点
                    var marker = new BMap.Marker(new BMap.Point(json_data[i].lng, json_data[i].lat)); // 创建点
                    map.addOverlay(marker);
                    marker['datas'] = json_data[i];//增加点

                    pointArray[i] = new BMap.Point(json_data[i].lng, json_data[i].lat);
                    var label = new BMap.Label(json_data[i].name,{offset:new BMap.Size(-14,30)});
                    label['datas'] = json_data[i];//增加点
                    marker.setLabel(label)
                    marker.addEventListener("click", attribute);
                    label.addEventListener("click", attribute);
                }
                //让所有点在视野范围内
                map.setViewport(pointArray);
                //获取覆盖物位置
                function attribute(e) {
                    var $this = this;
                    _this.nowinfo = $this.datas.info;
                    _this.kaiguan = true
                }

                //定位
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var myIcon1 = new BMap.Icon("/Html/css/img/logo60.png", new BMap.Size(40, 40),{
                        });
                        var mk = new BMap.Marker(r.point, {icon: myIcon1});
                        map.addOverlay(mk);

                        // map.panTo(r.point);
                        map.centerAndZoom(r.point, 10);
                    }
                    else {
                        alert('failed' + this.getStatus());
                    }
                }, {enableHighAccuracy: true})

            },
            submit: function () {
                var _this = this;
                $('.submit').on('click', function () {
                    window.location.href = '/Html/looknearbyShop.html?shopid=' + _this.nowinfo.Id
                })
            }
        }
    })
})