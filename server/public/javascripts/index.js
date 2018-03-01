var $login = $('#login');
var $register = $('#register');
var $userInfo = $('#userInfo');

//切换面板
//切换注册面板
/*$login.find('a').on('click', function () {
    $register.show();
    $login.hide();
});*/
//切换登录面板
/*$register.find('a').on('click', function () {
    $login.show();
    $register.hide();
});*/

//注册请求
/*$register.find('button').on('click',function () {
    $.ajax({
        type: 'post',
        url: '/api/user/register',
        data: {
            username: $register.find('[name="username"]').val(),
            password: $register.find('[name="password"]').val(),
            repassword: $register.find('[name="repassword"]').val()
        },
        dataType: 'json',
        success: function (result) {
            $register.find('.longInfo').html(result.message);

            if ( !result.code ) {
                //注册成功
                setTimeout(function () {
                    $login.show();
                    $register.hide();
                },1000);
            }
        }
    });
});*/

//登录请求
$login.find('button').on('click', function () {
    $.ajax({
        type: 'post',
        url: 'http://192.168.139.251:3000/api/user/login',
        data: {
            username: $login.find('[name="username"]').val(),
            password: $login.find('[name="password"]').val()
        },
        dataType: 'json',
        success: function (result) {
            $login.find('.longInfo').html(result.message);
            console.log("result");
            console.log(result.userInfo);

            if ( !result.code ) {
            //登录成功
                setTimeout(function () {
                    $login.hide();
                    $userInfo.show();

                    //显示用户信息
                    $userInfo.find('.username').html(result.userInfo.username);
                },1000);
            }
        }
    })
});




