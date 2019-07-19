const routes = [
    {
        path: '/',
        redirect: '/index',
        component: () => import('../pages/index/index')
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '发红包'
        },
        component: () => import('../pages/index/index')
    }
]

export default routes