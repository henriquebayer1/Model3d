// styles.js
import styled from "styled-components";


export const RatingBox = styled.div`
  display: inline-flex;
  align-items: center;
  background: #fff5e5;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 14px;
  color: #f5a623;
  gap: 4px;
`;

export const ReviewButton = styled.div`
  display: inline-flex;
  align-items: center;
  background: #eef1ff;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #444;
  font-weight: 500;
  gap: 6px;
  cursor: pointer;
`;

export const DiscountNote = styled.div`
  color: #2ecc71;
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  & span {
    color: #888;
    font-weight: normal;
    margin-left: 4px;
  }
`;

export const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 90%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #ffffff;
`;

export const Logo = styled.img`
  height: 32px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
`;

export const NavItem = styled.a`
  text-decoration: none;
  color: ${({ active }) => (active ? '#ffa600' : '#000')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  &:hover {
    color: #ffa600;
  }
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
  width: 700px;
  height: 500px;
  background: #000;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightPanel = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
`;

export const Hr = styled.div`
  width: 100%;
  border-bottom: 0.5px solid gray;
`;

export const ProductTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;

`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffa600;
  display: flex;
  gap: 310px;
  align-items: center;
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
  border-bottom: 1px solid gray;
  padding: 10px;
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
  padding-bottom: 10px;
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
  padding: 0.75px;
  width: 300px;
  height: 55px;
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