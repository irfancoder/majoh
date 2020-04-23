import React, { useState } from "react";
import { getLocations } from "../../utils";

import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  ListSubheader,
} from "@material-ui/core";

const LocationDropDown = ({ handleSearch }) => {
  const [location, setLocation] = useState("");

  const handleChange = (event) => {
    setLocation(event.target.value);
    handleSearch(event.target.value);
    console.log(event.target.value);
  };

  const getAllLocations = () => {
    let finalList = [];
    Object.keys(getLocations()).map((key, index) => {
      let header = <ListSubheader key={index}>{key}</ListSubheader>;
      finalList.push(header);
      getLocations()[key].map((item) => {
        return finalList.push(
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        );
      });
    });
    return (
      <Select
        name="location"
        value={location}
        onChange={handleChange}
        defaultValue="ALL"
      >
        <MenuItem value="">ALL</MenuItem>
        {finalList}
      </Select>
    );
  };

  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <InputLabel htmlFor="grouped-select">Location</InputLabel>
      {getAllLocations()}

      {/* <Select
        name="location"
        value={location}
        onChange={handleChange}
        defaultValue="ALL"
      >
        <MenuItem value="a">ALL</MenuItem>

         {getLocations().map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        })} 
      </Select> */}
    </FormControl>
  );
};

export default LocationDropDown;
