import { useHistory, Link } from "react-router-dom"

const Header = () => {
  const history = useHistory()
  return (
    <header className="w-full h-16 bg-darkBlue text-white flex items-center justify-between text-xl">
      <img
        className="h-1/2 ml-5 cursor-pointer"
        src="/vivi_white_no_text.png"
        alt="VIVI logo no text"
        onClick={() => history.push('/')}
      />
      <div className="flex justify-evenly w-3/4 itc">
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
    </header>
  )
}

export default Header