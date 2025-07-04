// Importo NavLink da react-router-dom per la navigazione tra le pagine senza ricaricare la pagina.
import { NavLink } from "react-router-dom";

// Definisco il header
const AppHeader = () => {

    // Array di oggetti ognuno con il proprio path e title
    const navLinks = [
        {
            path: "/",
            title: "Home",
        },
    ];

    // Ritorno il mark-up JSX dell'header
    return (
        <header>

            {/* Barra di navigazione */}
        <nav className="navbar navbar-expand-lg header">
            <div className="container-fluid">

                {/* Link per tornare alla Home */}
                <NavLink className="navbar-brand text-blue" to="/">L'HYBRARY</NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* map sui link di navigazione per generarli automaticamente */}
                        {navLinks.map((curItem, index) => (
                            <li className="nav-item" key={index}>
                                <NavLink className="nav-link" aria-current="page"
                                to={curItem.path}>{curItem.title}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>    
        </header>
    )
}

export default AppHeader;