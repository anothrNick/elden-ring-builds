const ogs = require("open-graph-scraper");
const axios = require("axios");

const mAPIKey = "f265019c-d5ad-4653-9412-30c3bcdb968f";
const mURLPrefix = "https://elden-ring.machinable.io/json/";

const fetchOg = async (url) => {
  let response = null;
  try {
    const options = { url };
    response = await ogs(options);
    if (!response || response.error) {
      console.log("ERROR", url);
      return null;
    }
    return response.result;
  } catch (e) {
    console.log("error", e);
  }
  console.log("ERROR", url);
  return null;
};

const fetchMchnKey = async (key) => {
  const response = await axios(`${mURLPrefix}${key}/`);

  let result = await response.data;
  return result;
};

const updateMchnItems = async (key, items) => {
  const response = await axios.put(`${mURLPrefix}${key}/items`, items, {
    headers: {
      Authorization: `apikey ${mAPIKey}`,
    },
  });
  let result = await response.data;
  console.log("update response", result);
};

const main = async (key) => {
  let result = await fetchMchnKey(key);
  let items = [...result?.items];
  if (items) {
    for (const [idx, item] of items.entries()) {
      console.log(idx, item);
      let ogdata = await fetchOg(
        `https://eldenring.wiki.fextralife.com/${item.name.replaceAll(
          " ",
          "+"
        )}`
      );
      if (ogdata) {
        let image = ogdata?.ogImage?.url;
        let wiki = ogdata?.ogUrl;
        items[idx].image = image;
        items[idx].wiki = wiki;
      }
    }
    await updateMchnItems(key, items);
  }
};

main("shields");
