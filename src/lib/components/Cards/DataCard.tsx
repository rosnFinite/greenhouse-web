import { Card, Grid, Text } from "@nextui-org/react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface DataCardProps {
  titleName: string;
  data: { timestamp: string; data: number }[];
}

export default function DataCard({ titleName, data }: DataCardProps) {
  return (
    <Card variant="shadow" css={{ $$cardColor: "$color$success" }}>
      <Card.Header>
        <Text>{titleName}</Text>
      </Card.Header>
      <Card.Body>
        <Grid.Container gap={2}>
          <Grid xs={8}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="data"
                  stroke="#FFAFAF"
                  strokeWidth={5}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid xs={4}>
            <Text size={45}>{data.slice(-1)[0].data}</Text>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
