import React from 'react';

type GradientProps = {
  id: string;
  colors: string[];
};

const Gradient = ({
  id = 'Gradient',
  colors = [],
  ...props
}: GradientProps) => (
  <linearGradient
    id={id}
    gradientUnits='userSpaceOnUse'
    spreadMethod='pad'
    {...props}
  >
    {colors.map((color, i) => (
      <stop
        key={i}
        offset={`${(i * 100) / (colors.length - 1)}%`}
        stopColor={color}
      />
    ))}
  </linearGradient>
);

export default Gradient;
