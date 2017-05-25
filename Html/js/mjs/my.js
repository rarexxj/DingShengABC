$(function () {
    $.ADDLOAD()
    $.checkuser();
    new Vue({
        el: '#my',
        data: {
            info: [],
            xinx: {}
        },
        ready: function () {
            var _this = this;
            _this.xinx = $.get_user('');
            _this.infoajax();
            _this.$nextTick(function () {

            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/MemberInfo',
                    type: 'get'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        if(rs.data.Avatar!=null){
                            $('.touximg').attr('src', rs.data.Avatar.MediumThumbnail)
                        }
                        $.RMLOAD()
                    }
                })
            }
        }
    })
})