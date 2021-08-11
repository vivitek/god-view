import { useHistory, Link } from "react-router-dom"

const Header = () => {
  const history = useHistory()
  return (
    <div className="w-full h-12 bg-darkBlue text-white flex items-center justify-between">
      <img
        className="h-1/2 ml-5 cursor-pointer"
        src="/vivi_white_no_text.png"
        alt="VIVI logo no text"
        onClick={() => history.push('/')}
      />
      <div className="flex justify-evenly w-3/4">
        <Link to="/box">Boxes</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/database">Database</Link>
      </div>
      <img
        className="h-1/2 mr-5 cursor-pointer"
        src="/vivi_white_no_text.png"
        alt="VIVI logo no text"
        onClick={() => {
          localStorage.removeItem('VIVI_godview_token')
          localStorage.removeItem('VIVI_godview_user')
          history.push('/login')
        }}
      />
    </div>
  )
}

export default Header