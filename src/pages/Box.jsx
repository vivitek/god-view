import { useParams } from "react-router-dom"

const Box = () => {
  const { uuid } = useParams()
  return (
    <div className="bg-grayBlue text-white h-auto">
      box {uuid}
    </div>
  )
}

export default Box