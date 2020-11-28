import React, {useState} from 'react';
import { Card, Typography, Tabs, Tab,Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CompanyProfile from './CompanyProfile'

const useStyles = makeStyles({
    root: {
        marginTop: "1em",
        marginBottom: "1em",
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr"
    },
    media: {
        height: "300px",
        background: "#a4a4a4"
    },
    price: {
        display: "flex",
        textAlign: "start",
        justifyContent: "start",
        alignItems: "baseline",
        fontSize: "1.5em"
    },
    minOrder: {
        textAlign: "start",
        fontSize: "1em",
        color: "#a4a4a4"
    },
    buttonAction: {
        width: "100%",
        marginTop:"1em"
    },
    action: {
        display: "flex",
        flexDirection: "column",
        height:"100%",
        // alignContent:"space-between",
        
        justifyContent: "space-between"
    },
    content: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    divider: {
        margin: "1em"
    },
    estPrice:{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "baseline"
    
    }
});

  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ProductInfo = ({ item }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(item.moq)
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  

    const calcTotalPrice = ()=>{
        return quantity*item.price_max;
    }

    return (
        <Card>
        <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs"
      >
        <Tab label="Product Details" {...a11yProps(0)} />
        <Tab label="Company Overview" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
       <CompanyProfile vendor={item.vendor}/>
      </TabPanel>
      </Card>
    )
}

export default ProductInfo;