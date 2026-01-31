import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/hello").then((res) => setMessage(res.data?.message || ""));
  }, []);

  return <p className="text-3xl font-bold">{message}</p>;
}

export default App;
