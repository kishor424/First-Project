import RestauranCard from "./RestauranCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utills/useOnlineStatus";

const Body = ()=>{
const [listOfRestaurants,setListOfRestaurants]=useState([])
const [searchText,setSearchText]=useState("")
const [filteredRestaurant,setFilteredRestaurant]=useState([])

useEffect(()=>{
     console.log("called")
     fetchData()
},[])

const fetchData = async () => {
  try {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4469327&lng=77.0106184&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);

    const restaurants =
      json?.data?.cards?.find(
        (card) =>
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurant(restaurants);
  } catch (err) {
    console.error("Error fetching restaurant data:", err);
  }
};

         const OnlineStatus = useOnlineStatus();
         if(OnlineStatus === false) return <h1>Looks Like You are offline Please Check Your Connection</h1>

    return listOfRestaurants.length === 0 ? <Shimmer /> :(
        <div className="body">
   <div className="filter">
    <div className="search"> 
      <input type="text" className="search-box"
       value={searchText} 
        onChange={(e)=>{setSearchText(e.target.value)}}/>
      <button onClick={()=>{
      const filteredRestaurant = listOfRestaurants.filter((res)=>
         res.info?.name?.toLowerCase().includes(searchText.toLowerCase()))
      setFilteredRestaurant(filteredRestaurant)

      }}>search</button>
    </div>
    <button className="filter-btn"
     onClick={()=>{
        const filteredList = listOfRestaurants.filter(
          (res)=>res.info?.avgRating >4);
        setListOfRestaurants(filteredList)
    }}>Top Rated Restaurant</button>
   </div>
   <div className="res-container">
   {filteredRestaurant
  .filter((res) => res?.info?.id)
  .map((restaurant) => (
   <Link key={restaurant.info.id}
   to={"/restaurants/"+ restaurant.info.id }>
     <RestauranCard resData={restaurant} /></Link> 
))}

   </div>
 </div>
    )
 }

 export default Body;