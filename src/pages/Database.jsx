import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_BOXES, GET_USERS, DELETE_BOX, DELETE_USER, CREATE_BOX, CREATE_USER } from "../utils/graphql"
import UserForm from "../components/Database/User"
import BoxForm from "../components/Database/Box"
import { toast } from "react-toastify"
import { Table, Close } from "@vivitek/toolbox"

const Database = () => {
  const [selectedTab, setSelectedTab] = useState("users")

  const { data: boxesData, refetch: refetchBoxes } = useQuery(GET_BOXES)
  const { data: usersData, refetch: refetchUsers } = useQuery(GET_USERS)

  const [createUser] = useMutation(CREATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)
  const [createRouter] = useMutation(CREATE_BOX)
  const [deleteBox] = useMutation(DELETE_BOX)

  const config = {
    users: {
      deleteCb: (id) => {
        deleteUser({ variables: { id } })
        setData(old => {
          old["users"].data = old["users"].data.filter(user => user._id !== id)
          return old
        })
      },
      formComponent: <UserForm
        callback={async values => {
          try {
            await createUser({ variables: { userCreationData: values } })
            await refetchUsers()
            toast.info('User have been created !')
          } catch {
            toast.error('An error occured.')
          }
          setSelectedTab('users')
        }
        } />,
      tableHeader: [{
        name: "_id",
        cellClassName: "",
        headerClassName: "text-left"
      }, {
        name: "username",
        cellClassName: "h-12",
        headerClassName: "",
      }, {
        name: "email",
        cellClassName: "h-12",
        headerClassName: "align-left",
      }, {
        name: 'actions',
        cellClassName: "h-12 text-center",
        headerClassName: "text-center"
      }]
    },
    boxes: {
      deleteCb: (id) => {
        deleteBox({ variables: { id } })
        setData(old => {
          old["boxes"].data = old["boxes"].data.filter(box => box._id !== id)
          return old
        })
      },
      formComponent: <BoxForm
        callback={async values => {
          try {
            await createRouter({ variables: { routerCreationData: values } })
            await refetchBoxes()
          } catch {
            toast.error('An error occured.')
          }
          setSelectedTab("boxes")
        }}
      />,
      tableHeader: [{
        name: "_id",
        cellClassName: "",
        headerClassName: "text-left"
      }, {
        name: "name",
        cellClassName: "h-12 ",
        headerClassName: "",
      }, {
        name: "url",
        cellClassName: "h-12",
        headerClassName: "",
      }, {
        name: 'actions',
        cellClassName: "h-12 items-center",
        headerClassName: ""
      }]
    }
  }

  const [data, setData] = useState({
    users: {
      data: []
    },
    boxes: {
      data: []
    }
  })

  const Tab = ({ name }) => {
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
        <Tab name="Users" />
        <Tab name="Boxes" />
        <Tab name="Create ressource" />
      </div>
      {selectedTab === "create ressource"
        ? <div className="w-full h-full items-center flex flex-col xl:flex-row justify-around">
          {Object.keys(config).map(key => {
            return config[key].formComponent
          })}
        </div>
        : <div className="overflow-x-auto">
          {!data[selectedTab].data.length
            ? <div className="h-10">
              Nothing to show here
              </div>
            : <Table
              className=""
              itemsPerPage={15}
              headers={config[selectedTab].tableHeader}
              data={data[selectedTab].data.map(e => ({
                ...e,
                actions: (
                  <button
                    onClick={async () => {
                      config[selectedTab].deleteCb(e._id);
                    }}
                  >
                    <Close color="white" size={20} />
                  </button>
                )}))}
            />
          }
        </div>
      }
    </div>
  )
}

export default Database
