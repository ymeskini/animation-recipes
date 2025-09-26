import { Route, Routes } from "react-router";

import { Stepper } from "./animations/stepper.tsx";
import { Home } from "./animations/home.tsx";
import Email from "./animations/email.tsx";
import BookPage from "./animations/books.tsx";
import { Header } from "./animations/header.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stepper" element={<Stepper />} />
      <Route path="/email" element={<Email />} />
      <Route path="/books" element={<BookPage />} />
      <Route path="/header" element={<Header />} />
    </Routes>
  );
}

export default App;
