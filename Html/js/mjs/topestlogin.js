$(function () {
    var _zh = $('#zh').val();
    var _mm = $('#mm').val();
    //点击登录
    $('.login-btn').on('click', function () {
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


    function ajax() {
        $.ajax({
            url: '/Api/v1/LoginToSalesPerson',
            type: 'post',
            data: {
                PhoneNumber: _zh,
                Password: _mm,
                MobileDevice: ''
            }
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                $.put_user3(rs.data);
                localStorage.setItem('qy_loginTokentopest',$.get_user3('PhoneNumber') + ':' + $.get_user3('DynamicToken'));
                $.oppo('登录成功', 1, function () {
                    window.location.href = "/Html/todayglod.html"
                })
            }
        })
    }

})