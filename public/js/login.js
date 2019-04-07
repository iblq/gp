$(function () {
// 登录
    $('#loginBtn').click(function () {
        var name = $('#loginName').val(), password = $('#loginPwd').val();
        if (name === 'admin' && password === 'admin') {
            window.location.href = 'index.html?username=' + name;
        } else {
            alert("用户名或密码错误");
        }

        // $.post(autoCompUrl + name, function (result) { // 按用户名查询id

        //         $.post(confirmPwd, function (res) { //密码验证
        //             res = JSON.parse(res);
        //             if (res.ResultInfo.success === 'false') {
        //                 alert(res.ResultInfo.message);
        //             } else {
        //                 $.post(loginEndUrl, {human: JSON.stringify(result[0])}, function (res) { // 密码验证成功提交后台跳转页面
        //                     if(res.status === 'sucess')
        //                         window.location.href = 'index.html?username=' + result[0].humanname;
        //                     else
        //                         alert('登录失败！')
        //                 })
        //             }
        //         });
        //     }
        // });
    });
});

