import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import HellowWorld from './components/HelloWorld.vue'

export default [
  {path: '/', component: LoginPage},
  {path: '/home', component: HomePage},
  {path: '/hellow', component: HellowWorld}
];