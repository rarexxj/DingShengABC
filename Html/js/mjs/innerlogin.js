$(function () {
    var openid = $.getUrlParam('openId');
    var _zh = $('#zh').val();
    var _mm = $('#mm').val();
    if(openid){
        //点击登录
        $('.loginbox').on('click', '.login-btn',function () {
            _zh = $('#zh').val();
            _mm = $('#mm').val();
            if (_zh == '') {
                $.oppo('请输入账号', 1);
                return false;
            }
            if (_mm == '') {
                $.oppo('请输入密码', 1)
                return false;
            }
            ajax();
        })
    }else{
        window.location.replace('/WeiXin/LoginToSalesPerson');


    }


    function ajax() {
        $.ajax({
            url: '/Api/v1/LoginToSalesPerson',
            type: 'post',
            data: {
                PhoneNumber: _zh,
                Password: _mm,
                MobileDevice: '',
                OpenId: openid
            }
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                $.put_user2(rs.data);
                localStorage.setItem('qy_loginTokenyy', $.get_user2('PhoneNumber') + ':' + $.get_user2('DynamicToken'));
                $.oppo('登录成功', 1, function () {
                    window.location.href = "salers.html"
                })
            }
        })
    }

    // function huit(back) {
    //     var from = (back ? back : (location.pathname + location.search));
    //     window.location.replace('/WeiXin/LoginToSalesPerson' + (from ? ('?backUrl=' + from) : ''));
    // }
})