import React from 'react'
import { useState,useEffect } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utills/useRestrauntMenu';
const RestaurantMenu = () => {
       const {resId} = useParams()

      const resInfo = useRestaurantMenu(resId)

    // useEffect(()=>{
    //   fetchMenu()
    // },[])

  //  const fetchMenu = async ()=>{
  //   const data = await fetch( MENU_API + resId)
  //       // "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=10576&catalog_qa=undefined&submitAction=ENTER"
  //   const json = await data.json()
  //   setResInfo(json.data)
  //  };

   
  if (!resInfo) return <Shimmer />;

  const restaurantInfoCard = resInfo?.cards.find(
    (c) => c.card?.card?.info
  )?.card?.card?.info;

  const { name, cuisines, costForTwoMessage } = restaurantInfoCard || {};
  const regularCards = resInfo?.cards.find(
    (c) => c.groupedCard
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const allItems = [];

  regularCards?.forEach((card) => {
    const innerCard = card.card?.card;
    if (innerCard?.itemCards) {
      allItems.push(...innerCard.itemCards);
    } else if (innerCard?.categories) {
      innerCard.categories.forEach((category) => {
        if (category.itemCards) {
          allItems.push(...category.itemCards);
        }
      });
    }
  });

  return(
    <div className='menu'>
        <h1>{name}</h1>
        <h3>{cuisines?.join(",")}</h3>
        <h3>{costForTwoMessage}</h3>
        <h2>Menu</h2>
        <ul>
        {allItems.length === 0 ? (
          <li>No menu items found</li>
        ) : (
            allItems.map((item, index) => {
                const info = item.card?.info;
                return (
                  <li key={`${info.id}-${index}`}>
                    {info.name} - ₹{(info.price || info.defaultPrice || 0) / 100}
                  </li>
                );
              })
        )}
      </ul>
    </div>
  )
}

export default RestaurantMenu;