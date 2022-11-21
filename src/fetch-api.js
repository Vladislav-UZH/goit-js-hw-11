const API_LINK = 'https://restcountries.com'

function onFetchData(countries) {
    return fetch(`${API_LINK}/v3.1/name/${countries}?fields=name,capital,population,flags,languages`)
        .then(r => {
            if (!r.ok) {
                throw new Error(r.status);
            };
            return r.json();
        })
}
export default onFetchData;