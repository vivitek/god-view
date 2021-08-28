import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../images/Loading"
import { GET_BOX_BY_UUID } from "../utils/graphql"

const Box = () => {
  const { id } = useParams()
  const [box, setBox] = useState()
  const [loading, setLoading] = useState(true)
  const {err, data} = useQuery(GET_BOX_BY_UUID, {variables: {id}})

  useEffect(() => {
    if (data) {
      setBox(data.getRouter)
      setLoading(false)
    }
  }, [data])

  if (err)
    return console.log(err)
  if (loading)
    return <Loading color="white"/>
  return (
    <div className="bg-grayBlue text-white h-full flex flex-col xl:flex-wrap justify-evenly items-center">
      <div className="h-auto w-11/12 xl:w-9/20 bg-darkBlue m-1 p-4">
        <span className="font-itc text-lg">Informations</span>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col">
            <span>Id: {id}</span>
            <span>Name: {box.name}</span>
            <a className="italic" href={`https://${id}.openvivi.com`}>OpenVVRT</a>
          </div>
          <div className="flex w-full sm:w-60 justify-between mt-4 xl:mt-0">
            <button className="text-white font-bold float-right bg-viviRed py-1.5 xl:px-8 rounded-full w-20 h-8 sm:w-30 xl:w-auto text-xs">Reboot</button>
            <button className="text-white font-bold float-right bg-viviRed py-1.5 xl:px-8 rounded-full w-20 h-8 sm:w-30 xl:w-auto text-xs">Poweroff</button>
          </div>
        </div>
        <div className="border-t border-grayBlue flex mt-3 pt-2 flex-col">
          <span className="font-itc text-lg">Customer</span>
          <span>Name: {box?.owner?.name || "Unassigned"}</span>
          <span>Email: {box?.owner?.email || "Undefined"}</span>
          <span>Telephone: {box?.owner?.phone || "Undefined"}</span>
        </div>
      </div>
      <div className="h-2/3 xl:h-3/5 w-11/12 xl:w-9/20 bg-darkBlue m-1">log service</div>
      <div className="h-2/3 xl:h-9/20 w-11/12 xl:w-9/20 bg-darkBlue m-1">stats system</div>
      <div className="h-2/3 xl:h-9/20 w-11/12 xl:w-9/20 bg-darkBlue m-1">service</div>
    </div>
  )
}

export default Box