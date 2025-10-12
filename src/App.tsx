import { Route, Routes } from "react-router";

import Stepper from "./animations/stepper.tsx";
import Home from "./animations/home.tsx";
import Email from "./animations/email.tsx";
import BookPage from "./animations/books.tsx";
import Header from "./animations/header.tsx";
import Carousel from "./animations/carousel.tsx";
import ResizablePanel from "./animations/resizable-panel.tsx";
import Calendar from "./animations/calendar.tsx";
import PlanSelection from "./animations/price.tsx";
import Layout from "./Layout.tsx";

import Components from "./animations/components/index.tsx";
import SelectorGroup from "./animations/components/selector-group.tsx";
import Switch from "./animations/components/switch.tsx";
import Slider from "./animations/components/slider.tsx";
import Toast from "./animations/components/toast.tsx";
import Like from "./animations/components/like.tsx";
import ShimmerButton from "./animations/components/shimmer-button.tsx";
import Oscillate from "./animations/components/oscillate/index.tsx";
import TwistBar from "./animations/components/twist-bar.tsx";
import BouncingBalls from "./animations/components/bouncing-balls.tsx";
import CursorSparkle from "./animations/components/sparkle.tsx";
import RocketParticles from "./animations/components/rocket-particles.tsx";
import MousePosition from "./animations/components/mouse-position.tsx";
import Reveal from "./animations/components/reveal.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stepper" element={<Stepper />} />
        <Route path="email" element={<Email />} />
        <Route path="books" element={<BookPage />} />
        <Route path="header" element={<Header />} />
        <Route path="carousel" element={<Carousel />} />
        <Route path="resizable-panel" element={<ResizablePanel />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="price" element={<PlanSelection />} />
        <Route path="components" element={<Components />}>
          <Route path="switch" element={<Switch />} />
          <Route path="selector-group" element={<SelectorGroup />} />
          <Route path="slider" element={<Slider />} />
          <Route path="toast" element={<Toast />} />
          <Route path="like" element={<Like />} />
          <Route path="shimmer-button" element={<ShimmerButton />} />
          <Route path="oscillate" element={<Oscillate />} />
          <Route path="twist-bar" element={<TwistBar />} />
          <Route path="bouncing-balls" element={<BouncingBalls />} />
          <Route path="sparkle" element={<CursorSparkle />} />
          <Route path="rocket-particles" element={<RocketParticles />} />
          <Route path="mouse-position" element={<MousePosition />} />
          <Route path="reveal" element={<Reveal />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
