export default function BackgroundImageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="background">{children}</div>;
}
