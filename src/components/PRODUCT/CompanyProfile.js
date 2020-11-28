import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import dimensions from '../../styles/dimensions'
import color from '../../styles/color'
import { Typography } from '@material-ui/core'


const useStyles = makeStyles({
    root: {
        border: "1px solid #dddddd",
        borderCollapse:"collapse",
        minWidth: dimensions.maxwidthTablet,
    

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
        
    }
})
const CompanyProfile = ({ vendor }) => {
    const classes = useStyles()

    return (<table className={classes.root}>
        <tr>
            <td className={classes.header}><Typography variant="subtitle2">Business Name</Typography>
</td>
            <td className={classes.content}>{vendor.businessName || ""}</td>

        </tr>
        <tr>
        <td className={classes.header}><Typography variant="subtitle2">Location</Typography></td>
            <td className={classes.content}>{vendor.location || ""}</td>

        </tr>
        <tr>
        <td className={classes.header}><Typography variant="subtitle2">Year Established</Typography></td>
            <td className={classes.content}>2015</td>

        </tr>
        <tr>
        <td className={classes.header}><Typography variant="subtitle2">Land Size</Typography></td>
            <td className={classes.content}>2 acres</td>

        </tr>
        <tr>
        <td className={classes.header}><Typography variant="subtitle2">Farming Technique</Typography></td>
            <td className={classes.content}>Conventional / Fertigation</td>

        </tr>
        <tr>
        <td className={classes.header}><Typography variant="subtitle2">Experienced Crops</Typography></td>
            <td className={classes.content}>Chilli, Cucumber, Pumpkin</td>

        </tr>
        <tr>
        <td className={classes.header}><Typography variant="subtitle2">No. of Employees</Typography></td>
            <td className={classes.content}>5-10</td>

        </tr>
    </table>)
    // return (<div className={classes.root}>
    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">Business Name</Typography>

    //     </div>
    //     <div className={classes.content}>

    //         {vendor.businessName}
    //     </div>

    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">Location</Typography>
    //     </div>
    //     <div className={classes.content}>
    //         {vendor.location}
    //     </div>
    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">Year Established</Typography>
    //     </div>
    //     <div className={classes.content}>
    //         2015
    //     </div>

    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">Land Size</Typography>
    //     </div>
    //     <div className={classes.content}>
    //         2 acres
    //     </div>

    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">Farming Technique</Typography>

    //     </div>
    //     <div className={classes.content}>
    //         Fertigation / Conventional
    //     </div>

    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">
    //             Planted Crops</Typography>

    //     </div>
    //     <div className={classes.content}>
    //         Chilli, Pineapple, Pumpkin
    //     </div>

    //     <div className={classes.header}>
    //         <Typography variant="subtitle2">No. of Employee</Typography>

    //     </div>
    //     <div className={classes.content}>
    //         1-10 pax
    //     </div>

    // </div>);
}

export default CompanyProfile;