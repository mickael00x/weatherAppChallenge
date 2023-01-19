export const fetchCities = async (search: string) => {
    const url = `https://places-dsn.algolia.net/1/places/query`;
    const res = await fetch(url)
        .then( response => response.json() )
        .then( data => {
            return data.hits
                .filter((item: any) => item.is_city)
                .map((i: any) => {
                return i.locale_names[0] + ', ' + i.country;
            });
        })
    return res;
  };