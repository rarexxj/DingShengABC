$(function () {
    $.ADDLOAD()
    window.TOKEN = localStorage.getItem('qy_loginTokentopest')
    if (window.TOKEN) {
        $.ajaxSetup({
            headers: {
                Authorization: 'Basic ' + window.base64encode(window.TOKEN)
            }
        })
    } else {
        window.location.href = '/Html/topestlogin.html'
    }
    new Vue({
        el: '#main',
        data: {
            info: []
        },
        ready: function () {
            var _this = this;
            _this.$nextTick(function () {
                _this.push()
                $.RMLOAD()
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Mall/Gold/UpdatePrice',
                    type: 'post',
                    data: {
                        price:$('.text').val()
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data
                        $.oppo('修改成功',1)
                    }
                })
            },
            //确认
            push:function () {
                var _this = this;
                $('.quer').on('click',function () {
                    _this.infoajax();
                })
            }
        }
    })
})