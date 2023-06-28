import { Card, Grid, Text } from "@nextui-org/react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface DataCardProps {
  titleName: string;
  suffix: string;
  data: { timestamp: string; data: number }[];
}

export default function DataCard({ titleName, suffix, data }: DataCardProps) {
  return (
    <Card css={{ $$cardColor: "#17C964" }}>
      <Card.Header>
        <Text b color="white" size={20}>
          {titleName}
        </Text>
      </Card.Header>
      <Card.Body css={{ overflowX: "hidden" }}>
        <Grid.Container gap={2}>
          <Grid xs={4}>
            <Text
              color="white"
              size={40}
              css={{ textAlign: "center", verticalAlign: "center" }}
            >
              {data.slice(-1)[0].data}
              {suffix}
            </Text>
          </Grid>
          <Grid xs={8}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dot={false}
                  dataKey="data"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
