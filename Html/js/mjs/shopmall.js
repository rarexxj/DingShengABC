$(function () {
    $.ADDLOAD()
    window.TOKEN = localStorage.getItem('qy_loginToken');
    new Vue({
        el: '#main',
        data: {
            info: [],
            xinxinfo:[]
        },
        ready: function () {
            var _this = this;
            if(TOKEN){
                $.checkuser();
                _this.xinxjax();
            }
            _this.$nextTick(function () {
                _this.close();
                $.RMLOAD()
            })
        },
        methods: {
            xinxjax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/MemberInfo',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.xinxinfo = rs.data;
                        $('.toux img').attr('src', rs.data.Avatar.MediumThumbnail);
                    }
                })
            },
            close: function () {
                $('.xx').on('click', function () {
                    window.location.href = '../index.html'
                })
            }
        }
    })
})