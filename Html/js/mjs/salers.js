$(function () {
    if(localStorage.getItem('qy_loginTokenyy')){

    }else{
        var user = $.cookie('userInfo1')
        if (user) {
            user = JSON.parse(window.base64decodes(user))
            $.put_user2(user)
            localStorage.setItem('qy_loginTokenyy', user.PhoneNumber + ':' + user.DynamicToken);
            //新增
            $.removeCookie('userInfo1');
        }
    }
})