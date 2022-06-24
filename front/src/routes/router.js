
import WallPage from "../pages/Wall/WallPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import ProfilePage from "../pages/ProfilePage.vue"
import EditProfile from "../pages/EditProfile.vue"

import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { name: "login", path: "/login", component: LoginPage },
  { name: "signup", path: "/signup", component: LoginPage },
  { name: "home", path: "/home", component: WallPage },
  {name: "profile", path: "/profile", component: ProfilePage},
  { name: "editprofile", path : "/editprofile", component: EditProfile},
  { path: "/", redirect: "/home" }
]
const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from) => {
  if (isLoginRequired(to)) {
    return router.push("/login")
  }
  console.log(to.path)
  if (isTokenInCache() && to.path== "/login") {
    return router.push("/home")
  }
})

function isLoginRequired(to) {
  if (!isPrivatePage(to)) return false
  if (!isTokenInCache()) return true
  return false
}

function isPrivatePage(to) {
  const publicPages = ["/login", "/signup"]
  return !publicPages.includes(to.path)
}

function isTokenInCache() {
  return localStorage.getItem("token") != null
}


export { router }
