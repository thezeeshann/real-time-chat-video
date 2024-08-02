const connectedUser = new Map();

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
