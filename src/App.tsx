import { Route, Routes } from "react-router";

import { Stepper } from "./animations/stepper.tsx";
import { Home } from "./animations/home.tsx";
import Email from "./animations/email.tsx";
import BookPage from "./animations/books.tsx";
import { Header } from "./animations/header.tsx";
import { Carousel } from "./animations/carousel.tsx";
import ResizablePanel from "./animations/resizable-panel.tsx";
import Calendar from "./animations/calendar.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stepper" element={<Stepper />} />
      <Route path="/email" element={<Email />} />
      <Route path="/books" element={<BookPage />} />
      <Route path="/header" element={<Header />} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path="/resizable-panel" element={<ResizablePanel />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
