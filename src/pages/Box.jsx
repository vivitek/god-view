import { useQuery } from "@apollo/client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import Loading from "../images/Loading"
import { GET_BOX_BY_UUID } from "../utils/graphql"
import { Bar } from "react-chartjs-2"


const Box = () => {
  const { id } = useParams()
  const history = useHistory()
  const [box, setBox] = useState()
  const [systemStats, setSystemStats] = useState()
  const [loading, setLoading] = useState(true)
  const { error, data } = useQuery(GET_BOX_BY_UUID, { variables: { id } })
  const [isOnline, setIsOnline] = useState(false)
  const [logs, setLogs] = useState(null)
  const [selectedTab, setSelectedTab] = useState("graphql")
  const [selectedStd, setSelectedStd] = useState("out")

  useEffect(() => {
    if (data) {
      setBox(data.getRouter)
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (box) {
      retrieveInfo(box)
      axios.get(`http://${box.url}`).then(res => {
        if (res)
          setIsOnline(true)
      })
      axios.get(`http://${box.url}/services/logs`).then(res => setLogs(res.data))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box])

  const retrieveInfo = async () => {
    try {
      const res = (await axios.get(`http://${box.url}/system`)).data
      setSystemStats(res)
    } catch {
      toast.error('Something went wrong')
    }
  }
  if (error) {
    toast.error("Box does not exists.")
    history.push("/")
  }
  if (loading)
    return <Loading color="white" />

  const Title = ({ children }) => {
    return <h2 className="text-xl font-bold font-itc text-left">{children}</h2>
  }

  const Tab = ({ title }) => {
    return <button className={"font-semibold font-itc mr-4 hover:underline ".concat(selectedTab === title.toLowerCase() ? "" : "text-gray-400")} onClick={() => setSelectedTab(title.toLowerCase())}>{title}</button>
  }

  const StdToggle = () => {
    return (<div>
      {selectedStd === "out"
        ? <button className="hover:underline font-itc" onClick={() => setSelectedStd("err")}>Switch to Stderr</button>
        : <button className="hover:underline font-itc" onClick={() => setSelectedStd("out")}>Switch to Stdout</button>
      }
    </div>
    )
  }

  return (
    <div className="h-full flex flex-col xl:flex-row justify-around">
      <div className="xl:m-4 w-auto xl:w-1/2 flex flex-col">
        <div className="bg-darkBlue m-4 xl:h-1/3 rounded-xl shadow-xl p-4 flex flex-col justify-between">
          <Title>Informations</Title>
          <div className="flex flex-col">
            <span>{box.name}</span>
            <span>{id}</span>
            <span>{box.url}</span>
            <span>{isOnline ? "true" : "false"}</span>
          </div>
          <div>
            <button className="bg-viviRed text-white px-6 py-2 rounded-full hover:bg-viviRed-500 transition duration-200 each-in-out font-sans font-bold text-sm">
              Poweroff
            </button>
            <button className="bg-viviBlue text-white px-6 py-2 rounded-full hover:bg-viviBlue-500 transition duration-200 each-in-out font-sans font-bold text-sm">
              Reboot
            </button>
          </div>
        </div>
        <div className="bg-darkBlue m-4 h-2/3 rounded-xl shadow-xl p-4 flex flex-col justify-between items-center">
          <div className="flex items-flex-start w-full">
            <Title>Statisctics</Title>
          </div>
          {systemStats ?
            <div className="w-full mb-8">
              <Bar data={{
                labels: ['RAM', 'CPU', 'Storage'],
                datasets: [
                  {
                    label: "Percentage",
                    data: [
                      systemStats.ram.percentage,
                      systemStats.cpu.find(core => core.name === 'average').used,
                      systemStats.storage.percent.replace('%', '')
                    ],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }} options={{
                scales: {
                  scaleOverride: false,
                  y: {
                    min: 0,
                    max: 100,
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                },
              }} />
            </div>
            : <Loading />
          }
        </div>
      </div>
      <div className="xl:m-4 xl:w-1/2 p-4">
        <div className="bg-darkBlue h-full rounded-xl shadow-xl p-4">
          <div className="w-full justify-between flex flex-col">
            <Title>Services logs</Title>
            <div className="my-4 flex flex-col xl:flex-row justify-between">
              <div>
                <Tab title="Graphql" />
                <Tab title="PCap" />
                <Tab title="DHCP" />
                <Tab title="OpenVVRT" />
              </div>
              <StdToggle />
            </div>
          </div>
          <div className="max-h-192 h-full flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-grayBlue-DEFAULT">
            {logs
              ? logs?.[selectedTab]?.[selectedStd].map((e, idx) => <span key={idx} className="break-all">{e}</span>)
              : <Loading />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Box