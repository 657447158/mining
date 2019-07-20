const routes = [
    {
        path: '/',
        redirect: '/index',
        component: () => import('../pages/index/index.vue')
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '龙猫广场'
        },
        component: () => import('../pages/index/index.vue')
    },
    {
        path: '/home',
        name: 'home',
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