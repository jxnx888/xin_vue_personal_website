var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
function mail(to,subject,html) {
    // 开启一个 SMTP 连接池
    var transport = nodemailer.createTransport(smtpTransport({
        host: "smtp.qq.com",// 主机
        secure: true,// 使用 SSL
        secureConnection: true,// 使用 SSL
        port: 465,// SMTP 端口
        auth: {
            user: "364693022@qq.com",// 账号，使用时替换为自己的邮箱账号
            pass: "AlanFaye521" // 密码，使用时替换为自己的密码
        }
    }));
    // 设置邮件内容
    var mailOptions = {
        from: "364693022@qq.com",// 发件地址
        to: to,// 收件列表
        subject: subject,// 标题
        text: "hello",html: html // html 内容
    }
    // 发送邮件
    transport.sendMail(mailOptions,function(error,response) {
        if (error) {
            console.error(error);
        } else {
            console.log(response);
        }
        transport.close(); // 如果没用，关闭连接池
    });
}
exports.mail = mail;
