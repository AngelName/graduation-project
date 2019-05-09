export default [
  {
    path: '/manage',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      {
            path: '/manage',
    redirect: '/manage/list',

      },
      {
        path: '/manage/list',
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
        path: '/manage/test',
        icon: 'form',
        name: '报表查看',
        component:"./Dashboard/Analysis"

      },
       // forms
       {
        path: '/manage/comment',
        icon: 'form',
        name: '评论管理',
        component:"./Comment/manage"

      },// forms
    
    ]
    },
    {
      path: '/login',
      name: '登陆',
      component:"./User/login"

    },
    {
      path: '/register',
      name: '登陆',
      component:"./User/register"

    },
  // home
  {
  
    path: '/',
    component: '../layouts/BasicHomeLayout',
    routes: [{
      path: '/',
      component: './home/Home',
    },
    {
      path: '/detail/:id',
      component: './page/show',
    },
    {
      path: '/about',
      component: './home/Home',
    }, {
      path: '/callme',
      component: './home/Home',
    },

    ]
  },
  
  {
    component: '404',
  },

];
