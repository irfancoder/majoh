import React, {useState} from 'react';
import { Card, Typography, Container, CardActionArea, CardActions, CardContent, CardMedia, Button, Divider, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        marginTop: "1em",
        marginBottom: "1em",
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr"
    },
    media: {
        height: "300px",
        margin: "1em"
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
        alignItems: "baseline"
    
    }
});

const ProductShow = ({ item }) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(item.moq)

    const handleChange = (event) => {
        setQuantity(event.target.value);
      };

    const calcTotalPrice = ()=>{
        return quantity*item.price_max;
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>

                <CardMedia className={classes.media}
                image={item.thumbnail||""}
                title={item.item}
                >
                    </CardMedia>

            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="body1" component="h4">
                    {item.item}
                </Typography>



                <Divider className={classes.divider} />
                <Typography gutterBottom className={classes.price} variant="h6" component="h2">
                    RM {item.price_min || ""}-{item.price_max}<Typography className={classes.minOrder} variant="caption" component="p">/kg
          </Typography>
                </Typography>
                <Typography gutterBottom className={classes.minOrder} variant="caption" component="p">
                    {item.moq || "-"}kg (Min Order)
          </Typography>
                <Divider className={classes.divider} />
                <Typography className={classes.company} variant="body2" component="h2">
                    {/* <Business color="disabled" fontSize="small" />  */}
                    {item.vendor.businessName || ""}
                </Typography>
                <Typography variant="body2" component="h2">
                    {/* <LocationOn color="disabled" fontSize="small" />  */}
                    {item.vendor.location || ""}
                </Typography>
            </CardContent>
            <CardContent>
                <div className={classes.action}>
                    <div >
                    <TextField
                        id="outlined-number"
                        label="Quantity (kg)"
                        type="number"
                        color="primary"
                        style={{width:"100%", marginBottom: "1em"}}
                        defaultValue={item.moq}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <div className={classes.estPrice}>
                        <Typography variant="caption">
                            Unit Price 
                        </Typography>
                        <Typography variant="body2">
                            RM {item.price_max}
                        </Typography>

                    </div>

                    <div className={classes.estPrice}>
                        <Typography variant="caption">
                            Shipping 
                        </Typography>
                        <Typography variant="body2">
                            RM -
                        </Typography>

                    </div>
                    <div className={classes.estPrice}>
                        <Typography variant="caption">
                            Estimated Total 
                        </Typography>
                        <Typography variant="h6">
                            RM {calcTotalPrice().toString()}
                        </Typography>

                    </div>
                    </div>
                    <div>
                        <Button className={classes.buttonAction} size="small"
                            color="primary"
                            variant="outlined"
                            onClick={()=>{window.scrollTo(0,document.body.scrollHeight);}}
                            >
                            Request Quotation
                        </Button>
                        <Button disableElevation    className={classes.buttonAction} size="small" color="primary"
                            variant="contained">
                            Contact us
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}

export default ProductShow;