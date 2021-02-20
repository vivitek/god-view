import { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import './Terminal.css'
import '../Page.css'

const ENDPOINT = "WONT_GIVE_IT_TO_YOU"

const Terminal = () => {
  const [commandList, setCommandList] = useState([])
  const [command, setCommand] = useState("")
  const socket = socketIOClient(ENDPOINT)

  useEffect(() => {
    socket.on('res', data => {
      const d = [...commandList]
      d[d.length - 1].output = data
      setCommandList(d)
    })
  })

  useEffect(() => {
    if (commandList.length) {
      socket.emit("cmd", command)
      setCommand('')
    }
  }, [commandList])

  const onSend = () => {
    if (command === 'clear') {
      setCommandList([])
      setCommand('')
      return
    }
    const d = [...commandList]
    d.push({command, output: ""})
    setCommandList(d)

  }

  return (
    <div className="main">
      <div className="terminal">
        {commandList.map((list, i) => {
          return (
            <div id={i + "-history"} style={{textAlign: 'left'}} className="output" key={i + "-command"}>
              <span style={{width: "100%", color: "#c13b3b"}}>$ {list.command}<br /></span>
              <div>
                {list.output.split('__LINE_BREAK__').map(line =>(
                  <span>{line === "" ? <br /> : line.replaceAll(" ", "\u00a0\u00a0")}</span>
                ))}
              </div>
            </div>
          )
        })}
        <div className="line">
        <span id="path">$ </span>
        <input type="text"
          value={command}
          onChange={(e)=> setCommand(e.target.value)}
          placeholder="Type here"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              onSend()
            }
          }}
        />
        </div>
      </div>
    </div>
  )
}

export default Terminal