import React from 'react'
import { useEffect, useState } from 'react';
import Card from "../components/Card"
import ExtraPrize from './ExtraPrize';


function GameDaily() {

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [numberofDaysInaMonth, setNumberOfDaysInAMonth] = useState(null)
  const [cumulativeDays, setCumulativeDays] = useState(0)
  const [tokenInMonth, setTokenInMonth] = useState([]);
  const [activedays, setActiveDays] = useState([]);
  const [extraReward, setExtraReward] = useState([]);
  const [extraRewardHistory, setExtraRewardHistory] = useState([]);

  const userid = '64f8a4c72a6311ea3b23b5ef'
  const todayDate = date.getDate();


  useEffect(() => {
    async function fetchData() {
      const numberofDaysInaMonth = new Date(year, month + 1, 0).getDate();
      setNumberOfDaysInAMonth(numberofDaysInaMonth)
      // getCumulativeData()
      getLogDetails();
      setTokenInMonth(await rewardShow());
      setExtraReward(await extraRewardPrizes());
    }
    fetchData();
  }, [date, month, year])


  //* Function to get Month name
  const getMonthName = date => [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ][date.getMonth()];

  //^ Rendering Functions

  //* Function to get Extra Rewards Prizes and render them
  //* In the UI this used to show different days what prizing user can win
  async function extraRewardPrizes() {
    const extraRewardData = await fetch('http://localhost:8080/v2/claclaws/user/extraReward/list');
    const extraRewardJson = await extraRewardData.json();
    // console.log("Extra Reward Data =>",extraRewardJson)
    return extraRewardJson.data;
  }


  //* Function to get the what rewards he can win in a month
  async function rewardShow() {
    const currentDate = new Date();
    const monthName = getMonthName(currentDate);
    const year = currentDate.getFullYear();

    //* Api Route If the admin wants to change the sequence or add rules in what rewards can be shown in a month
    const tokendata = await fetch('http://localhost:8080/v2/claclaws/user/month/rewards', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        month: monthName,
        year: year
      })
    })
    const tokenvalue = await tokendata.json();
    // console.log("Token Value :",tokenvalue)
    // console.log("Token Array :", tokenvalue.data.rewardValues.monthArray)
    return tokenvalue.data.rewardValues.monthArray;
  }

  //^ Rendering Functions End

  //* Function to get the log Details of the logged in User Using the Id which we can get from authorization
  async function getLogDetails() {
    const parameters = {
      id: userid
    }

    let logDetails = await fetch('http://localhost:8080/v2/claclaws/user/daily/logdetails', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
      },
      body: JSON.stringify(parameters)
    })

    const jsonData = await logDetails.json();
    console.log("Log Details =>", jsonData)

    //* If log Details Exists, If it doesn't exists everything is default that is cumulative=0, monthHistory=[], ExtraReward that a given user can claim in a month= []
      setExtraRewardHistory(jsonData.extraRewards);
      setActiveDays(jsonData.monthHistory);
      setCumulativeDays(jsonData.cumulative);
    
  }

  //* Parent function to change the cumulation days in Parent by click in child component card
  function changeCumulative(days) {
    console.log("Days he has cumulation :", days)
    setCumulativeDays(days)
  }

  //* Parent function to change the active history day in Parent by click in child component card
  //* To known which date is claimed or not
  function changeActiveHistory(arrayData) {
    // console.log(arrayData);
    setActiveDays(arrayData);
  }



  return (
    <div className="App">
      <h1 className='calendar-header'>Calendar Reward Feature</h1>
      <div >
        <h2>Recieve extra rewards for accumulated check in !</h2>
      </div>
      <div className='calendar-extra-prize'>
        <h2>Checked in {cumulativeDays} Day(s) this month</h2>

        {
          extraReward.sort((a, b) => {
            return a.day - b.day
          }).map((value, index) => {
            const checkIfExtraClaimed = extraRewardHistory.includes(value._id);
            return <ExtraPrize key={index}
              days={value.day} prize={value.token} id={value._id}
              cumulative={cumulativeDays} userid={userid} extraClaimed={checkIfExtraClaimed} />
          })

        }

      </div>
      <div className="calendar-container">

        <div className="calendar-body">

          <ul className="calendar-dates">

            {
              Array.from({ length: numberofDaysInaMonth }, (value, index) => {
                const clickedDays = activedays.includes(String(index + 1));
                // console.log("Index => ",index+1 , clickedDays);
                return <li className={todayDate === index + 1 ? 'active' : 'inactive'} key={index}>
                  {/* //* Clicked Card for true false to change css dynamically */}
                  <Card index={index} changeCumulative={changeCumulative}
                    tokenprize={tokenInMonth[index]} clickedCard={clickedDays}
                    changeActiveHistory={changeActiveHistory} todayDate={todayDate} />
                </li>
              })

            }
          </ul>
        </div>
      </div>

    </div>
  );
}

export default GameDaily