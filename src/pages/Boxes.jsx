import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { GET_BOXES } from "../utils/graphql"
import Loading from "../images/Loading"
import ReactTooltip from 'react-tooltip';

const Card = ({ box }) => {
  const history = useHistory()
  const [online, setOnline] = useState(false)

  useEffect(() => {
    if (process.env["NODE_ENV"] && process.env["NODE_ENV"] !== "production") {
      setOnline(Boolean(Math.trunc(Math.random() * 2)))
      return
    }
    fetch(`https://${box._id}.openvivi.com`, {}).then(res => {
      if (res.status === 200)
        setOnline(true)
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div href={`/box/${box._id}`} className="bg-darkBlue p-6 w-80 mt-2 md:mb-0  mx-4 mb-4 md:mb-8 lg:mx-0 md:min-h-80 md:w-80 md:max-h-96 h-auto rounded-xl transform transition-all duration-150 hover:scale-105 group">
      <div className="w-full flex justify-between">
        <p data-tip data-for={box.name} className="w-full text-lg text-center font-itc text-bold color-red capitalize">{box.name.slice(0, 19)}</p>
        <ReactTooltip id={box.name} effect="solid"><p>{box.name}</p></ReactTooltip>
      </div>
      <div className="h-5/6 flex flex-col">
        <div className="mt-5 flex justify-between">
          <h4 className="capitalize text-lg">ID :</h4>
          <p data-tip data-for={box._id} className="text-lg">{box._id.slice(0, 19)}</p>
          <ReactTooltip id={box._id} effect="solid"><p>{box._id}</p></ReactTooltip>
        </div>
        <div className="mt-2 flex justify-between">
          <h4 className="capitalize text-lg">URL :</h4>
          <p data-tip data-for={box.url} className="text-lg">{box.url.slice(0, 19)}</p>
          <ReactTooltip id={box.url} effect="solid"><p>{box.url}</p></ReactTooltip>
        </div>
        <div className="mt-2 flex justify-between">Online :
          <div className={`bg-${online ? "green-500" : "red-500"} h-4 w-4 rounded-full ml-2`}></div>
        </div>
        <div className="w-full text-right">
          <button
            className="bg-viviYellOrange text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold text-base mt-2"
            onClick={() => history.push(`/box/${box._id}`)}
          >Details</button>
        </div>
      </div>
    </div>
  )
}

const Boxes = () => {
  const { error, data } = useQuery(GET_BOXES)
  const [loading, setLoading] = useState(true)
  const [boxes, setBoxes] = useState()
  const [filteredBoxes, setFilteredBoxes] = useState([])
  const history = useHistory()

  useEffect(() => {
    if (data) {
      setBoxes(data.getRouters)
      setFilteredBoxes(data.getRouters)
      setLoading(false)
    }
  }, [data])

  if (error) {
    toast.error("An error occured while retrieving boxes.")
    history.push('/')
  }
  if (loading)
    return <Loading color="white" />
  return (
    <div className="bg-grayBlue text-white flex flex-row flex-wrap justify-evenly">
      <div className="w-full h-auto p-4 m-2">
        <form>
          <div className="flex items-center placecontent-center md:float-right md:mr-6">
            <div className="flex items-center w-full">
              <label className="text-white text-base font-medium mr-2">Search</label>
              <input
                className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                onChange={(event) => {
                  const filter = event.target.value?.toLocaleLowerCase()
                  setFilteredBoxes(boxes.filter(e => {
                    return e._id.toLocaleLowerCase().includes(filter) || e.name.toLocaleLowerCase().includes(filter)
                  }))
                }}
                name="filter"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
      {filteredBoxes.map((box, idx) => {
        return <Card key={idx} box={box} />
      })}
    </div>
  )
}

export default Boxes