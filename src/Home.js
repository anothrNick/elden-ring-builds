import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { itemMap } from "./utils";
import Loader from "./Loader";
import "./Home.css";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Home = () => {
  const navigate = useNavigate();

  const genSeed = () => {
    const seed = `${randomIntFromInterval(
      0,
      itemMap["weapons"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["weapons"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["helms"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["chests"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["gauntlets"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["legs"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["catalysts"].limit - 1
    )}-${randomIntFromInterval(
      0,
      itemMap["shields"].limit - 1
    )}-${randomIntFromInterval(0, itemMap["bows"].limit - 1)}`;

    return seed;
  };

  useEffect(() => {
    // generate a seed
    let seed = genSeed();
    navigate(`/${seed}`, { replace: true });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="content">
      <Loader />
    </div>
  );
};

export default Home;
