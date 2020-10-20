import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Tool from "@/pages/Tool";
import Editor from "@/pages/Editor";
import Table from "@/pages/Table";
import Match from "@/pages/Match";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "match",
          name: "Match",
          component: Match,
          meta: { keepAlive: true }
        },
        {
          path: "table",
          name: "Table",
          component: Table,
          meta: { keepAlive: true }
        },
        {
          path: "tool",
          name: "Tool",
          component: Tool,
          meta: { keepAlive: true }
        },
        {
          path: "editor",
          name: "Editor",
          component: Editor,
          meta: { keepAlive: true }
        },
        {
          path: "chat",
          name: "Chat",
          component: Chat,
          meta: { keepAlive: true }
        }
      ]
    },
    {
      path: "login",
      name: "Login",
      component: Login,
      meta: { keepAlive: true }
    }
  ]
});

export default router;
