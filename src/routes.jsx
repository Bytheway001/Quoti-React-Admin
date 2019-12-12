export const routes = [
    {
        name: 'home',
        path: '/',
    },
    {
        name: 'Users',
        path: '/users',
        children: [
            {
                name: 'New User',
                path: '/users/new'
            }
        ]
    }
]
