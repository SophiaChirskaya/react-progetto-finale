import { Link } from "react-router-dom";

// Componente BookCard che riceve un oggetto libro come prop
const BookCard = ({book}) => {
    // Recupera la variabile d'ambiente per il backend delle immagini
    const backendImg = import.meta.env.VITE_IMG_URL;
    // Costruisce l'URL dell'immagine del libro, usa una di default se non presente
    const imageUrl = book.image
    ? `${backendImg}/storage/${book.image}`
    : `${backendImg}/images/default.jpg`;

    return (
        <div className="card h-100 shadow-sm">
            {/* Immagine del libro con fallback in caso di errore */}
            <img src={imageUrl} alt={book.title || 'Immagine non disponibile'} className="card-img-top card-image"
            onError={(e) => {
                e.target.src = `${backendImg}/images/default.jpg`;
            }}/>

            <div className="card-body text-center">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-text"><strong>Autore</strong> {book.author}</p>
                <p className="card-text"><strong>Anno</strong> {book.year}</p>
                <p className="card-text"><strong>Genere</strong> {book.genre.name}</p>
                {/* Pulsante/link per andare alla pagina dei dettagli del libro */}
                <Link to={`/${book.id}`} className="btn btn-warning btn-sm">Dettagli</Link>
            </div>
        </div>
    );
};

export default BookCard;