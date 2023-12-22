import logo from './assets/themoviedb_logo.png';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <img src={logo} alt="The Movie Database Logo" width="50" height="50" />
                <a className="navbar-brand" href="#">The Movie Database</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Movies</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">TV Shows</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">People</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}