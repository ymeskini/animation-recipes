import { Route, Routes } from "react-router";

import { Stepper } from "./animations/stepper.tsx";
import { Home } from "./animations/home.tsx";
import Email from "./animations/email.tsx";
import BookPage from "./animations/books.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stepper" element={<Stepper />} />
      <Route path="/email" element={<Email />} />
      <Route path="/books" element={<BookPage />} />
    </Routes>
  );
}

export default App;
