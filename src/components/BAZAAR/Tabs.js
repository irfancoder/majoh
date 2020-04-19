import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";
import { groupBy } from "../../utils/index";
import ParentMenu from "../HOME/ParentMenu";
import BazaarParentMenu from "../BAZAAR/BazaarParentMenu";
import { Grid } from "@material-ui/core";
import LocationDropDown from "../BAZAAR/LocationDropdown";
import SearchBar from "../BAZAAR/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    /*
    backgroundColor: (theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (theme.palette.common.white, 0.25),
    },
    */
    color: "primary",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const meal = {
  breakfast: {
    title: "Breakfast",
    start: "8AM",
    end: "9AM",
  },
  lunch: {
    title: "Lunch",
    start: "11AM",
    end: "12PM",
  },
  dinner: {
    title: "Dinner",
    start: "5PM",
    end: "6PM",
  },
};

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

export default function TabComponent() {
  const MajohData = () => {
    const menuRef = useFirestore()
      .collection("vendor")
      .doc(" k8oheqc44eknonnybq8")
      .collection("menu");

    const dataMenu = useFirestoreCollectionData(menuRef);

    const sortedMenu = groupBy(dataMenu, "type");

    console.log(sortedMenu);

    return Object.keys(sortedMenu).map((key, index) => {
      return <ParentMenu key={index} meal={meal[key]} menu={sortedMenu[key]} />;
    });
  };

  const BazaarData = () => {
    const menuRef = useFirestore().collection("bazaar_menu");
    const dataMenu = useFirestoreCollectionData(menuRef);

    return <BazaarParentMenu menu={dataMenu} />;
  };

  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab disabled label="MAJOH" {...a11yProps(0)} />
        <Tab label="BAZAAR RAMADHAN" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SuspenseWithPerf
          fallback={<p>loading delicious food...</p>}
          traceId={"load-burrito-status"}
        >
          <MajohData />
        </SuspenseWithPerf>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SuspenseWithPerf
          fallback={<p>loading delicious food...</p>}
          traceId={"load-burrito-status"}
        >
          <BazaarData />
        </SuspenseWithPerf>
      </TabPanel>
    </div>
  );
}
