import styled from 'styled-components';

export const Select = styled.select`
  width: auto;
  border-radius: 8px;
  padding: 11px 0;
  align-items: center;
  border: 1px solid #bfbfbf;

  &.tintometric {
    appearance: none;
    padding: 7px;
    font-size: 13px;
    color: #485760;
    background-image: url(/icons/general/chevron-down.svg);
    background-repeat: no-repeat;
    background-position: 90% 50%;
    background-size: 11px 8px;
    width: 72px;
  }
`;
