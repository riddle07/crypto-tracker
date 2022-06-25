import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import axios from "axios";
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(()=>({
  carousel:{
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const {currency} = CryptoState();
  const fetchTrendingCoins = async()=>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data);
  }
  console.log(trending);
  useEffect(()=>{
    fetchTrendingCoins();
  }, [currency]);
  const items = trending.map((coin)=>{
    return(
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
        src = {coin?.image}
        alt = {coin.name}
        height = "80"
        style = {{marginBottom: 10}}/>
      </Link>
    );
  })
  const responsive = {
    0:{
      items: 2,
    },
    512:{
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel mouseTracking infinite autoPlay={1000}
      animationDuration={1500} disableDotsControls responsive={responsive} items = {items}/>
    </div>
  )
}

export default Carousel