import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 auto;

  justify-content: center;
  padding: 6.5rem 6.2rem 8.2rem 6.2rem;
  background-color: #4f4355;
  border-radius: 1rem;
  position: relative;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 8rem;
  justify-content: center;
  align-items: flex-start;
`;

export const CardImage = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 1.2rem;
  }
`;

export const MockCard = styled.div`
  width: 21rem;
  border-radius: 1.2rem;
  padding: 1.5rem;
  background-color: #2a253a;
`;

export const CardHeader = styled.div`
  display: flex;
  min-height: 2.25rem;
  color: #000;
  background-color: #b3b3b3;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  border-radius: 0.6rem;
`;

export const CardName = styled.h3`
  font-size: 1.5rem;
  padding-left: 1rem;
  margin: 0;
`;

export const ManaCost = styled.span`
  font-size: 1.7rem;
  padding-right: 1rem;
`;

export const CardType = styled.div`
  min-height: 1.5rem;
  font-size: 1.3rem;
  color: #000;
  background-color: #b3b3b3;
  margin-bottom: 0.45rem;
  align-content: center;
  padding-left: 1rem;
  border-radius: 0.5rem;
`;

export const CardArtPlaceholder = styled.div`
  max-width: 21rem;
  height: auto;
  max-height: 15.2rem;
  background-color: #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;

  img {
    flex-shrink: auto;
    min-width: 100%;
    min-height: 100%;
    border-radius: 0.5rem;
  }
`;

export const CardDescription = styled.div`
  font-size: 1.3rem;
  height: 10rem;
  background-color: #b3b3b3;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding-left: 1rem;
`;

export const PowerToughness = styled.div`
  width: 3rem;
  padding: 8px;
  text-align: center;
  font-size: 1.7rem;
  font-weight: bold;
  background-color: #757575;
  position: absolute;
  bottom: 6px;
  right: 6px;
  border-radius: 0.5rem;
`;

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  p {
    font-size: 1.5rem;
  }
`;

export const NavigationButton = styled.button`
  padding: 0.15rem 1.5rem;
  width: 7.5rem;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 3rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EditSearchButton = styled.button<{ moveLeft?: boolean }>`
  width: 7.5rem;
  height: 3rem;
  border-radius: 1rem;
  background-color: white;
  border: none;
  font-size: 1.5rem;

  ${({ moveLeft }) =>
    moveLeft &&
    `
    position: absolute;
    left: 2.8rem;
    bottom: 2.8rem;
  `}
`;

export const ColorBar = styled.div`
  height: 11.25rem;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  justify-content: space-around;
  background-color: #2a253a;
`;

export const Circle = styled.div<{ color: string }>`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  color: ${({ color }) => (color === "white" ? "black" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.5rem;
  }
`;

export const NoCardsFoundContainer = styled.div`
  width: 30rem;
  height: 12rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  background-color: #4f4355;
  border-radius: 0.75rem;
  align-items: center;
  justify-content: center;

  h1 {
    color: #fff;
    justify-content: center;
    margin-bottom: 4.5rem;
  }
`;
