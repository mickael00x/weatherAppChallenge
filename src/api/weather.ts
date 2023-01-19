
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
export const fetchWeatherDataApi = async (city: string, onlyCity: boolean | { coord: { lng: string, lat: string } } ) => {
    let url = `${baseUrl}/find?q=${city}&appid=b6723500af8986c97fc18f609eb0eccd&units=metric&limit=5`;
    if(onlyCity) {
        url = `${baseUrl}/find?q=${city}&appid=b6723500af8986c97fc18f609eb0eccd&units=metric&limit=5`;
    }
    if((await fetch(url)).status != 404) {
        return await (await fetch(url)).json();
    }
};



