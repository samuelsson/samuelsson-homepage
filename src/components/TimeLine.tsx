import React from 'react';
import styled, { css } from 'styled-components';
import { colors, mediaQueries } from '../styles';

interface AboutMeTimeLine {
  year: number;
  text: string;
}

const timeLineDot = css`
  position: absolute;
  left: 74px;
  top: calc(50% - 6px);
  background-color: ${colors.blue};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  content: '';

  @media ${mediaQueries.medium} {
    left: 94px;
  }
`;

const TimelineTrace = css`
  position: absolute;
  top: 0;
  left: 79px;
  bottom: 0;
  border-right: solid 2px ${colors.gray[500]};
  width: 0;
  content: '';

  @media ${mediaQueries.medium} {
    left: 99px;
  }
`;

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0 0.5rem;

  &:after {
    ${timeLineDot}
  }

  &::before {
    ${TimelineTrace};
  }

  &:last-of-type::before {
    bottom: 50%;
  }

  &:first-of-type::before {
    top: 50%;
  }
`;

const YearContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 60px;
  margin-right: 40px;
  font-weight: bold;
  text-align: right;

  @media ${mediaQueries.medium} {
    width: 80px;
  }
`;

const TimeLine = (): JSX.Element => {
  const aboutMeTimeLine: AboutMeTimeLine[] = [
    { year: 1988, text: 'Yaay! I was born.' },
    { year: 1994, text: 'My dad buys our first computer and I am hooked.' },
    {
      year: 2001,
      text: 'I start building my own homepages, a lot of table elements.',
    },
    { year: 2007, text: 'Buy my first Mac before even using one ever.' },
    { year: 2008, text: 'Start working in an electronic retail store.' },
    {
      year: 2010,
      text: 'I launch a quite popular iPhone blog built on WordPress.',
    },
    { year: 2011, text: 'I start my own company, doing web design.' },
    { year: 2012, text: 'I join Mensa Sweden.' },
    { year: 2015, text: 'I graduate from the University.' },
    {
      year: 2016,
      text: 'I start working professionally as a web developer.',
    },
  ];

  return (
    <>
      {aboutMeTimeLine.map((date) => (
        <Item key={date.year + date.text}>
          <YearContainer>{date.year}</YearContainer>
          {date.text}
        </Item>
      ))}
    </>
  );
};

export default TimeLine;
