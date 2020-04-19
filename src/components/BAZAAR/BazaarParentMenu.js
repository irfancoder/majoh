import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fuse from "fuse.js";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import ChildMenu from "./BazaarChildMenu";
import SearchBar from "./SearchBar";
import LocationDropDown from "./LocationDropdown";

const MenuContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;
`;

const ParentMenu = ({ menu }) => {
  const initFuse = (menu) => {
    const options = {
      includeScore: true,
      threshold: 1.0,
      // Search in `author` and in `tags` array
      keys: ["item"],
    };

    const fuse = new Fuse(menu, options);
    const result = fuse.search("a");

    return result;
  };
  const [filterMenu, setFilterMenu] = useState(initFuse(menu));

  const handleSearch = (keyword) => {
    if (keyword !== "") {
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ["item", "vendor.location"],
      };

      const fuse = new Fuse(menu, options);

      const result = fuse.search(keyword);
      setFilterMenu(result);
    } else {
      setFilterMenu(initFuse(menu));
    }
  };

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
          {filterMenu.map((list, index) => {
            return (
              <Grid key={index} item xs={12} md={3}>
                <ChildMenu menu={list.item} />
              </Grid>
            );
          })}
        </Grid>
      </MenuContainer>
    </div>
  );
};

export default ParentMenu;
