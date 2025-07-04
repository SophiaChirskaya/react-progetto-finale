// importo i componenti del routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from "./layout/AppLayout"
import BooksPage from "./pages/BooksPage"
import SingleBook from "./pages/SingleBook"

function App() {
  

  return (
    <>
    {/* Inizializzo il router */}
    <BrowserRouter>
    <Routes>
      {/* AppLayout avvolge tutte le route figlie */}
      <Route element={<AppLayout />}>
      {/* Route per la home page che mostra il catalogo */}
      <Route path="/" element={<BooksPage />} />
      {/* Route dinamica per la pagina del singolo libro */}
      <Route path="/:id" element={<SingleBook />} />
      </Route>
    </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App
