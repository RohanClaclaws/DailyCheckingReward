import React from 'react'
import Coin from "../images/Coin.png"


function ExtraPrize({days,prize,id,cumulative,userid,extraClaimed}) {

    //* This code is for the Extra Prizes that user can claim

    const styleClass=cumulative>=days?'extra-prize can_claim':'extra-prize'
    console.log("Extra Claimed",extraClaimed);
    const clickedStyle=extraClaimed?'clicked_card':'none';

    async function extraClaim(){
        const body={
            id:userid,
            extraRewardId:id
        }
        const extraClaimData=await fetch("http://localhost:8080/v2/claclaws/user/extra/reward/claim",{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    "Accept":"application/json",
                  },
                body:JSON.stringify(body)
            })
        const jsonExtraClaimData=await extraClaimData.json();
        console.log("Extra Claim Data =>",jsonExtraClaimData)

        if(jsonExtraClaimData.code ===400){
            alert("Extra Reward Already Claimed by User")
        }
        else{
            alert("Extra Token Added to the Account")
        }
        
    }
    

    return (
    <>
    <div className={styleClass} onClick={extraClaim}>
          <div className={clickedStyle}>Clicked</div>
          <img src={Coin} />
          <span>X {prize}</span>
          <button >{days} Day</button>
        </div>
    </>
  )
}

export default ExtraPrize