import React from "react"; // React'i import ediyoruz
import StartScreen from "./components/StartScreen"; // StartScreen komponentini import ediyoruz

function App() {
  return (
    <div className="app">
      <StartScreen /> {/* StartScreen komponentini burada render ediyoruz */}
    </div>
  );
}
export default App;
