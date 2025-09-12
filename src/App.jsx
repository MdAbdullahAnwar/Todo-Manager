import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
// import Todos from "./pages/Todos";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        {/* <Todos /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
