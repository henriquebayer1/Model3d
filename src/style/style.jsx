// styles.js
import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const CartIcon = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

export const SceneLayout = styled.div`
  flex: 1;
  display: flex;
  gap: 40px;
  padding: 2rem;
  box-sizing: border-box;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: #000;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightPanel = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
`;

export const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffa600;
`;

export const StrikePrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 16px;
  margin-left: 10px;
`;

export const ColorSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

export const ColorOptions = styled.div`
  display: flex;
  gap: 12px;
`;

export const ColorCircle = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${props => (props.active ? '#1b78d6' : '#ccc')};
  background-color: ${props => props.color};
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const QuantityBtn = styled.button`
  padding: 0.5rem 1rem;
  font-size: 18px;
  border: 1px solid #ccc;
  background: #f8f8f8;
  cursor: pointer;
  border-radius: 6px;
`;

export const AddToCart = styled.button`
  padding: 0.75rem;
  background-color: #ffb000;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FavoriteIcon = styled.div`
  align-self: flex-end;
  font-size: 24px;
  color: #f77;
  cursor: pointer;
`;