import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router";
import './App.css'
import CheckInsert from './pages/checkInsert';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< CheckInsert/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
