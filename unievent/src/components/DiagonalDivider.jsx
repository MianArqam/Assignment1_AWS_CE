export default function DiagonalDivider({ fromDark = false, reverse = false }) {
  const bgColor = fromDark ? '#0a0a0f' : '#12121a';
  const transform = reverse
    ? 'skewY(2deg)'
    : 'skewY(-2deg)';
  const origin = reverse ? 'top right' : 'top left';

  return (
    <div className="relative h-[120px] overflow-hidden z-[1]">
      <div
        className="absolute inset-0"
        style={{
          background: bgColor,
          transform,
          transformOrigin: origin,
        }}
      />
    </div>
  );
}
