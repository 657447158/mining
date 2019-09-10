const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '龙猫广场'
        },
        component: () => import('../pages/home/index.vue')
    },
    {
        path: '/background',
        name: 'background',
        meta: {
            title: '故事背景'
        },
        component: () => import('../pages/background/index.vue')
    }
]

export default routes