import axios from "axios";

const COUNTRIES_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const COUNTRY_URL = "https://studies.cs.helsinki.fi/restcountries/api/name";

export function getCountries() {
  const req = axios(COUNTRIES_URL);
  return req.then((res) => res.data);
}

export function getCountry(country) {
  const req = axios(`${COUNTRY_URL}/${country}`);
  return req.then((res) => res.data);
}
