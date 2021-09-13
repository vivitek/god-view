import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import Loading from "../images/Loading"
import { GET_BOX_BY_UUID } from "../utils/graphql"

const Box = () => {
  const { id } = useParams()
  const history = useHistory()
  const [box, setBox] = useState()
  const [loading, setLoading] = useState(true)
  const {error, data} = useQuery(GET_BOX_BY_UUID, {variables: {id}})
  const [selectedTab, setSelectedTab] = useState('graphql')

  useEffect(() => {
    if (data) {
      setBox(data.getRouter)
      setLoading(false)
    }
  }, [data])

  const Tab = ({name}) => {
    return (
      <button
        className={"px-8 py-2 rounded-br-xl rounded-tr-xl mr-2 mb-4 focus:outline-none ".concat(name.toLocaleLowerCase() === selectedTab ? "bg-viviBlue-500 shadow-md" : "")}
        onClick={() => setSelectedTab(name.toLocaleLowerCase())}
      > {name} </button>
    )
  }

  const MultiServiceCard = ({children, className}) => {
    return (
      <div className={"w-11/12 xl:w-9/20 flex bg-darkBlue m-1 rounded-md shadow-xl ".concat(className)}>
        <div className="flex w-1/4 flex-col mt-4">
            <Tab name="Graphql"/>
            <Tab name="Rabbitmq"/>
            <Tab name="PCAP"/>
            <Tab name="DHCP"/>
            <Tab name="Firewall"/>
        </div>
        <div className="w-full m-4 pl-4 border-l border-grayBlue">
          {children}
        </div>
      </div>
    )
  }

  if (error) {
    toast.error("Box does not exists.")
    history.push("/")
  }
  if (loading)
    return <Loading color="white"/>
  return (
    <div className="bg-grayBlue text-white h-full flex flex-col xl:flex-wrap justify-evenly items-center ">
      <div className="h-auto w-11/12 xl:w-9/20 bg-darkBlue m-1 p-4 rounded-md shadow-xl">
        <span className="font-itc text-lg">Informations</span>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col">
            <span>Id: {id}</span>
            <span>Name: {box.name}</span>
            <a className="italic" href={`https://${id}.openvivi.com`}>OpenVVRT</a>
          </div>
          <div className="flex w-full sm:w-60 justify-between mt-4 xl:mt-0">
            <button className="text-white font-bold float-right bg-viviRed py-1.5 xl:px-8 rounded-full w-20 h-8 sm:w-30 xl:w-auto text-xs shadow-md">Reboot</button>
            <button className="text-white font-bold float-right bg-viviRed py-1.5 xl:px-8 rounded-full w-20 h-8 sm:w-30 xl:w-auto text-xs shadow-md">Poweroff</button>
          </div>
        </div>
        <div className="border-t border-grayBlue flex mt-3 pt-2 flex-col">
          <span className="font-itc text-lg">Customer</span>
          <span>Name: {box?.owner?.name || "Unassigned"}</span>
          <span>Email: {box?.owner?.email || "Undefined"}</span>
          <span>Telephone: {box?.owner?.phone || "Undefined"}</span>
        </div>
      </div>
      <MultiServiceCard  className="h-2/3 xl:h-3/5">
        logs services
      </MultiServiceCard>
      <div className="h-2/3 xl:h-9/20 w-11/12 xl:w-9/20 bg-darkBlue m-1 rounded-md shadow-xl">stats system</div>
      <MultiServiceCard className="h-2/3 xl:h-9/20">
        services options
      </MultiServiceCard>
    </div>
  )
}

export default Box