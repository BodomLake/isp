import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Tool from "@/pages/Tool";
import Editor from "@/pages/Editor";
import Table from "@/pages/Table";
import Match from "@/pages/Match";
import Chat from "@/pages/Chat";
import LoginPage from "@/pages/LoginPage";
import Register from "@/pages/Register";
import Email from "@/pages/Email";
import Video from "@/pages/Video";
import Music from "@/pages/Music";
import Blog from "@/pages/Blog";
Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { keepAlive: true }
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      meta: { keepAlive: true }
    },
    {
      path: "/match",
      name: "Match",
      component: Match,
      meta: { keepAlive: true }
    },
    {
      path: "/table",
      name: "Table",
      component: Table,
      meta: { keepAlive: true }
    },
    {
      path: "/tool",
      name: "Tool",
      component: Tool,
      meta: { keepAlive: true }
    },
    {
      path: "/editor",
      name: "Editor",
      component: Editor,
      meta: { keepAlive: true }
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      meta: { keepAlive: true }
    },
    {
      path: "/email",
      name: "Email",
      component: Email,
      meta: { keepAlive: true }
    },
    {
      path: "/video",
      name: "Video",
      component: Video,
      meta: { keepAlive: true }
    },
    {
      path: "/music",
      name: "Music",
      component: Music,
      meta: { keepAlive: true }
    },
    {
      path: "/blog",
      name: "Blog",
      component: Music,
      meta: { keepAlive: true }
    }
  ]
});

export default router;
