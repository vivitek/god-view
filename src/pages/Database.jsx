import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_BOXES, GET_USERS, DELETE_BOX, DELETE_USER } from "../utils/graphql"
import Trash from "../images/Trash"

const Database = () => {
  const [selectedTab, setSelectedTab] = useState("users")
  const [data, setData] = useState({
    users: {
      data: [],
      deleteCb: (id) => {
        deleteUser({variables: {id}})
        setData(old => {
          old["users"].data = old["users"].data.filter(user => user._id !== id)
          return old
        })
      }
  },
    boxes: {
      data: [],
      deleteCb: (id) => {
        deleteBox({variables: {id}})
        setData(old => {
          old["boxes"].data = old["boxes"].data.filter(box => box._id !== id)
          return old
        })
      }
    }
  })

  const { data: boxesData } = useQuery(GET_BOXES)
  const { data: usersData } = useQuery(GET_USERS)

  const [deleteUser] = useMutation(DELETE_USER)
  const [deleteBox] = useMutation(DELETE_BOX)


  const Tab = ({name}) => {
    return (
      <button
        className={"px-8 py-2 rounded-bl-xl rounded-br-xl mr-2 mb-4 focus:outline-none ".concat(name.toLocaleLowerCase() === selectedTab ? "bg-viviBlue-500 font-bold" : "bg-darkBlue")}
        onClick={() => setSelectedTab(name.toLocaleLowerCase())}
      > {name} </button>
    )
  }

  useEffect(() => {
    if (usersData)
      setData(old => {
        old["users"].data = usersData.getUsers
        return old
      })
    if (boxesData)
      setData(old => {
        old["boxes"].data = boxesData.getRouters
        return old
      })

  }, [usersData, boxesData])

  return (
    <div className="bg-grayBlue text-white flex flex-col h-full md:px-8">
      <div className="flex flex-row">
        <Tab name="Users"/>
        <Tab name="Boxes"/>
        <Tab name="Empty"/>
      </div>
      <div className="overflow-x-auto">
        {!data[selectedTab].data.length
          ? <div className="h-10">
              Nothing to show here
            </div>
          : <table className="w-full">
            <thead className="bg-viviBlue-500">{
              <tr>
                {Object.keys(data[selectedTab].data[0]).map((key, idx) =>
                    !key.startsWith('__') && <th key={idx} className="h-12 text-left pl-4">{key}</th>
                )}
                <th></th>
              </tr>
            }</thead>
            <tbody>
              {data[selectedTab].data.map((row, idx) => {
                return (
                  <tr key={idx} className={"h-10 ".concat(idx % 2 ? "bg-viviBlue-500" : "")}>
                    {Object.keys(row).map((key, idx) =>
                      !key.startsWith('__') && <td className="w-1/4 pl-4" key={idx}>{row[key]}</td>
                    )}
                    <th align="right" className="pr-4">
                      <button onClick={() => data[selectedTab].deleteCb(data[selectedTab].data[idx]._id)}>
                        <Trash color={"#68313f"} size={"30px"}/>
                      </button>
                    </th>
                  </tr>
                )
              })}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default Database