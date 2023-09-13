import React, { useEffect, useState } from 'react';
import prize from "../images/Coin.png";

//* On Click the Cumulation and also the History of Claim changes and that changes also we need to reflect on parent so we use callback function to pass data from children to parent
function Card({index,changeCumulative,tokenprize,clickedCard,changeActiveHistory,todayDate}) {
  const [token, setToken] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);


  async function claimReward() {
    const databody = {
      // User ID
      id: '64f8a4c72a6311ea3b23b5ef',
      token: tokenprize,
      date:todayDate,
    };

    const data = await fetch("http://localhost:8080/v2/claclaws/user/reward/claim", {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(databody)
    });

    const jsonData = await data.json();
    console.log(jsonData);
    
    if (jsonData.code === 201) {
      setClaimSuccess(true);
    }
    changeActiveHistory(jsonData.data.monthHistory);
    changeCumulative(jsonData.data.cumulative);
  }
  

  const cardClassName = claimSuccess ? 'card card-success' : 'card';
  const clickedSymbol=clickedCard?'clicked_card':'clicked_card none';
  return (
    <>
    <div className={cardClassName} onClick={claimReward}>
      {
        claimSuccess?alert("claimed the reward already"):""
      }

      <div className={clickedSymbol}>Claimed</div>
      <div className="card-image">
        <img src={prize}  />
      </div>
      <div className="day-number">
        Day {index+1}
        <p>You can win  {tokenprize} token </p>
      </div>
    </div>
    </>
  );
}

export default Card;