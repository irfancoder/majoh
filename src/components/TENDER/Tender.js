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
        minWidth: dimensions.maxwidthTablet
    },
    header: {
        textAlign: "end",
        padding: "1em",
    },
    content: {
        padding: "1em",

    },
    formControl: {

        width: "100%"
    }
}))

const Tender = ({ vendor }) => {
    const classes = useStyles()
    const [category, setCategory] = useState("")

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <CardContent>
            <Typography variant="h6"> Post a Request for Price (RFP)</Typography>
            <table className={classes.table}>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">I'm looking for</Typography>
                    </td>
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
                    <td className={classes.header}><Typography variant="subtitle2">Category</Typography></td>
                    <td className={classes.content}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Select a category</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={category}
                                fullWidth
                                onChange={handleChange}
                                label="Select a category"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                                <MenuItem value={"Poultry"}>Poultry</MenuItem>
                                <MenuItem value={"Fishery"}>Fishery</MenuItem>
                            </Select>
                        </FormControl>
                    </td>

                </tr>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">Quantity (kg)</Typography></td>
                    <td className={classes.content}>
                        <TextField
                            id="quantity"
                            label="Quantity (kg)"
                            type="number"
                            color="primary"
                            style={{ width: "100%", marginBottom: "1em" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        // onChange={handleChange}
                        /></td>

                </tr>
                <tr>
                    <td className={classes.header}><Typography variant="subtitle2">Accepting proposals until</Typography></td>
                    <td className={classes.content}>
                        <TextField
                            id="date"
                            label="Deadline"
                            type="date"
                            defaultValue="2020-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </td>

                </tr>
                <tr>
                    <td className={classes.header}></td>
                    <td className={classes.content}>
                        <Button disableElevation color="primary" variant="contained" onClick={() => alert('Your RFP has been sent to our vendors. Check ')}>Submit Request</Button>
                    </td>

                </tr>

            </table>
        </CardContent>


    );
}

export default Tender;