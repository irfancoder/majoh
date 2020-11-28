import React from 'react';
import Layout from '../../components/Layout'
import ProductShow from '../../components/PRODUCT/ProductShow'
import ProductInfo from '../../components/PRODUCT/ProductInfo'
import Quotation from '../../components/PRODUCT/Quotation';
import { makeStyles } from "@material-ui/core/styles";
import {Fab} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';

import {
    useFirestoreDocData,
    useFirestore,
    SuspenseWithPerf,
} from "reactfire";



const useStyles = makeStyles({
    second: {
        display: "grid",
        gridTemplateColumns: "3fr 1fr"
    },
    chat:{
        position: "fixed",
        bottom: "20px",
        right: "160px"
    }
})

const Product = (props) => {
    const classes = useStyles()

    const ProductDisplay = () => {
        const menuRef = useFirestore().collection("bazaar_menu").doc(props.match.params.id);
        const dataMenu = useFirestoreDocData(menuRef)
        // useFirestoreCollectionData(menuRef);
        console.log(dataMenu);

        return <div><ProductShow item={dataMenu} />
            <div className={classes.second}>
                <ProductInfo item={dataMenu} />
                <div/>
                <Quotation vendor={dataMenu.vendor}/>
            </div>
        <Fab color="primary" className={classes.chat}>
            <ChatIcon />
        </Fab>
        </div>;
    };

    //   const [value, setValue] = useState(1);

    //   const handleChange = (event, newValue) => {
    //     setValue(newValue);
    //   };
    return (

        <SuspenseWithPerf
            fallback={<p>loading delicious food...</p>}
            traceId={"load-burrito-status"}
        >

            <ProductDisplay />
        </SuspenseWithPerf>


    );
}

export default Product;