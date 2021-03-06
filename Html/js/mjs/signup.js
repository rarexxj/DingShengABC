$(function () {
    var openid = $.getUrlParam('openId');
    var _zh = $('#zh').val();
    var _mm = $('#mm').val();
    //点击登录
    $('.submit').on('click', function () {
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
            url: '/Api/v1/Login',
            type: 'post',
            data: {
                PhoneNumber: _zh,
                Password: _mm,
                MobileDevice: '',
                OpenId: openid
            }
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                $.put_user(rs.data);
                localStorage.setItem('qy_loginToken',$.get_user('PhoneNumber') + ':' + $.get_user('DynamicToken'));
                if(rs.data.Avatar != null){
                    localStorage['qy_head']=rs.data.Id+'|'+rs.data.Avatar.SmallThumbnail;
                }
                if($.get_user('NickName')){
                    localStorage.setItem('qy_NickName', $.get_user('NickName'));
                }
                if($.get_user('IDCard')){
                    localStorage.setItem('qy_idcard',$.get_user('IDCard'));
                }
                $.oppo('登录成功', 1, function () {
                    window.location.href = "../index.html"
                })
            }
        })
    }

    $('.zhuc').on('click',function(){
        window.location.href="/Html/register.html?openId=" + openid
    })

    $('.forgetpas').on('click',function(){
        window.location.href="/Html/forgetpas.html?openId=" + openid
    })

})