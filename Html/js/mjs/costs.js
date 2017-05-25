$(function () {
    $.ADDLOAD()
    // if ($.is_weixin()) {
    //     var user = $.cookie('userInfo1')
    //     if (user) {
    //         user = JSON.parse(window.base64decodes(user))
    //         $.put_user2(user)
    //         localStorage.setItem('qy_loginTokenyy', user.PhoneNumber + ':' + user.DynamicToken);
    //         //新增
    //         $.removeCookie('userInfo1');
    //     }
    //
    // }
    window.TOKEN = localStorage.getItem('qy_loginTokenyy')
    if (window.TOKEN) {
        $.ajaxSetup({
            headers: {
                Authorization: 'Basic ' + window.base64encode(window.TOKEN)
            }
        })
    } else {
        window.location.href = '/Html/innerlogin.html'
    }
    var odl = 0;
    new Vue({
        el: '#main',
        data: {
            TotalCount: '',
            price: '',
            info: [],
            beginTime: '',
            endTime: '',
            month: '',
            ul: [{month: '本月', dataId: '1', btn: true}, {month: '3个月', dataId: '3', btn: false}, {
                month: '6个月',
                dataId: '6',
                btn: false
            }, {
                month: '12个月',
                dataId: '12', btn: false
            }]
        },
        ready: function () {
            var _this = this;
            _this.todaymonth();
            _this.$nextTick(function () {
                _this.searchajax();
                _this.timetab();
                setTimeout(function () {
                    $.RMLOAD()
                },100)
            })
        },
        methods: {
            todaymonth: function () {
                var _this=this;
                var data = {
                    beginTime: '',
                    endTime: '',
                    isPay: true,
                    pageNo: 1,
                    limit: 10,
                    months: 1
                };
                $.ajax({
                    url: '/Api/v1/SalesPerson/MyChildsFee',
                    type: 'get',
                    data: data
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        window.allpage1 = (rs.data.TotalCount) / (data.limit);
                        if ( data.pageNo== 1) {
                            _this.info = rs.data.MemberFee
                        } else {
                            _this.info = _this.info.concat(rs.data.MemberFee);
                        }
                        _this.price = rs.data.TotalFee;
                        _this.month = data.months;
                        var flag = true;
                        $(window).scroll(function () {
                            var H = $('.scrolltop')[0].getBoundingClientRect().top;
                            var h = $(window).height();
                            if (H - h < 0 && flag == true) {
                                flag = false;
                                data.pageNo++;
                                if (data.pageNo > Math.ceil(allpage1)) {
                                    $.RMLOAD();
                                } else {
                                    setTimeout(function () {
                                        flag = true;
                                    }, 500)
                                    _this.monthtab();
                                    $.ADDLOAD();
                                }
                            }
                        })
                    }
                })

            },
            monthtab: function (index) {
                // console.log(event.target)
                // $(event.target).addClass('active');
                // $(event.target).siblings().removeClass('active');

                var _this = this;

                if (_this.ul[odl]) {
                    _this.ul[odl].btn = false;
                }
                odl = index;
                _this.ul[index].btn = true;
                $('.time1').val(' ');
                $('.time2').val(' ');
                var data = {
                    beginTime: '',
                    endTime: '',
                    isPay: true,
                    pageNo: 1,
                    limit: 10,
                    months: _this.ul[index].dataId
                }
                $.ajax({
                    url: '/Api/v1/SalesPerson/MyChildsFee',
                    type: 'get',
                    data: data
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        window.allpage2 = (rs.data.TotalCount) / (data.limit);
                        if (data.pageNo== 1) {
                            _this.info = rs.data.MemberFee
                        } else {
                            _this.info = _this.info.concat(rs.data.MemberFee);
                        }
                        _this.price = rs.data.TotalFee;
                        _this.month = data.months;
                        var flag = true;
                        $(window).scroll(function () {
                            var H = $('.scrolltop')[0].getBoundingClientRect().top;
                            var h = $(window).height();
                            if (H - h < 0 && flag == true) {
                                flag = false;
                                data.pageNo++;
                                if (data.pageNo > Math.ceil(allpage2)) {
                                    $.RMLOAD();
                                } else {
                                    setTimeout(function () {
                                        flag = true;
                                    }, 500)
                                    _this.monthtab();
                                    $.ADDLOAD();
                                }
                            }
                        })
                    }
                })
            },
            searchajax: function () {
                var _this = this;
                $('.search').on('click', function () {
                    var t1 = new Date($('.time1').val()).getTime();
                    var t2 = new Date($('.time2').val()).getTime();
                    if (t1 && t2) {
                        if (t1 > t2) {
                            $.oppo('请输入正确的时间', 1)
                        } else {
                            for (i=0;i<_this.ul.length;i++){
                                _this.ul[i].btn=false;
                            }
                            var data2 = {
                                beginTime: _this.beginTime,
                                endTime: _this.endTime,
                                isPay: true,
                                pageNo: 1,
                                limit: 10
                            }
                            $.ajax({
                                url: '/Api/v1/SalesPerson/MyChildsFee',
                                type: 'get',
                                data: data2
                            }).done(function (rs) {
                                if (rs.returnCode == '200') {
                                    window.allpage3 = (rs.data.TotalCount) / (data2.limit);
                                    if (data2.pageNo == 1) {
                                        _this.info = rs.data.MemberFee
                                    } else {
                                        _this.info = _this.info.concat(rs.data.MemberFee);
                                    }
                                    _this.price = rs.data.TotalFee
                                }
                            })
                            var flag = true;

                            $(window).scroll(function () {
                                var H = $('.scrolltop')[0].getBoundingClientRect().top;
                                var h = $(window).height();
                                if (H - h < 0 && flag == true) {
                                    flag = false;
                                    data2.pageNo++;
                                    if (data2.pageNo > Math.ceil(allpage3)) {
                                        $.RMLOAD();
                                    } else {
                                        setTimeout(function () {
                                            flag = true;
                                        }, 500)
                                        _this.searchajax();
                                        $.ADDLOAD();
                                    }
                                }
                            })
                        }
                    } else {
                        $.oppo('请选择时间', 1)
                    }

                })
            },
            timetab: function () {

                // $('.dateol li').on('click', function () {
                //     $(this).addClass('active');
                //     $(this).siblings().removeClass('active');
                // })
            }
            // price: function () {
            //     var _price = 0;
            //     $('.mainnrdl .mainnrdd').each(function () {
            //         var dj = Number($(this).find('.je').html());
            //         console.log(dj);
            //         _price = _price + dj;
            //         $('.price').html(_price);
            //     })
            // },
            // fix: function () {
            //     $('.je').each(function () {
            //         $.fixed($(this));
            //     })
            //     $.fixed('.price');
            // }

        }
    })
})