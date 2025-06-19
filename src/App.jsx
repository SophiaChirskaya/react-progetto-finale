import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from "./layout/AppLayout"
import BooksPage from "./pages/BooksPage"
import SingleBook from "./pages/SingleBook"

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
      <Route path="/" element={<BooksPage />} />
      <Route path="/:id" element={<SingleBook />} />
      </Route>
    </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App
