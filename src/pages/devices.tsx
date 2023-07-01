import { Container, Text, Grid } from "@nextui-org/react";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";

import DeviceCard from "lib/components/Cards/DeviceCard";

import type { NextPageWithLayout } from "./_app";

const AddDevicesModal = dynamic(
  () => import("lib/components/Buttons/AddDevicesModal")
);
const NavbarContainer = dynamic(() => import("lib/layout/NavbarContainer"));

const Devices: NextPageWithLayout = () => {
  return (
    <Container css={{ height: "100vh" }}>
      <Text h2 css={{ marginTop: "$10" }}>
        Meine Geräte (2)
      </Text>
      <Grid.Container
        gap={2}
        justify="center"
        css={{ padding: 0, marginBottom: "$10", marginTop: "$10" }}
      >
        <Grid xs={12}>
          <DeviceCard
            deviceName="Mein Gewächshaus"
            modelName="GRW-231-XYZ"
            imgUrl="/growbox.webp"
            isOnline
            sizeText="110cm x 200cm x 110cm"
            areaText="1,21cm²"
            hasTempSensor
            hasHumSensor
            numSoilSensors={3}
          />
        </Grid>
        <Grid xs={12}>
          <DeviceCard
            deviceName="Das Monster"
            modelName="GRW-231-XYZ"
            imgUrl="/growbox.webp"
            isOnline={false}
            sizeText="110cm x 200cm x 110cm"
            areaText="1,21cm²"
            hasTempSensor
          />
        </Grid>
        <Grid xs={12}>
          <AddDevicesModal />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

Devices.getLayout = function getLayout(page: ReactElement) {
  return <NavbarContainer>{page}</NavbarContainer>;
};

export default Devices;
