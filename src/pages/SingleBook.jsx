import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import Icons from "./components/Icons";


const SingleBook = () => {
    const { id } = useParams();
    const [singleBook, setSingleBook] = useState(null);
    const [loading, setLoading] = useState(true);

    //API
    const apiLaravel = import.meta.env.VITE_API_URL;
    const backendImg = import.meta.env.VITE_IMG_URL;

    useEffect(() => {
        setLoading(true); //imposta lo stato di caricamento a true
        axios.get(`${apiLaravel}/${id}`).then((resp) => {
            setSingleBook(resp.data.data);
            setLoading(false); //imposta lo stato di caricamento a false quando i dati sono stati ricevti
        }).catch((error) => {
            console.error("Error loading single book:", error);
            setLoading(false); //imposta lo stato di caricamento a false anche in caso di errore
        });
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Caricamento</div>
    }

    if (!singleBook) {
        return <div className="text-center mt-5">Libro non trovato</div>
    }

    const imageUrl = singleBook.image
    ? `${backendImg}/storage/${singleBook.image}`
    : `${backendImg}/images/default.jpg`;

    return(
        <>
        <div className="book-details mt-5 mb-5">
            <div className="text-start mb-4">
                <Link to="/" className="back-icon">
                <i className="bi bi-arrow-left-circle-fill fs-2"></i>
                </Link> 
            </div>

            <div className="text-center mb-4">
                <img src={imageUrl} alt={singleBook.title} className="img-fluid rounded" 
                style={{ maxHeight: "400px" }} onError={(e) => {
                    e.target.src = `${backendImg}/images/default.jpg`;
                }} />

            </div>

            <h2 className="text-center">{singleBook.title}</h2>
            <h5 className="text-center"><strong>Autore:</strong> {singleBook.author}</h5>
            <p className="text-center"><strong>Anno:</strong> {singleBook.year}</p>
            <p className="lead text-center">{singleBook.content || "Nessuna sinossi disponibile"}</p>

            <hr />
            {singleBook.types && singleBook.types.length > 0 && (
                <div className="text-center mt-3">
                    {singleBook.types.map((type) => (
                        <span key={type.id} className="badge bg-info text-dark me-2">
                            {type.name}
                        </span>
                    ))}

                </div>
            )}

            {/* <Icons /> */}

        </div>
        </>
    );
};

export default SingleBook;