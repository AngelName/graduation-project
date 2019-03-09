export default [
  {path:"/",
  component:"./page/show"
},

  // home
  {
  
    path: '/home',
    component: '../layouts/BasicHomeLayout',
    routes: [{
      path: '/home',
      component: './home/Home',
    },
    {
      path: '/about',
      component: './home/Home',
    }, {
      path: '/callme',
      component: './home/Home',
    },
    {
      path: '/home/page',
      icon: 'form',
      name: '添加博客',
      component:"./page/show"
    
    }, 
    ]
  },
 // app
  {
    path: '/manage',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      {
        path: '/manage/page/list',
        name: '博客管理',
        icon: 'dashboard',
        component:"./page/Manage"
      },
      // forms
      {
        path: '/manage/page/add',
        icon: 'form',
        name: '添加博客',
        component:"./page/add"

      },  // forms
      {
        path: '/',
        icon: 'form',
        name: '报表查看',
        component:"./page/show"

      },
       // forms
       {
        path: '/manage/comment',
        icon: 'form',
        name: '评论管理',
        component:"./Comment/manage"

      },// forms
      {
       path: '/manage/account',
       icon: 'form',
       name: '账号管理',
       component:"./Account/manage"

     },
    ]
    },
  {
    component: '404',
  },

];
