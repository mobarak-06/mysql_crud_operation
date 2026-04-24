import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostIndex from "./PostIndex";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostIndex />} />
      </Routes>
    </>
  );
}

export default App;
