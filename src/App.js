import { useEffect, useState } from 'react';
import './App.css';
import GameDaily from './components/GameDaily';
import { Route, Routes, } from 'react-router-dom';
import Prize from './components/Prize';
import Calendar from './components/Calendar';


// function App() {

//   const [date, setDate] = useState(new Date());
//   const [month, setMonth] = useState(new Date().getMonth());
//   const [year, setYear] = useState(new Date().getFullYear());

//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   const [calendar, setCalendar] = useState([]);

//   // Return the Day from 0 to 6 0:Sunday,1:Monday and so on
//   // Whats the firstday of the month Sunday, Monday and so on represented using 0-6
//   let dayone = new Date(year, month, 1).getDay();
//   // Last Date of Month ex 31,30,28 etc
//   // Zero is for example zero day of the month is one day before the month start that the last day of previous month
//   let lastDate = new Date(year, month + 1, 0).getDate();

//   // Get the day of the last date of the month
//   // Whats the firstday of the month Sunday, Monday and so on represented using 0-6
//   let dayend = new Date(year, month, lastDate).getDay();

//   // Get the Last date of the previous month
//   let monthlastdate = new Date(year, month, 0).getDate();


//   // console.log("First Day",dayone);
//   // console.log("Last Date",lastDate)
//   // console.log("Day end",dayend);
//   // console.log("Month last date",monthlastdate)

//   //* Function for Changing months
//   useEffect(() => {
//     let calendar = manipulate();
//     setCalendar(calendar)
//   }, [date,month,year])
  
//   // console.log(calendar)


//   function changeMonth(direction) {
//     if(direction ==='prev'){
//         if(month ==0){
//           setYear(year - 1);
//           setMonth(11);
//         }
//         else{
//           setMonth(month-1)
//         }
//     }

//     if(direction==='next'){
//       if(month===11){
//         setYear(year+1);
//         setMonth(1)
//       }else{
//         setMonth(month+1)
//       }
//     }

//   }

//   function manipulate() {
//     let array = [];
//     // let lit="";
//     //* Display left days in the current calendar for previous month
//     for (let i = dayone; i > 0; i--) {
//       // lit=""
//       // lit+=`<li class='inactive'> $}</li>`
//       array.push(monthlastdate - i + 1)
//     }

//     //* Display the days of the current month on Calendar
//     for (let i = 1; i <=lastDate; i++) {
//       //* Checking for Today's Date
//       // let isToday=i===date.getDate() && month === new Date().getMonth() && year ===new Date().getFullYear()
//       // ? "active":"";
//       // lit=""
//       // lit+=`<li class='${isToday}'> ${i}</li>`
//       array.push(i);
//     }

//     //* Display the left days of the next month on Calendar
//     for (let i = dayend; i < 6; i++) {
//       // lit="";
//       // lit+=`<li class='inactive'>${i-dayend+1}</li>`
//       array.push(i - dayend + 1);
//     }
//     return array
//   }


//   return (
//     <div className="App">
//       <h1 style={{ textAlign: 'center' }}>Calendar Reward Feature</h1>
//       <div class="calendar-container">

//         <header class="calendar-header">
//           <p class="calendar-current-date">{months[month]} {year}</p>
//           <div class="calendar-navigation">
//             <span id="calendar-prev" onClick={()=>changeMonth('prev')}
//               class="material-symbols-rounded">
//               chevron_left
//             </span>
//             <span id="calendar-next" onClick={()=>changeMonth('next')}
//               class="material-symbols-rounded">
//               chevron_right
//             </span>
//           </div>
//         </header>

//         <div class="calendar-body">
//           <ul class="calendar-weekdays">
//             <li>Sun</li>
//             <li>Mon</li>
//             <li>Tue</li>
//             <li>Wed</li>
//             <li>Thu</li>
//             <li>Fri</li>
//             <li>Sat</li>
//           </ul>
//           <ul class="calendar-dates">
//             {
//               calendar.map((value, index) => (
//                 <li
//                 key={index}
//                 className={`
//                   ${index === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'active' : 'inactive'}
//                 `}
//               >
//                 {
//                   index===date.getDate() && month=== new Date().getMonth() && year === new Date().getFullYear() ?<Days value={value}/> :value
//                 }
//               </li>
//               ))
//             }
//           </ul>
//         </div>
//       </div>

//     </div>
//   );
// }

function App(){
  return (
    <>
      
      <Routes>
        <Route exact path='/' element={<GameDaily/>}> </Route>
        <Route exact path='/prize' element={<Prize/>}></Route>
        <Route exact path='/calendar' element={<Calendar/>}></Route>
      </Routes>

    </>
  )
}

export default App;
