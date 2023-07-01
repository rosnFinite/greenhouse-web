import {
  Card,
  Text,
  Image,
  Grid,
  Badge,
  Container,
  Button,
} from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai";

interface DeviceCardProps {
  deviceName: string;
  modelName: string;
  isOnline: boolean;
  imgUrl: string;
  sizeText: string;
  areaText: string;
  hasTempSensor?: boolean;
  hasHumSensor?: boolean;
  numSoilSensors?: number;
}

export default function DeviceCard({
  deviceName,
  modelName,
  isOnline,
  imgUrl,
  sizeText,
  areaText,
  hasTempSensor,
  hasHumSensor,
  numSoilSensors,
}: DeviceCardProps) {
  return (
    <Card variant="bordered" css={{ height: "300px" }}>
      <Card.Header>
        <Text size={20} css={{ paddingRight: 10 }}>
          {deviceName}
        </Text>
        {isOnline ? (
          <Badge color="success">online</Badge>
        ) : (
          <Badge color="error">offline</Badge>
        )}
      </Card.Header>
      <Card.Body
        css={{
          overflow: "hidden",
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        }}
      >
        <Grid.Container
          gap={2}
          justify="center"
          alignItems="flex-start"
          css={{ paddingLeft: 0, paddingRight: 15, "@smMax": { fontSize: 10 } }}
        >
          <Grid md={2} xs={4}>
            <Image
              width={320}
              height={180}
              src={imgUrl}
              alt="Device Image"
              objectFit="contain"
            />
          </Grid>
          <Grid md={9} xs={6} css={{ flexDirection: "column" }}>
            <Container>
              <Text span weight="bold" css={{ paddingRight: 10 }}>
                Modell:
              </Text>
              <Text span>{modelName}</Text>
            </Container>
            <Container>
              <Text span weight="bold" css={{ paddingRight: 10 }}>
                Größe:
              </Text>
              <Text span>{sizeText}</Text>
            </Container>
            <Container>
              <Text span weight="bold" css={{ paddingRight: 10 }}>
                Anbaufläche:
              </Text>
              <Text span>{areaText}</Text>
            </Container>
            <Container>
              <Text span weight="bold" css={{ paddingRight: 10 }}>
                Temperatursensor:
              </Text>
              {hasTempSensor ? (
                <Badge color="success" css={{ "@xsMax": { size: "xs" } }}>
                  vorhanden
                </Badge>
              ) : (
                <Badge color="error">nicht vorhanden</Badge>
              )}
            </Container>
            <Container>
              <Text span weight="bold" css={{ paddingRight: 10 }}>
                Luftfeuchtigkeitsensor:
              </Text>
              {hasHumSensor ? (
                <Badge color="success">vorhanden</Badge>
              ) : (
                <Badge color="error">nicht vorhanden</Badge>
              )}
            </Container>
            <Container>
              <Text span weight="bold" css={{ paddingRight: 10 }}>
                Bodenfeuchtigkeitsensor:
              </Text>
              {numSoilSensors !== undefined && numSoilSensors >= 1 ? (
                <Badge color="success">{numSoilSensors}x vorhanden</Badge>
              ) : (
                <Badge color="error">nicht vorhanden</Badge>
              )}
            </Container>
          </Grid>
          <Grid md={1} xs={2}>
            <Button size="xs" color="error" icon={<AiOutlineDelete />} />
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
