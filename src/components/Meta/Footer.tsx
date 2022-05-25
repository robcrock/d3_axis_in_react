import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  by: string;
  source: string;
};

export default function Footer({ by, source }: FooterProps) {
  return (
    <Wrapper>
      <figcaption>
        <cite>
          <SourceLink href={source}>Source: {by}</SourceLink>
        </cite>
      </figcaption>
      <Logo src='../../../public/assets/helix_logo.png' alt='Helix Logo' />
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: hsl(0deg 0% 35%);
`;

const Logo = styled.img`
  height: 22px;
  object-fit: fill;
`;
