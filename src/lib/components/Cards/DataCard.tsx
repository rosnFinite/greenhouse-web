import { Card, Loading, Text } from "@nextui-org/react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface DataCardProps {
  titleName: string;
  suffix: string;
  data: { x: number; y: number }[];
}

export default function DataCard({ titleName, suffix, data }: DataCardProps) {
  return (
    <Card variant="bordered" css={{ height: "200px" }}>
      <Card.Header>
        <Text size={20}>{titleName}</Text>
      </Card.Header>
      <Card.Body
        css={{
          overflow: "hidden",
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        }}
      >
        {data.length === 0 ? (
          <Loading type="gradient" color="success" />
        ) : (
          <>
            <Text size={40} css={{ marginLeft: 10, marginTop: -30 }}>
              {data.slice(-1)[0].y}
              {suffix}
            </Text>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="gradientColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#17C964" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#17C964" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dot={false}
                  dataKey="y"
                  stroke="#17C964"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#gradientColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
