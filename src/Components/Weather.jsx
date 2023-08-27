

import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [city, setCity] = useState(''); // To show what we are entering
    const [search, setSearch] = useState('mumbai') // What we searching


    const InputVal = (e) => {

        let Val = e.target.value;
        setSearch(Val)

    }


    useEffect(() => {

        const FetchAPI = async () => {
            try {

                let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=73c604d1c335623b5f574390a02b4485`
                let API = await fetch(url);
                let Data = await API.json()
                setCity(Data.main);
                console.log(Data);

            } catch (error) {
                console.log(error);
            }
        }

        FetchAPI();

    }, [search])


    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search" className='fieldInput' onChange={InputVal} />
                </div>

                {!city? (
                <p>Error</p>
                ):(

                <div className="info">
                    <h2 className="location">
                        <i className='fas fa-street-view'></i>
                        {search}
                    </h2>
                    <h1 className='temp'>{city.temp}°C</h1>
                    <h3 className="tempmin_max">
                        Min : {city.temp_min}°C | Max : {city.temp_max}°C
                    </h3>
                </div>
                )}
            </div>
        </>
    );
}

export default Weather;
