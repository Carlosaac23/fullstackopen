import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { CounterContextProvider } from "./counter-context.jsx";

createRoot(document.getElementById("root")).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>,
);
