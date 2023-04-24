import React, { useEffect, useState } from "react";
import Loader from "./loader";
import axios from "axios";
import { ExchangeCard } from "./Exchangecards";
import "../style/card.scss";

const Cards = () => {
  const [exchanges, setExchanges] = useState([]);    //for user array
  const [loading, setLoading] = useState(true);    //for loader
  const [update, setUpdate] = useState(false);     // used in usestate to refresh

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          "https://bytive-backend-ujf1.onrender.com/api/v1/users"
        );

        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [update]);


  //function to filter the user 
  // const handleDeleteExchange = (id) => {
  //   const updatedExchanges = exchanges.filter(
  //     (exchange) => exchange._id !== id
  //   );
  //   setExchanges(updatedExchanges);
  // };

  
  return (
    <div className="exchanges">
      {loading ? (
        <Loader />
      ) : (
        exchanges.map((i) => (
          <div className="exchangesChild" key={i.id}>
            <ExchangeCard
              i={i}
              key={i._id}
              id={i._id}
              name={i.name}
              email={i.email}
              phone={i.phone}
              website={i.website}
              setUpdate={setUpdate}
              // handleDeleteExchange={handleDeleteExchange}   
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
