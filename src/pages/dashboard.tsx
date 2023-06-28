import { Card, Container, Grid, Progress, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import type { ReactElement } from "react";

import AddDevicesModal from "lib/components/Buttons/AddDevicesModal";

import type { NextPageWithLayout } from "./_app";

const NavbarContainer = dynamic(() => import("lib/layout/NavbarContainer"));
const DataCard = dynamic(() => import("lib/components/Cards/DataCard"));

const mockData = [
  {
    timestamp: "Page A",
    temperature: 22.4,
    humidity: 77.3,
    plantSize: 62.6,
    soilhumidity1: 78,
    soilhumidity2: 72,
    soilhumidity3: 77,
  },
  {
    timestamp: "Page B",
    temperature: 22.4,
    humidity: 77.8,
    plantSize: 62.6,
    soilhumidity1: 77,
    soilhumidity2: 71.4,
    soilhumidity3: 75.2,
  },
  {
    timestamp: "Page C",
    temperature: 23.5,
    humidity: 79,
    plantSize: 62.6,
    soilhumidity1: 76.4,
    soilhumidity2: 71,
    soilhumidity3: 74.3,
  },
  {
    timestamp: "Page D",
    temperature: 23.1,
    humidity: 83.4,
    plantSize: 62.6,
    soilhumidity1: 75.4,
    soilhumidity2: 70.2,
    soilhumidity3: 73.8,
  },
  {
    timestamp: "Page E",
    temperature: 23.8,
    humidity: 81.4,
    plantSize: 62.6,
    soilhumidity1: 74.1,
    soilhumidity2: 69.6,
    soilhumidity3: 72.6,
  },
  {
    timestamp: "Page F",
    temperature: 25,
    humidity: 77.2,
    plantSize: 62.6,
    soilhumidity1: 73.3,
    soilhumidity2: 69.1,
    soilhumidity3: 72.1,
  },
  {
    timestamp: "Page G",
    temperature: 25.6,
    humidity: 73.9,
    plantSize: 62.6,
    soilhumidity1: 71.4,
    soilhumidity2: 67.9,
    soilhumidity3: 70.3,
  },
  {
    timestamp: "Page G",
    temperature: 25.3,
    humidity: 78.3,
    plantSize: 62.6,
    soilhumidity1: 70.2,
    soilhumidity2: 66.9,
    soilhumidity3: 68.2,
  },
  {
    timestamp: "Page G",
    temperature: 25,
    humidity: 77.2,
    plantSize: 62.6,
    soilhumidity1: 84.9,
    soilhumidity2: 88.2,
    soilhumidity3: 83.8,
  },
  {
    timestamp: "Page G",
    temperature: 25.6,
    humidity: 77.8,
    plantSize: 62.9,
    soilhumidity1: 84,
    soilhumidity2: 87.5,
    soilhumidity3: 83,
  },
  {
    timestamp: "Page G",
    temperature: 24.7,
    humidity: 77.6,
    plantSize: 62.9,
    soilhumidity1: 83.4,
    soilhumidity2: 86.8,
    soilhumidity3: 82.1,
  },
  {
    timestamp: "Page G",
    temperature: 24.9,
    humidity: 78.6,
    plantSize: 62.9,
    soilhumidity1: 82.9,
    soilhumidity2: 86.1,
    soilhumidity3: 81.7,
  },
];

const Dashboard: NextPageWithLayout = () => {
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
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Temperatur"
            suffix="°C"
            data={mockData.map(({ timestamp, temperature: data }) => ({
              timestamp,
              data,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Luftfeuchtigkeit"
            suffix="%"
            data={mockData.map(({ timestamp, humidity: data }) => ({
              timestamp,
              data,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Pflanzengröße"
            suffix="cm"
            data={mockData.map(({ timestamp, plantSize: data }) => ({
              timestamp,
              data,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Bodenfeuchtigkeit 1"
            suffix="%"
            data={mockData.map(({ timestamp, soilhumidity1: data }) => ({
              timestamp,
              data,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Bodenfeuchtigkeit 2"
            suffix="%"
            data={mockData.map(({ timestamp, soilhumidity2: data }) => ({
              timestamp,
              data,
            }))}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DataCard
            titleName="Bodenfeuchtigkeit 3"
            suffix="%"
            data={mockData.map(({ timestamp, soilhumidity3: data }) => ({
              timestamp,
              data,
            }))}
          />
        </Grid>
        <Grid xs={12} md={12}>
          <Card variant="bordered">
            <Card.Header>
              <Text size={20}>Wasserreservoir</Text>
            </Card.Header>
            <Card.Body
              css={{
                overflow: "hidden",
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
              }}
            >
              <Text size={40} css={{ marginLeft: 10, marginTop: -30 }}>
                63.5%
              </Text>
              <Progress
                squared
                value={63.5}
                color="success"
                size="xl"
                css={{ marginTop: 10 }}
              />
            </Card.Body>
          </Card>
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
