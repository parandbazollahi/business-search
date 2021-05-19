import React, { useState } from "react";
import './App.css';
import axios from 'axios';


function App() {
  const [business, setBusiness] = useState("");
  const [results, setResult] = useState([]);
  function handleChange(event) {
    setBusiness(event.target.value);
  }
  function handleSubmit(event) {
    console.log(business);

    const url = "https://api.yelp.com/v3/businesses/search?term=" + business + "&location=naperville";
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${"M4-XEZ2URl4Nmlfw4LguStyz0qpY0yUQFefapGOJ5lOKyEb8_xTPFvEXey7KgI2_vR0VgiA5WU85jtLuefdLOMY-HtbOQLs19sJ6HGih3F79uaUcRrkr7nfMlvieYHYx"}`
      , 'Access-Control-Allow-Origin': "*", "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }
    axios.get(url).then(response => {
      console.log(response);
      setResult(response.data.businesses);
    });
  }
  function ShowDetails(event) {

    var tab = window.open('about:blank', '_blank');

    tab.document.write(event.target.parentElement.outerHTML.replace("</div><button class=\"detailButton\">Details</button><div class=\"details\">", ""));
  }
  return (
    <div className="App">
      <div className="container">
        <p className="title" >Business Search</p>
        <div className="form">
          <label className="label" htmlFor="header-search">
          </label>
          <input
            type="text"
            name="business"
            className="input"
            placeholder="Search business"
            onChange={handleChange}
          />
          <button type="submit" className="button" onClick={handleSubmit}>Search</button>
        </div>
        <div className="card-list">
          {results.map((business) =>
            <div className="card">
              <div><img className="card--image" width="auto" height="50%" alt={business.name} src={business.image_url}></img></div>
              <div><a className="name" href={business.url} target="_blank">{business.alias}</a></div>
              <button className="detailButton" onClick={ShowDetails}>Details</button>
              <div className="details">
                <div>Rating: {business.rating}</div>
                <div>Phone: {business.phone}</div>
                <div>Address: {business.location.display_address[0]}</div>
                <div>{business.location.display_address[1]}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
