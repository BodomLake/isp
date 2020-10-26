import Vue from "../main";
let const_url = "ws://localhost:8080/ws/single";

let socket = {};
export const sendMessage = (msg, url) => {
  if (
    socket.readyState == WebSocket.CLOSED ||
    socket.readyState == WebSocket.CLOSING
  ) {
    Vue.$message.success("尝试和通讯服务器再次连接");
    socket = initWS(url, () => {
      socket.send(msg);
    });
  } else {
    socket.send(msg);
  }
};

export const disconnectWS = () => {
  socket.close();
};

export const initWS = (url, onOpen)=> {
  if (!url || url == "") {
    alert("请输入一个ws 资源地址");
  }
  socket = new WebSocket(url);
  socket.onopen = () => {
    Vue.$message.success("正在和通讯服务器建立连接");
    onOpen();
  };
  socket.onmessage = event => {
    console.log("ws receive", event.data);
    // Vue.$message.success("正在和通讯服务器建立连接");
  };
  socket.onclose = event => {
    console.log("socket closed !");
    Vue.$message.success("和通讯服务器断开连接");
  };
  socket.onerror = event => {
    console.log("socket connect error!");
    Vue.$message.success("和通讯服务器连接发生错误");
    return Promise.reject(event);
  };
  return socket;
};
