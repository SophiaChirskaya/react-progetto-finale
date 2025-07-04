
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";



const BooksPage = () => {
    // Variabili dello stato con le funzioni setter per aggiornamenti dello stato 
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [searchClicked, setSearchClicked] = useState(false);
    
    // URL dell'API dal file .env
    const apiLaravel = import.meta.env.VITE_API_URL;

    // Funzione per caricare i libri, opzionalmente filtrando per termine di ricerca
    const loadBooks = (searchTerm = "") => {
        setSearchError("");
        setLoading(true);

        const params = {};
        if (searchTerm.length > 0) {
            params.search = searchTerm;
        }

        axios.get(`${apiLaravel}`, { params })
        .then((resp) => {
            setBooks(resp.data.data);
            setNoResults(resp.data.data.length === 0 && searchTerm.length > 0);
            setInitialLoad(false);
            setLoading(false);
            
        })
        
        .catch((error) => {
            console.error("Error loading books:", error);
            setBooks([]);
            setNoResults(searchTerm.length > 0);
            setInitialLoad(false);
            setLoading(false);
          });
    };

    useEffect(() => {
        loadBooks(""); //carica tutti i libri all'inizio
    }, []);

    const handleSearch = () => {
        if (search.trim() === "") {
            setSearchError("Inserisci un titolo da cercare");
            setNoResults(false);
            setSearchClicked(true); //mostra il pulsante dopo la rocerca
            return;
        }
        loadBooks(search);
        setSearchClicked(true); //mostra il pulsante dopo la rocerca
    };

    const handleResetSearch = () => {
        setSearch("");
        loadBooks(""); //carica tutti i libri
        setSearchClicked(false); //nasconde il pulsante dopo il reset della ricerca
    };

    return (
        <>
        <div className="hero-img position-relative text-blue text-center">
            <img src="/images/hero.jpg" alt="hero" className="img-fluid w-100 hero-banner"/>
            <div className="hero-text position-absolute top-50 start-50 translate-middle">
                <h1>Il libro è un sogno che tieni tra le mani</h1>
                <h5>Neil Gaiman</h5>
            </div>
        </div>

        <div className="container mt-4">
            <h1 className="text-center mb-4 title-section">CATALOGO</h1>

            {/* Campo di ricerca */}

            <form onSubmit={(e) => {
                e.preventDefault();//evita il refresh della pagiina
                handleSearch();//richiama la tua funzione di ricerca
            }} className="d-flex justify-content-center my-3">

                <input className="form-control border border-secondary text-secondary w-25 m3"
                type="search"
                placeholder="Cerca un libro/un autore"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchError("");//cancella eventuale errore mentre scrivi
                }}/>
                <button className="btn btn-warning ms-2" type="submit">Cerca</button>
            </form>

            {/* Error message */}

            {searchError && (
                <p className="text-center text-danger mt-2">{searchError}</p>
            )}

            {/* Messaggio di caricamento */}
            {loading && <p className="text-center">Caricamento in corso</p> }

            {/* Nessun risultato trovato */}
            {!loading && noResults && !searchError && (
                <p className="text-center mt-4 text-blue fw-bold">Nessun autore o libro trovato</p>
            )}

            {/* Card sempre visibili */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-3">
                {books.map((book) => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>

            {/* Pulsante x vedere tutti i libri dopo il caricamento della risposta */}
            {!loading && searchClicked && !searchError && (
                <div className="text-center">
                    <button className="btn btn-warning mt-3" 
                    onClick={handleResetSearch}>Mostra tutti i libri</button>
                </div>
            )}
        </div>

        
        
        </>
    );

};
export default BooksPage;