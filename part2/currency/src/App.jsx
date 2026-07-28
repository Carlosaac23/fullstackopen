import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log("effect run, currency is now", currency);

    if (currency) {
      console.log("fetching exchange rates...");
      axios(`https://open.er-api.com/v6/latest/${currency}`).then((res) =>
        setRates(res.data.rates),
      );
    }
  }, [currency]);

  const handleChange = ({ target }) => setValue(target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrency(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre>{JSON.stringify(rates, null, 2)}</pre>
    </div>
  );
}
