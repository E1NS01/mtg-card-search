import { Field } from "formik";
import styled from "styled-components";

export const CardImageContainer = styled.div`
  width: 31.25rem;
  height: 29.67rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 0;
`;

export const CardImage = styled.img`
  width: 100%;
  max-width: 28.75rem;
  height: 20.75rem;
  object-fit: fit;
  padding-top: 1rem;
`;

export const FormContainer = styled.div`
  display: flex;
  padding: 3rem;
  overflow: hidden;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
`;

export const RefreshImageButton = styled.button`
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  line-height: 2rem;
`;

export const ImageButtonContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 62.5rem;
  height: 26.125rem;
  gap: 5rem
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledLabel = styled.label`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
`;

export const StyledInput = styled(Field)<StyledInputProps>`
  padding: 0.75rem;
  font-size: 1.5rem;
  border: 1.5px solid #ddd;
  border-radius: 0.5rem;
  gap: 3rem;
  display: block;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const ClearButton = styled.button`
  width: 7.5rem;
  height: 3rem;
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 1.5rem;
`;

export const SubmitButton = styled.button`
  width: 7.5rem;
  height: 3rem;
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 1.5rem;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  column-gap: 5rem;
`;

export const SplitInputContainer = styled(InputContainer)`
  flex-direction: column;
`;

export const WholeLineInputContainer = styled(InputContainer)`
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
