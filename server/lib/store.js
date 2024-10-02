const connectedUser = new Map();

let io = null;

export const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

export const getSocketServerInstance = () => {
  return io;
};

export const addNewConnectUser = ({ socktId, userId }) => {
  connectedUser.set(socktId, { userId });
  console.log("new conneted user");
  console.log(connectedUser);
};

export const removeConnecteUser = (socktId) => {
  if (connectedUser.has(socktId)) {
    connectedUser.delete(socktId);
    console.log("user disconnected");
    console.log(connectedUser);
  }
};

export const getActiveUsers = (userId) => {
  const activeUsers = [];
  connectedUser.forEach((value, key) => {
    if (value.userId === userId) {
      activeUsers.push(key);
    }
  });
  return activeUsers;
};

export const getOnlineUser = () => {
  const onlineUsers = [];
  connectedUser.forEach((key, value) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};
