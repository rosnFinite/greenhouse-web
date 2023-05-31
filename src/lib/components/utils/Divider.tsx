export default function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="border" />
      <span className="content">{children}</span>
      <div className="border" />
    </div>
  );
}
