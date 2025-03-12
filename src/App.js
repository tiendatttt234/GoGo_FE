import "./App.css";
import "./styles/filter.css";
import Layout from "./components/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Layout />
      <Analytics />
    </>
  );
}

export default App;
