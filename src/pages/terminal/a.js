import React, { useState, useEffect } from "react";
const ENDPOINT = "http://127.0.0.1:4001";



function Terminal() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket)
    socket.emit('cmd', 'ls')
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's {response}
    </p>
  );
}

export default Terminal;