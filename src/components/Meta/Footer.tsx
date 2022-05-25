import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  by: string;
  source: string;
};

export default function Footer({ by, source }: FooterProps) {
  return (
    <figcaption>
      <Source>
        <SourceLink href={source}>{by}</SourceLink>
      </Source>
    </figcaption>
  );
}

const Source = styled.cite`
  display: block;
  text-align: right;
  margin-top: 8px;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: hsl(0deg 0% 35%);

  &::before {
    content: '—';
  }
`;
