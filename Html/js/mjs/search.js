$(function () {
    $.ADDLOAD()
    new Vue({
        el: '#search',
        data: {
            info: []
        },
        ready: function () {
            var _this = this;
            _this.infoajax();
            _this.$nextTick(function () {

            })
        },
        methods: {
            infoajax: function () {
                var _this=this;
                $.ajax({
                    url: '/Api/v1/Mall/GoodsCategory',
                    type: 'get',
                    data: {
                        goodsType:1
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        $.RMLOAD();
                    }
                })
            }

        }

    })
})