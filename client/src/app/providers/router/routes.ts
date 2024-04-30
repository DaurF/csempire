export const routes = [
  {
    path: '/',
    redirect: {name: 'roulette'}
  },
  {
    path: '/roulette',
    name: 'roulette',
    component: () => import('@/pages/roulette')
  },
  {
    path: '/match-betting',
    name: 'match-betting',
    component: () => import('@/pages/match-betting')
  }
]
