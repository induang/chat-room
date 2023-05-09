
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
const END_POINT="http://localhost:5000"

export function useSocket(){
	const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(END_POINT);
	const [isSocketConnect, setIsSocketConnect] = useState(false);

	useEffect(() => {
		socket.on("connected", () => {
      setIsSocketConnect(true);
    });
    socket.on("disconnect", () => {
      setIsSocketConnect(false);
    });
		return () => {
      socket.off("connected");
			socket.off('disconnect')
      socket.disconnect();
    };
	}, [])

  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
  //     dispatch(
  //       updateLastestMessage({
  //         id: newMessageReceived.chat._id,
  //         newLastestMessage: newMessageReceived,
  //       })
  //     );
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageReceived.chat._id
  //     ) {
  //       dispatch(addReceivedNewMessagesChats(newMessageReceived.chat));
  //     } else {
  //       setMessages([...messages, newMessageReceived]);
  //     }
  //   });
  //   return () => {
  //     socket.off("message received");
  //   };
  // });

	return {socket, isSocketConnect}
}