import React from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import {useState, useEffect} from "react";
import firebase from "../../fire"


export default function SearchBar() {
  const[data, setData] = useState([]);
      useEffect(()=> {
        firebase
        .firestore()
        .collection("bazaar_menu")
        .onSnapshot((snapshot) => {
          const newData = snapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
          }))
          setData(newData)
        })

      }, [])

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
        
         <Button  >
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