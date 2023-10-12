import { Container, Grid, Text } from "@nextui-org/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState, type ReactElement, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../fbase/firebaseClient";
import AddDevicesModal from "lib/components/Buttons/AddDevicesModal";

import type { NextPageWithLayout } from "./_app";

const NavbarContainer = dynamic(() => import("lib/layout/NavbarContainer"));
const DataCard = dynamic(() => import("lib/components/Cards/DataCard"));

interface DataProperties {
  temperature: number[];
  humidity: number[];
  distance: number[];
  water_level: number[];
  soil_humidity_1: number[];
  soil_humidity_2: number[];
  soil_humidity_3: number[];
}

const Dashboard: NextPageWithLayout = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState<DataProperties>({
    temperature: [],
    humidity: [],
    distance: [],
    water_level: [],
    soil_humidity_1: [],
    soil_humidity_2: [],
    soil_humidity_3: [],
  });

  const getData = async () => {
    try {
      const res = await axios.get(`/api/data/?id=${user?.uid}`);
      setData({
        temperature: res.data.temperature,
        humidity: res.data.humidity,
        distance: res.data.distance,
        water_level: res.data.water_level,
        soil_humidity_1: res.data.soil_humidity_1,
        soil_humidity_2: res.data.soil_humidity_2,
        soil_humidity_3: res.data.soil_humidity_3,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    const timer = setInterval(getData, 60000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container css={{ height: "100vh" }}>
      <Text h2 css={{ marginTop: "$10", marginBottom: 0 }}>
        Mein Gewächshaus
      </Text>
      <Text size={10}>letzte Auktualisierung: 17:33 Uhr</Text>
      <Grid.Container
        gap={2}
        justify="center"
        css={{
          padding: 0,
          marginBottom: "$10",
          marginTop: "$10",
        }}
      >
        <Grid xs={12} md={6}>
          <DataCard
            titleName="Lufttemperatur"
            suffix="°C"
            data={data.temperature.map((value, index) => ({
              x: index,
              y: value,
            }))}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <DataCard
            titleName="Luftfeuchtigkeit"
            suffix="%"
            data={data.humidity.map((value, index) => ({
              x: index,
              y: value,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Bodenfeuchte 1"
            suffix="%"
            data={data.soil_humidity_1.map((value, index) => ({
              x: index,
              y: value,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Bodenfeuchte 2"
            suffix="%"
            data={data.soil_humidity_2.map((value, index) => ({
              x: index,
              y: value,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Bodenfeuchte 3"
            suffix="%"
            data={data.soil_humidity_3.map((value, index) => ({
              x: index,
              y: value,
            }))}
          />
        </Grid>
        <Grid xs={12} md={12}>
          <Text h3 css={{ marginTop: "$10" }}>
            Weiteres Gewächshaus hinzufügen
          </Text>
        </Grid>
        <Grid xs={12} md={12}>
          <AddDevicesModal />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <NavbarContainer>{page}</NavbarContainer>;
};

export default Dashboard;
