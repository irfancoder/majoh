import React from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

export default function SearchBar() {

    const getDataAlgolia = () => 
    {
        var client = algoliasearch("07CVJHF6V6", "d7ecf94667407705380df31a5e263040");
        var index = client.initIndex('test_search');
        index.getObject("UQJSYf8mpiJZIbTo9bM9").then(results => {
            console.log(results);
          });
    }
            
    return (
      <div className="App">
         {} /*
        <TextField
          type="search"
          variant="outlined"
          placeholder="Search dishes"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        
         <Button onClick={getDataAlgolia} >
            Test
         </Button>
      </div>
    );
  }

    {/*
            <InputBase
            variant="outlined"
              placeholder="Search…"
              classes={{
               
                
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            */}