import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputAdornment,
  InputBase,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";

const SearchBar = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (ev) => {
    setSearch(ev.target.value);
  };

  return (
    <div className="App">
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <TextField
          type="search"
          variant="outlined"
          placeholder="Cuba 'Nasi Lemak' atau nama gerai  "
          fullWidth
          onChange={handleChange}
          onKeyPress={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter") {
              // Do code here
              ev.preventDefault();
              handleSearch(search);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
