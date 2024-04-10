import { useEffect } from "react"

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4263") // Replace with your WebSocket server URL
    socket.onopen = () => {
      console.log("WebSocket connection established.")
    }

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.close()
    }
  }, [])

  return <div>WebSocket Component</div>
}

export default WebSocketComponent
