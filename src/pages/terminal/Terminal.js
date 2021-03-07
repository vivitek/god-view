import { useEffect, useState } from 'react'
import io from "socket.io-client";
import './Terminal.css'
import '../Page.css'

const socket = io(process.end.ENDPOINT).connect()

const Terminal = () => {
  const [commandList, setCommandList] = useState([])
  const [command, setCommand] = useState("")

  useEffect(() => {
    socket.off('res').on('res', data => {
      const d = [...commandList]
      if (!d.length) return
      d[d.length - 1].output = data
      setCommandList([...d])
    })
  })

  useEffect(() => {
    if (!command) return
    socket.emit('cmd', command, {token: localStorage.getItem('gv_token')})
    setCommand('')
  }, [commandList]) //  eslint-disable-line

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
