import './Header.css'

function Header() {
    return (
        <header className="Header">
          <a href="/">Home page</a>
          <a href="/logs">API & Traefik logs</a>
          <a href="/statistics">Statistics</a>
          <a href="/database">Databse edition/view</a>
        </header>
    )
}

export default Header