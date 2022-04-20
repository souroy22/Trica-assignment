import { airlines, flights_jan_01_2008 } from "./airline-data.js";

// total number of columns
const hourGroup = 25;

// creatin a new map for grouping flight hours
const mp = new Map();

// initialize map with key="airline_code" and value=array with 0 value
for (let [key, val] of Object.entries(airlines)) {
     mp.set(key, new Array(hourGroup).fill(0));
}

// function to get hour count
function findTimeIndex(time) {
     let hour = parseInt(time.slice(0, 2));
     let min = parseInt(time.slice(3, 5));
     let sec = parseInt(time.slice(6, 8));
     if(min > 0 || sec > 0){
          hour += 1;
     }
     return hour;
}

// added flight count in the map
for(let i=0;i<flights_jan_01_2008.length;i++){
     if(flights_jan_01_2008[i] && flights_jan_01_2008[i].airline && flights_jan_01_2008[i].time){
          let isExist = mp.has(flights_jan_01_2008[i]?.airline);
          if(isExist){
               let indx = findTimeIndex(flights_jan_01_2008[i].time);
               let arr = mp.get(flights_jan_01_2008[i]?.airline);
               arr[indx] += 1;
               mp.set(flights_jan_01_2008[i]?.airline, arr);
          }
     }
}

function createTableAndInsert(data) {
     var table = document.createElement('table');
     var tr = document.createElement('tr'); // Header row
     for (let hour=1;hour <= hourGroup; hour++) {
          var th = document.createElement('th'); //column
          if(hour > 1){
               var text = document.createTextNode(hour-1); //cell
               th.appendChild(text);
          }else{
               var text = document.createTextNode(" "); //cell
               th.appendChild(text);
          }
          tr.appendChild(th);
     }
     // create the heading eow
     table.appendChild(tr);
     
     // create the main data table
     for (let [key, val] of Object.entries(data)) {
          let tr = document.createElement('tr');
          let valueArray = mp.get(key);
          for (let j = 0; j < hourGroup; j++) {
               let td = document.createElement('td');
               let value;
               if(j == 0){
                    value = val;
               }else if(j === hourGroup-1){
                    value = valueArray[j] || '-';
               }
               else{
                    value = valueArray[j+1] || '-';
               }
               console.log("valueArray[24]", valueArray[24]);
               let text = document.createTextNode(value);
               td.appendChild(text);
               tr.appendChild(td);
          }
          table.appendChild(tr);
     }
     document.getElementById('main_table_view').appendChild(table);
}

createTableAndInsert(airlines);