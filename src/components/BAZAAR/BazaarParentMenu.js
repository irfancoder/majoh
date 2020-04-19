import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fuse from "fuse.js";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import ChildMenu from "./BazaarChildMenu";
import SearchBar from "./SearchBar";
import LocationDropDown from "./LocationDropdown";

import Pagination from "@material-ui/lab/Pagination";

const MenuContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;
`;

// const Container = styled.div`
// display: grid;
// grid-template-columns: auto auto auto auto;
// `

const ParentMenu = ({ menu }) => {
  const initFuse = (menu) => {
    let tempArray = [];

    menu.forEach((element) => {
      let item = {};
      item.item = element;
      tempArray.push(item);
    });

    return tempArray;
  };
  const [filterMenu, setFilterMenu] = useState(initFuse(menu));
  const [state, setState] = useState({
    dataIndex: 20,
    pageIndex: 0,
    interval: 20,
  });

  const handleSearch = (keyword) => {
    if (keyword !== "") {
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ["item", "vendor.location", "vendor.businessName"],
      };

      const fuse = new Fuse(menu, options);

      const result = fuse.search(keyword);
      setFilterMenu(result);
    } else {
      setFilterMenu(initFuse(menu));
    }
  };

  const handleChange = (event, value) => {
    setState({
      ...state,
      pageIndex: value,
      dataIndex: value * state.interval,
    });
  };
  console.log(state);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <SearchBar handleSearch={handleSearch} />
        </Grid>
        <Grid item md={4} xs={12}>
          <LocationDropDown handleSearch={handleSearch} />
        </Grid>
      </Grid>
      <MenuContainer maxWidth="md">
        <Grid container direction="row" justify="flex-start" spacing={2}>
          {filterMenu
            .slice(state.dataIndex - state.interval, state.dataIndex)
            .map((list, index) => {
              return (
                <Grid key={index} item xs={12} md={3}>
                  <ChildMenu menu={list.item} />
                </Grid>
              );
            })}
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={(filterMenu.length / state.interval).toFixed(1)}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </div>
      </MenuContainer>
    </div>
  );
};

export default ParentMenu;
