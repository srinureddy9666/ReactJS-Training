import React from 'react';
import Card from './card';

class Fetch extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoader: false,
    };
  }
  // searching for cities with 2/3 letter name
  // error handling
  // sending fetched data to app.js from there sending it to card.js

  //   componentDidMount() {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=d885aa1d783fd13a55050afeef620fcb`
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         let reponseData = [result];
  //         if (!result) {
  //           throw new Error('error in data fetching');
  //         }
  //         let dataToBeSaved = formatData(reponseData);
  //         const formatData = (data) => {
  //           let formattedArr = [];
  //           data.forEach((item) => {
  //             formattedArr.push({
  //               temperature:
  //                 item && item.main && item.main.temp ? item.main.temp : 0,
  //               weather:
  //                 item && item.weather && item.weather.length !== 0
  //                   ? item.weather[0].description
  //                   : '',
  //             });
  //           });
  //           return formattedArr;
  //         };
  //         this.setState({
  //           isLoader: true,
  //           data: dataToBeSaved,
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   }

  render() {
    // console.log(process.env.REACT_APP_API_KEY)
    const { data, isLoader } = this.state;
    const inputData = localStorage.getItem('input');
    const fetchHandle = () => {
      this.setState({
        ...this.state,
        isLoader: true,
      });
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          const formatData = (data) => {
            let formattedArr = [];
            data.forEach((item) => {
              formattedArr.push({
                temperature:
                  item && item.main && item.main.temp ? item.main.temp : 0,
                weather:
                  item && item.weather && item.weather.length !== 0
                    ? item.weather[0].description
                    : '',
              });
            });
            return formattedArr;
          };
          let reponseData = [result];
          if (!result) {
            throw new Error('error in data fetching');
          }
          let dataToBeSaved = formatData(reponseData);
          this.setState({
            ...this.state,
            isLoader: false,
            data: dataToBeSaved,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ ...this.state, isLoader: false });
        });
    };
    console.log(this.state);
    return (
      <>
        <div>
          <h4>Weather App</h4>
          {/* {isLoader ? data.weather.map((item) => item.description) : '...waiting'} */}
        </div>
        <Card fetchHandle={fetchHandle}>
          {!isLoader
            ? data.map((item) => {
                return (
                  <>
                    <span className='display'>{Math.floor(item.temperature-273.15)}{'\u00b0'}C</span><br/>
                    <span className='display'>{item.weather}</span>
                  </>
                );
              })
            : 'Data Loading in Progress'}
        </Card>
      </>
    );
  }
}

export default Fetch;
