import React, { useEffect, useState } from "react";
import Loader from "./loader";
import axios from "axios";
import { ExchangeCard } from "./Exchangecards";
import "../style/card.scss";

const Cards = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);



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
  

  return (
    <div className="exchanges">
      {loading ? (
        <Loader />
      ) : (
        exchanges.map((i) => (
          <div className="exchangesChild" key={i.id}>
            <ExchangeCard
              key={i._id}
              id={i._id}
              name={i.name}
              email={i.email}
              phone={i.phone}
              website={i.website}
              setUpdate={setUpdate}
            
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
