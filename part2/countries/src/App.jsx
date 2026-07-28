import { useEffect, useState } from "react";
import { getCountries } from "./services/countries";
import Country from "./components/country";

export default function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then((returnedCountries) => setCountries(returnedCountries));
  }, []);

  const handleOnChange = ({ target }) => setInput(target.value);

  const filteredCountries = input
    ? countries.filter((country) => country.name.common.toLowerCase().includes(input.toLowerCase()))
    : countries;

  const handleCountryInfo = (country) => setInput(country.name.common);

  return (
    <div>
      <p>
        find countries <input type="text" value={input} onChange={handleOnChange} />
      </p>
      <div>
        {!input ? (
          <p>search your country</p>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, be more specific</p>
        ) : filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          filteredCountries.map((country) => (
            <div key={country.cca3}>
              <p>
                {country.name.common}{" "}
                <button onClick={() => handleCountryInfo(country)}>show</button>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
