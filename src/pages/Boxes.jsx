import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { GET_BOXES } from "../utils/graphql"
import Loading from "../images/Loading"
import Search from "../images/search"

const Card = ({ box }) => {
  const history = useHistory()
  const [online, setOnline] = useState(false)

  useEffect(() => {
    fetch(`https://${box._id}.openvivi.com`, {}).then(res => {
      if (res.status === 200)
        setOnline(true)
    })
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div href={`/box/${box._id}`} className="bg-darkBlue w-72 h-auto max-h-48 m-4 rounded-xl p-4 shadow-xl">
      <div className="font-itc text-center h-1/6">{box.name}</div>
      <div className="h-5/6 flex flex-col">
        <span>Id: {box._id}</span>
        <span>Name: {box.name}</span>
        <div className="flex items-center">Online:
          <div className={`bg-${online ? "viviGreen" : "viviRed"} h-4 w-4 rounded-full ml-2`}></div>
        </div>
        <div className="w-full text-right">
          <button
            className="font-bold bg-viviBlue py-1.5 xl:px-8 rounded-full w-28 sm:w-40 h-8 text-md mt-4 shadow-lg"
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
      <div className="w-full h-16 p-4">
        <form>
          <div className="flex items-center placecontent-center md:float-right md:mr-6">
            <Search color="white" size="32"/>
            <input
              name="filter"
              type="text"
              className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none ml-4"
              onChange={(event) => {
                const filter = event.target.value?.toLocaleLowerCase()
                setFilteredBoxes(boxes.filter(e => {
                  return e._id.toLocaleLowerCase().includes(filter) || e.name.toLocaleLowerCase().includes(filter)
                }))
              }}
            />
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