
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/blog/:id', prop:true, name:'blog', component: () => import('../components/BlogPost.vue') },
      { path: '/edit/:id',prop:true, name:'edit', component: () => import('../components/EditPost.vue') },


    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
