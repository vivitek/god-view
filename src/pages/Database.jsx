import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_BOXES, GET_USERS } from "../utils/graphql"

const Database = () => {
  const [selectedTab, setSelectedTab] = useState("users")
  const [data, setData] = useState({
    users: [],
    boxes: [],
    empty: []
  })

  const { data: boxesData } = useQuery(GET_BOXES)
  const { data: usersData } = useQuery(GET_USERS)

  const Tab = ({name}) => {
    return (
      <button
        className={"px-8 py-2 rounded-bl-xl rounded-br-xl mr-2 mb-4 ".concat(name.toLocaleLowerCase() === selectedTab ? "bg-viviBlue-500 font-bold" : "bg-darkBlue")}
        onClick={() => setSelectedTab(name.toLocaleLowerCase())}
      > {name} </button>
    )
  }

  useEffect(() => {
    if (usersData)
      setData(old => {
        old["users"] = usersData.getUsers
        return old
      })
    if (boxesData)
      setData(old => {
        old["boxes"] = boxesData.getRouters
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
        {!data[selectedTab].length
          ? <div className="h-10">
              Nothing to show here
            </div>
          : <table className="w-full">
            <thead className="bg-viviBlue-500">{
              <tr>
                {Object.keys(data[selectedTab][0]).map((key, idx) =>
                    !key.startsWith('__') && <th key={idx} className="h-12 text-left pl-4">{key}</th>
                )}
              </tr>
            }</thead>
            <tbody>
              {data[selectedTab].map((row, idx) => {
                return (
                  <tr key={idx} className={"h-10 ".concat(idx % 2 ? "bg-viviBlue-500" : "")}>
                    {Object.keys(row).map((key, idx) =>
                      !key.startsWith('__') && <td className="w-1/4 pl-4" key={idx}>{row[key]}</td>
                    )}
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