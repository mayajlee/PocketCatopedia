import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import BanTile from './components/BanTile'
import PastTile from './components/PastTile'


var pastCats = [];
var totalBanList = [];
var nameBan = [];
var hypoBan = [];
var shedBan = [];

function App() {

  let URL = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1&api_key=live_g9o7zbHDoHzztwiy1SfzKqRXrDJhVSLXIGibkSoAX5qIL43W3qilex5cSDznJQBJ%0A%0A";
  
  const [cat, setCat] = useState(
    {
      url: "",
      name: "",
      hypo:"",
      shed:"",
      desc: "",

    }
  );

  const fetchData = async () => {
      const response = await axios.get(URL);
      const catData = {
        url: response.data[0].url,
        name: response.data[0].breeds[0].name,
        hypo: response.data[0].breeds[0].hypoallergenic,
        shed: response.data[0].breeds[0].shedding_level,
        desc: response.data[0].breeds[0].description,
      };

      if(!nameBan.includes(catData.name) && !shedBan.includes(catData.shed) && !hypoBan.includes(catData.hypo)){
        setCat(catData);
      }
      else{
        DiscoverMore();
      }
      
  };

  const DiscoverMore = async () => {
    fetchData();
  };

  function addNameBan(){
    totalBanList.push(cat.name);
    
  };

  function addHypoBan(){
    totalBanList.push(cat.hypo);
    hypoBan.push(cat.hypo);
  };

  function addShedBan(){
    totalBanList.push(cat.shed);
    shedBan.push(cat.shed);
  };

  console.log(cat);
  pastCats.push(cat);
  console.log(pastCats);
  
  return (
    <>
      <h1 style={{color: '#00171F'}}>Pocket Cat-pedia!</h1>
      <h4 style={{color: '#00171F'}}>Discover new Cats to spot on your walk! Great for people who are allergic (me)!</h4>

      <div style={{display: 'flex'}}>
        {/*Discover Tile*/}
        <div style={{backgroundColor: "#ACDDE7", border: "12px solid #00A8E8", borderRadius: "48px", justifyContent:"center", padding: "20px"}}>
          <img src={cat.url} alt="" height="250px"/>
          <div>
            <button onClick={addNameBan}>{cat.name}</button>
            <button onClick={addHypoBan}>hypoallergenic: {cat.hypo}</button>
            <button onClick={addShedBan}>shedding level: {cat.shed}</button>
            <p>{cat.desc}</p>
          </div>
          <button onClick={DiscoverMore}>Discover More!</button>
        </div>
        {/*Ban Tile*/}
        <div style={{backgroundColor: "#ACDDE7", border: "12px solid #00A8E8", borderRadius: "48px", justifyContent:"center", padding: "20px", display:"flex"}}>
          {
            totalBanList.map((ban) => {
                return (
                    <button style={{padding: "10px", margin: "10px", maxHeight:"75px"}}>{ban}</button>
                )
              })
          }
        </div>
        {/*Past Tile*/}
      </div>
      <div style={{backgroundColor: "#ACDDE7", border: "12px solid #00A8E8", borderRadius: "48px", justifyContent:"center", padding: "20px", width:"100%", display:"flex", flexWrap:"wrap" }}>
          {
            pastCats.map((pastCat) => {
                return (
                    <div style={{margin: "10px"}}>
                        <img src={pastCat.url} height="150px" alt="" />
                        <p>{pastCat.name}</p>
                    </div>
                )
              })
          }
        </div>
      
    </>
  )
}

export default App
