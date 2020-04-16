import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";

const Container = styled.img`
  border-radius: 8px;

  width: 100%;
  height: auto;
`;

const Banner = () => {
  const PromoBanner = () => {
    const ref = useFirestore().collection("banners");

    const bannerData = useFirestoreCollectionData(ref);

    return bannerData.map((promo) => {
      return <Container src={promo.image} alt={promo.alt} />;
    });
  };

  return (
    <SuspenseWithPerf
      fallback={<p>opening the shop...</p>}
      traceId={"load-burrito-status"}
    >
      <Carousel showStatus="false">
        <PromoBanner />
      </Carousel>
    </SuspenseWithPerf>
  );
};

export default Banner;
