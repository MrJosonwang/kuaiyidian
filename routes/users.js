var router = require('koa-router')();
var Users = require('../models/UserModel');

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.post('/login', async (ctx, next) => {
	let rs=await new Promise(function (resolve,reject){
   Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
		if(rs!=null){
		let  loginbean=new Object();
			loginbean.id = rs.id;
			loginbean.nicheng = rs.nicheng;
			loginbean.role = rs.role;
		    loginbean.msgnum = rs.msgnum;
		    ctx.session.loginbean=loginbean;
			//ctx.redirect(req.body.url);
			resolve(1);
		}else{
			resolve(2);
			
		}
	});
   if(rs==1){
   	ctx.body="登陆成功！"
   }else{
   		ctx.body="email/密码错误！"
   }
	});
})


module.exports = router
