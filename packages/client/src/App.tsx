import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/hello").then((res) => setMessage(res.data?.message || ""));
  }, []);

  return (
    <div className="p-4">
      <p className="text-3xl font-bold">{message}</p>
      <Button>Click</Button>
    </div>
  );
}

export default App;
