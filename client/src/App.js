import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./components/Home";
import Header from "../src/components/Header";
import MovieDetails from "./components/MovieDetails";
import ScrollToTop from "./components/ScrollToTop";
import ProfilePage from "./components/ProfilePage";
import Favorites from "./components/Favorites";
import ActorInfo from "./components/ActorInfo";
import IntroPage from "./components/IntroPage";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<IntroPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/actor/:actorId" element={<ActorInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
