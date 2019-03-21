import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'proList',
            component: () =>
                import ("@/components/proList")
        },
        {
            path: '/proList',
            name: 'proList',
            component: () =>
                import ("@/components/proList")
        },
        {
            path: '/proDetail',
            name: 'proDetail',
            component: () =>
                import ("@/components/proDetail"),

        }, {
            path: '/shoppingList',
            name: 'shoppingList',
            component: () =>
                import ("@/components/shoppingList")
        }
    ]
})