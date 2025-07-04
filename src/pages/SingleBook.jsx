import { useParams, Link } from "react-router-dom"; 
import { useState, useEffect } from "react";
import axios from "axios";



const SingleBook = () => {
    // Ottengo l'id del libro dalla URL
    const { id } = useParams();
    // Stato per il libro singolo e per il caricamento
    const [singleBook, setSingleBook] = useState(null);
    const [loading, setLoading] = useState(true);

    //Recupero le variabili d'ambiente per le API e le immagini
    const apiLaravel = import.meta.env.VITE_API_URL;
    const backendImg = import.meta.env.VITE_IMG_URL;
    
    // Effettua una richiesta GET per ottenere i dettagli del libro singolo
    // e aggiorna lo stato con i dati ricevuti
    useEffect(() => {
        setLoading(true); //imposta lo stato di caricamento a true
        axios.get(`${apiLaravel}/${id}`).then((resp) => {
            // Salva i dati del libro singolo nello stato
            setSingleBook(resp.data.data);
            setLoading(false); //Fine caricamento e quindi i dati sonoo stati ricevti
        }).catch((error) => {
            // Logga gli eventuali errori
            console.error("Error loading single book:", error);
            setLoading(false); //imposta lo stato di caricamento a false anche in caso di errore
        });
    }, [id]);

    // Mostra un messaggio di caricamento mentre i dati sono in fase di recupero
    if (loading) {
        return <div className="text-center mt-5">Caricamento</div>
    }

    // Se il libro non è stato trovato, mostra un messaggio di errore

    if (!singleBook) {
        return <div className="text-center mt-5">Libro non trovato</div>
    }

    // Costruisce l'URL dell'immagine del libro, usa una di default se non presente
    const imageUrl = singleBook.image
    ? `${backendImg}/storage/${singleBook.image}`
    : `${backendImg}/images/default.jpg`;

    return(
        <>
        <div className="book-details mt-5 mb-5">
            {/* Pulsante per tornare alla Home */}
            <div className="text-start mb-4">
                <Link to="/" className="back-icon">
                <i className="bi bi-arrow-left-circle-fill fs-2"></i>
                </Link> 
            </div>

            {/* Immagine del libro */}
            <div className="text-center mb-4">
                <img src={imageUrl} alt={singleBook.title} className="img-fluid rounded" 
                style={{ maxHeight: "400px" }} onError={(e) => {
                    e.target.src = `${backendImg}/images/default.jpg`;
                }} />

            </div>

            {/* Dettaglio del libro */}
            <h2 className="text-center">{singleBook.title}</h2>
            <h5 className="text-center"><strong>Autore:</strong> {singleBook.author}</h5>
            <p className="text-center"><strong>Anno:</strong> {singleBook.year}</p>
            <p className="lead text-center">{singleBook.content || "Nessuna sinossi disponibile"}</p>

            <hr />
            {/* Badge con i tipi del libro */}
            {singleBook.types && singleBook.types.length > 0 && (
                <div className="text-center mt-3">
                    {singleBook.types.map((type) => (
                        <span key={type.id} className="badge bg-info text-dark me-2">
                            {type.name}
                        </span>
                    ))}

                </div>
            )}

            

        </div>
        </>
    );
};

export default SingleBook;