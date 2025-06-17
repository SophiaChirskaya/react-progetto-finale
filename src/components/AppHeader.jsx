import { NavLink } from "react-router-dom";

const AppHeader = () => {
    const navLinks = [
        {
            path: "/",
            title: "Home",
        },
    ];

    return (
        <header>

        <nav className="navbar navbar-expand-lg header">
            <div className="container-fluid">
                <a className="navbar-brand text-blue" href="#">L'HYBRARY</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navLinks.map((curItem, index) => {
                            <li className="nav-item" key={index}>
                                <NavLink className="nav-link" aria-current="page"
                                to={curItem.path}>{curItem.title}</NavLink>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </nav>    
        </header>
    )
}

export default AppHeader;