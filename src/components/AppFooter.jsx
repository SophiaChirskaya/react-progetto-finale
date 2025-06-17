const AppFooter = () => {
    return (
        <footer className="footer text-center text-blue mt-5">
            <div className="container">
                <p className="mb-1" style={{ fontSize: "1rem" }}>
                    &copy; {new Date().getFullYear()} L'Hybrary - Tutti i diritti riservati
                </p>

            </div>
        </footer>

    );
};

export default AppFooter;