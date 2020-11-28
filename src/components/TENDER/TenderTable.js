import React, { useState } from 'react';


import { makeStyles } from '@material-ui/core/styles'
import dimensions from '../../styles/dimensions'
import strings from '../../styles/strings'
import { Typography, Select, FormControl, InputLabel, MenuItem, CardContent, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "1em"
    },
    table: {
        width: "100%"
    },
    header: {
        padding: "1em",
        border: "1px solid #dddddd",
        background: "#dddddd",
        maxWidth: "100px"
    },
    content: {
        padding: "1em",
        border: "1px solid #dddddd",

    },
    formControl: {

        width: "100%"
    }
}))

const TenderTable = ({ vendor }) => {
    const classes = useStyles()
    const [category, setCategory] = useState("")

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <CardContent>
            <Typography variant="h6"> Manage Request for Price (RFP)</Typography>
            <table className={classes.table}>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">Proposal</Typography></td>
                    <td className={classes.header}><Typography variant="subtitle2">Category</Typography></td>
                    <td className={classes.header}><Typography variant="subtitle2">Quantity (kg)</Typography></td>
                    <td className={classes.header}><Typography variant="subtitle2">Deadline</Typography></td>
                </tr>
                <tr>
                    <td className={classes.content}><Typography variant="body2">Ayam Kampung</Typography></td>
                    <td className={classes.content}><Typography variant="body2">Poultry</Typography></td>
                    <td className={classes.content}><Typography variant="body2">500</Typography></td>
                    <td className={classes.content}><Typography variant="body2">14/05/2020</Typography></td>


                </tr>
                <tr>
                    <td className={classes.content}><Typography variant="body2">Sawi</Typography></td>
                    <td className={classes.content}><Typography variant="body2">Vegetable</Typography></td>
                    <td className={classes.content}><Typography variant="body2">100</Typography></td>
                    <td className={classes.content}><Typography variant="body2">28/05/2020</Typography></td>
                </tr>
            </table>
        </CardContent>


    );
}

export default TenderTable;