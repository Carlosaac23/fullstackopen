import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import AnecdoteList from "./components/anecdote-list";
import About from "./components/about";
import Footer from "./components/footer";
import AnecdoteForm from "./components/anecdote-form";

export default function App() {
  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>

        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList />} />
          <Route path="/create" element={<AnecdoteForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
