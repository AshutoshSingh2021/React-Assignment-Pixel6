import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <>
      <div className="App bg-gray-100 min-h-screen p-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CustomerForm />}></Route>
            <Route path="/customers" element={<CustomerList />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
