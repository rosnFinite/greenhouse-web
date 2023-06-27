import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

const mockData = [
  {
    timestamp: "Page A",
    temperature: 22.4,
    humidity: 77.3,
  },
  {
    timestamp: "Page B",
    temperature: 22.4,
    humidity: 77.8,
  },
  {
    timestamp: "Page C",
    temperature: 23.5,
    humidity: 79,
  },
  {
    timestamp: "Page D",
    temperature: 23.1,
    humidity: 83.4,
  },
  {
    timestamp: "Page E",
    temperature: 23.8,
    humidity: 81.4,
  },
  {
    timestamp: "Page F",
    temperature: 25,
    humidity: 77.2,
  },
  {
    timestamp: "Page G",
    temperature: 25.6,
    humidity: 73.9,
  },
  {
    timestamp: "Page G",
    temperature: 25.3,
    humidity: 78.3,
  },
  {
    timestamp: "Page G",
    temperature: 25,
    humidity: 77.2,
  },
  {
    timestamp: "Page G",
    temperature: 25.6,
    humidity: 77.8,
  },
  {
    timestamp: "Page G",
    temperature: 24.7,
    humidity: 77.6,
  },
  {
    timestamp: "Page G",
    temperature: 24.9,
    humidity: 78.6,
  },
];

export default function TemperaturHumidityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mockData}>
        <CartesianGrid vertical={false} />
        <Tooltip />
        <Legend />
        <YAxis axisLine={false} tickLine={false} yAxisId="left">
          <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
            Temperatur
          </Label>
        </YAxis>
        <YAxis
          axisLine={false}
          tickLine={false}
          yAxisId="right"
          orientation="right"
        >
          <Label angle={270} position="right" style={{ textAnchor: "middle" }}>
            Luftfeuchtigkeit
          </Label>
        </YAxis>
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke="#17C964"
          strokeWidth={5}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="#0072F5"
          strokeWidth={5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
