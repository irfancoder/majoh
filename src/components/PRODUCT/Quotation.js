import React from 'react';


import { makeStyles } from '@material-ui/core/styles'
import dimensions from '../../styles/dimensions'
import strings from '../../styles/strings'
import { Typography, Card, CardContent, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        marginTop: "1em"
    },
    table: {
        minWidth: dimensions.maxwidthTablet
    },
    header: {
        textAlign: "end",
        padding: "1em",
    },
    content: {
        padding: "1em",
        
    }
})

const Quotation = ({ vendor }) => {
    const classes = useStyles()
    return (<Card className={classes.root}>
        <CardContent>
            <Typography variant="h6"> Request for a quotation</Typography>
            <table className={classes.table}>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">To</Typography>
                    </td>
                    <td className={classes.content}>{vendor.ownerName}</td>

                </tr>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">Message</Typography></td>
                    <td className={classes.content}> <TextField
                        label="Message"
                        multiline
                        rows={6}
                        fullWidth
                        placeholder={strings.rfq_placeholder}
                        variant="outlined"
                    /></td>

                </tr>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">Quantity (kg)</Typography></td>
                    <td className={classes.content}>
                    <TextField
                        id="outlined-number"
                        label="Quantity (kg)"
                        type="number"
                        color="primary"
                        style={{width:"100%", marginBottom: "1em"}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        // onChange={handleChange}
                    /></td>

                </tr>
                <tr>
                    <td className={classes.header}></td>
                    <td className={classes.content}>
                    <Button disableElevation color="primary" size="small" variant="contained" onClick={()=>{alert("The vendor has been notified of your RFQ");}}>Send</Button>
                    <Typography variant="caption"> You will receive a reply from the supplier within 24 working hours!</Typography>                    
                    </td>

                </tr>

            </table>
        </CardContent>

    </Card>
    );
}

export default Quotation;