import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import MoreIcon from "@material-ui/icons/MoreVert";

import color from "../styles/color";
import Button from "@material-ui/core/Button";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Agrobuzz from "../assets/images/agrobuzz_logo.png";

import Order from "./Order";

import { Link } from "react-router-dom";

import TabComponent from "../components/BAZAAR/Tabs";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "white",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0);",
    [theme.breakpoints.down("xs")]: {
      top: "auto",
      bottom: 0,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    display: "block",
    color: color.black,
  },
  logo:{
    width: "120px",
    [theme.breakpoints.down("xs")]: {
      width: "80px"
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(8),
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
    color: color.black,
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
      width: "100vh",
      justifyContent: "space-evenly",
      alignItems: "baseline",
    },
  },
  sectionMobile: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    maxHeight: "50px",
    [theme.breakpoints.up("md")]: {
      display: "none",
      
    },
  },
  toolbar: {
    paddingTop: "1.5em",
    paddingBottom: "1.5em",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "90%",
      justifyContent: "space-between",
      margin: "auto",
    },
  },
  navItem: {
    textTransform: "uppercase",
    fontWeight: 500,
    textDecoration: "none",
    color: color.black,
  },
  viewOrder: {
    paddingLeft: "2em",
    paddingRight: "2em",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
    },
    link: {
      textDecoration: "none",
      color: color.black,
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link className={classes.navItem} to="/paidorders">
          <Typography variant="subtitle1">orders</Typography>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link className={classes.navItem} to="/account">
          <Typography variant="subtitle1">account</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <img className={classes.logo} src={Agrobuzz} alt="Agrobuzz Logo" />
            </Link>
          </div>

          <div className={classes.sectionDesktop}>
            <Link className={classes.navItem} to="/paidorders">
              <Typography variant="subtitle1">orders</Typography>
            </Link>
            <Link className={classes.navItem} to="/account">
              <Typography variant="subtitle1">account</Typography>
            </Link>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ReceiptIcon />}
              className={classes.viewOrder}
              onClick={handleDrawer(true)}
            >
              view order
            </Button>

            <Order open={openDrawer} handleDrawer={handleDrawer} />
          </div>
          <div className={classes.sectionMobile}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReceiptIcon />}
              className={classes.viewOrder}
              onClick={handleDrawer(true)}
            >
              view order
            </Button>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
