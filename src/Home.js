import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import "./Home.css";

const itemMap = {
  bows: {
    url: "https://elden-ring.machinable.io/json/bows/items/",
    limit: 25,
  },
  helms: {
    url: "https://elden-ring.machinable.io/json/helms/items/",
    limit: 157,
  },
  legs: {
    url: "https://elden-ring.machinable.io/json/legs/items/",
    limit: 107,
  },
  weapons: {
    url: "https://elden-ring.machinable.io/json/weapons/items/",
    limit: 251,
  },
  shields: {
    url: "https://elden-ring.machinable.io/json/shields/items/",
    limit: 76,
  },
  catalysts: {
    url: "https://elden-ring.machinable.io/json/catalysts/items/",
    limit: 27,
  },
  chests: {
    url: "https://elden-ring.machinable.io/json/chests/items/",
    limit: 136,
  },
  gauntlets: {
    url: "https://elden-ring.machinable.io/json/gauntlets/items/",
    limit: 92,
  },
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Item = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  const fetchItem = async () => {
    setLoading(true);
    let obj = itemMap[type];
    if (obj) {
      let index = randomIntFromInterval(0, obj.limit - 1);
      const response = await fetch(`${obj.url}${index}`);
      let result = await response.json();

      setLoading(false);
      setItem(result);
    } else {
      setLoading(false);
      setItem({ name: "invalid type" });
    }
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="item-block">
      {loading && <Loader />}
      {!loading && item && <div>{item?.name}</div>}
    </div>
  );
};

const Home = () => {
  return (
    <div className="content">
      <div className="items-list">
        <div className="items-type">
          <div className="items-type-title">Weapons</div>
          <div className="items-result">
            <Item type="weapons" />
            <Item type="weapons" />
          </div>
        </div>
        <div className="items-type">
          <div className="items-type-title">Armor</div>
          <div className="items-result">
            <Item type="helms" />
            <Item type="chests" />
            <Item type="gauntlets" />
            <Item type="legs" />
          </div>
        </div>
        <div className="items-type">
          <div className="items-type-title">Catalyst</div>
          <div className="items-result">
            <Item type="catalysts" />
          </div>
        </div>
        <div className="items-type">
          <div className="items-type-title">Shield / Torch</div>
          <div className="items-result">
            <Item type="shields" />
          </div>
        </div>
        <div className="items-type">
          <div className="items-type-title">Bow</div>
          <div className="items-result">
            <Item type="bows" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
