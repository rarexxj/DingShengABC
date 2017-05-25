$(function () {
    $.ADDLOAD()
    new Vue({
        el: '#collect',
        data: {
            info: []
        },
        ready: function () {
            var _this = this;
            _this.collectajax();
            _this.$nextTick(function () {
                $.RMLOAD();
            })
        },
        methods: {
            collectajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Mall/Collect',
                    type: 'get',
                    data: {
                        pageNo: 1,
                        limit: 10
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data
                    } else {
                        if (rs.returenCode = '401') {
                            // Backlog()
                        } else {
                            oppo(rs.msg, 1)
                        }
                    }
                })
            }
        }
    })
})