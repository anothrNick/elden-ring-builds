import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemMap } from "./utils";
import Loader from "./Loader";
import "./Home.css";

const Item = ({ type, index }) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  const fetchItem = async () => {
    setLoading(true);
    let obj = itemMap[type];
    if (obj) {
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
      {!loading && item && (
        <div>
          {item?.image ? (
            <img
              src={item.image}
              className="item-block-image"
              alt={item?.name}
            />
          ) : null}
          <div>
            <a href={item?.wiki}>{item?.name}</a>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const { seed } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    setIndices(seed.split("-"));
  }, [seed]);

  const setCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="content">
      <div className="wrapper">
        <div className="options">
          <button onClick={() => navigate("/")}>Reroll</button>
          <button onClick={() => setCopy()}>
            {!copied ? "Copy Link" : "Copied"}
          </button>
        </div>
        {indices.length === 9 && (
          <div className="items-list">
            <div className="items-type">
              <div className="items-type-title">Weapons</div>
              <div className="items-result">
                <Item type="weapons" index={indices[0]} />
                <Item type="weapons" index={indices[1]} />
              </div>
            </div>
            <div className="items-type">
              <div className="items-type-title">Armor</div>
              <div className="items-result">
                <Item type="helms" index={indices[2]} />
                <Item type="chests" index={indices[3]} />
                <Item type="gauntlets" index={indices[4]} />
                <Item type="legs" index={indices[5]} />
              </div>
            </div>
            <div className="items-type">
              <div className="items-type-title">Catalyst</div>
              <div className="items-result">
                <Item type="catalysts" index={indices[6]} />
              </div>
            </div>
            <div className="items-type">
              <div className="items-type-title">Shield / Torch</div>
              <div className="items-result">
                <Item type="shields" index={indices[7]} />
              </div>
            </div>
            <div className="items-type">
              <div className="items-type-title">Bow</div>
              <div className="items-result">
                <Item type="bows" index={indices[8]} />
              </div>
            </div>
          </div>
        )}
        {indices.length > 0 && indices.length !== 9 && <>Invalid seed</>}
      </div>
    </div>
  );
};

export default Home;
