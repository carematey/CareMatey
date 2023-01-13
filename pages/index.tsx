import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import FullButton from "../components/FullButton";
import { Box, Stack, Wrap, Grid, Text } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Box>
        <Grid templateColumns="repeat(2, 1fr)">
          <FullButton
            bgColor={"green.300"}
            height="50vh"
            // topText='plant'
            // bottomText='BotHome'
            icon="plant"
            href="/plants"
          />
          <FullButton
            bgColor={"orange.300"}
            height="50vh"
            topText="Dog House"
            bottomText="Enter if you dare"
            icon="dog"
            href="/pets"
          />
        </Grid>
        <FullButton
          width="100vw"
          bgColor={"blue.300"}
          height="50vh"
          bottomText="Home"
          icon="house"
          href="/house"
        />
      </Box>
    </>
  );
}
