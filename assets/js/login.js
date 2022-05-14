$(function () {
    // 点击去注册账号
    $('#link_reg').click(function () {
        // console.log('111')
        $('.login-box').hide();
        $('.reg-box').show()
    })
    // 点击去登录的按钮
    $('#link_login').click(function () {
        // console.log('111')
        $('.login-box').show();
        $('.reg-box').hide()
    })
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 自定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                // console.log(pwd,value);
                return '两次密码不一致';
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').submit(function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            //模拟点击登录
            $('#link_login').click();
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                console.log(res.token);
                // location.href = '/index.html';
                
            }
        })
    })
    
})