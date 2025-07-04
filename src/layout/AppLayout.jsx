// Importo Outlet per il rendering delle route figlie
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

// Componente layout principale dell'applicazione
const AppLayout = () => {
    return (
        <>
        <AppHeader />
        {/* Main content: qui vengono renderizzate le pagine figlie tramite Outlet */}
        <main>
            <Outlet />
        </main>
        <AppFooter />
        </>
    );
};

export default AppLayout;