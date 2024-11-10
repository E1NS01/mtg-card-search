import { Formik, FormikHelpers, Form, ErrorMessage } from "formik";
import { connect, useSelector } from "react-redux";
import { resetCardForm, updateCardForm } from "../../actions/cardFormActions";
import { getRandomCardImage } from "../../lib/api";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetCardList } from "../../actions/cardListActions";
import {
  ButtonContainer,
  CardImage,
  CardImageContainer,
  ClearButton,
  FormContainer,
  ImageButtonContainer,
  ImageContainer,
  InputContainer,
  RefreshImageButton,
  SplitInputContainer,
  StyledInput,
  StyledLabel,
  SubmitButton,
  WholeLineInputContainer,
} from "../../styles/formStyles";
import { toast } from "react-toastify";
import { Container } from "../../styles/globalStyle";

function FormPage({
  updateCardForm,
  resetCardForm,
  resetCardList,
}: CardFormProps) {
  const cardForm = useSelector((state: RootState) => state.cardForm);
  const navigate = useNavigate();

  useEffect(() => {
    async function initialImage() {
      if (!cardForm.image) {
        updateCardForm("image", await getRandomCardImage());
      }
    }
    resetCardList();
    initialImage();
  }, [updateCardForm, cardForm, resetCardList]);

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    cost: Yup.number().integer().min(0),
    description: Yup.string(),
    power: Yup.number().integer().min(0),
    toughness: Yup.number().integer().min(0),
    type: Yup.string(),
  });

  return (
    <Container>
      <FormContainer>
        <Formik
          initialValues={cardForm}
          validationSchema={validationSchema}
          onSubmit={(_, { setSubmitting }: FormikHelpers<CardValues>) => {
            try {
              if (
                !cardForm.type &&
                !cardForm.cost &&
                !cardForm.description &&
                !cardForm.power &&
                !cardForm.toughness
              ) {
                toast.warn(
                  "At least one of Type, Cost, Descripton, Power or Toughness musst be filled!"
                );
                return;
              }
              navigate("/loading");
            } catch (error) {
              console.error("Submission error:", error);
            } finally {
              setSubmitting(false);
            }
          }}
          onReset={async () => {
            resetCardForm();
            updateCardForm("image", await getRandomCardImage());
          }}
        >
          {({ setFieldValue }) => {
            const handleChange =
              (field: string) =>
              (
                event: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
              ) => {
                const { value } = event.target;
                setFieldValue(field, value);
                updateCardForm(field, value);

                if (field === "type") {
                  if (
                    value === "enchantment" ||
                    value === "sorcery" ||
                    value === "instant" ||
                    value === "land"
                  ) {
                    updateCardForm("power", "");
                    updateCardForm("toughness", "");
                  }
                }
                if (value === "land") {
                  updateCardForm("cost", "");
                }
              };

            return (
              <Form>
                <ErrorMessage name="submit" component="div" />

                <WholeLineInputContainer>
                  <StyledLabel htmlFor="name">Card Name</StyledLabel>

                  <StyledInput
                    id="name"
                    name="name"
                    type="text"
                    value={cardForm.name || ""}
                    onChange={handleChange("name")}
                  />
                  <ErrorMessage name="name" component="div" />
                </WholeLineInputContainer>
                <InputContainer>
                  <SplitInputContainer>
                    <StyledLabel htmlFor="type">Type</StyledLabel>
                    <StyledInput
                      id="type"
                      name="type"
                      component="select"
                      value={cardForm.type || ""}
                      onChange={handleChange("type")}
                    >
                      <option value="">Any</option>
                      <option value="creature">Creature</option>
                      <option value="land">Land</option>
                      <option value="enchantment">Enchantment</option>
                      <option value="instant">Instant</option>
                      <option value="sorcery">Sorcery</option>
                    </StyledInput>
                    <ErrorMessage name="type" component="div" />
                  </SplitInputContainer>

                  <SplitInputContainer
                    style={{
                      visibility:
                        cardForm.type === "land" ? "hidden" : "visible",
                    }}
                  >
                    <StyledLabel htmlFor="cost">Cost</StyledLabel>
                    <StyledInput
                      id="cost"
                      name="cost"
                      type="number"
                      value={cardForm.cost || ""}
                      onChange={handleChange("cost")}
                    />
                    <ErrorMessage name="cost" component="div" />
                  </SplitInputContainer>
                </InputContainer>
                <ImageContainer>
                  <CardImageContainer>
                    <StyledLabel
                      style={{
                        width: "100%",
                        textAlign: "left",
                        marginBottom: "0px",
                      }}
                    >
                      Image
                    </StyledLabel>
                    <CardImage src={cardForm.image} />
                  </CardImageContainer>
                  <ImageButtonContainer>
                    <RefreshImageButton
                      type="button"
                      onClick={async () =>
                        updateCardForm("image", await getRandomCardImage())
                      }
                    >
                      New Image
                    </RefreshImageButton>
                  </ImageButtonContainer>
                </ImageContainer>

                <WholeLineInputContainer>
                  <StyledLabel htmlFor="description">Description</StyledLabel>
                  <StyledInput
                    id="description"
                    name="description"
                    value={cardForm.description || ""}
                    onChange={handleChange("description")}
                  />
                  <ErrorMessage name="description" component="div" />
                </WholeLineInputContainer>

                <InputContainer
                  style={{
                    visibility:
                      cardForm.type === "creature" || cardForm.type === ""
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <SplitInputContainer>
                    <StyledLabel htmlFor="power">Power</StyledLabel>
                    <StyledInput
                      id="power"
                      name="power"
                      type="number"
                      value={cardForm.power || ""}
                      min={0}
                      onChange={handleChange("power")}
                    />
                    <ErrorMessage name="power" component="div" />
                  </SplitInputContainer>

                  <SplitInputContainer>
                    <StyledLabel htmlFor="toughness">Toughness</StyledLabel>
                    <StyledInput
                      id="toughness"
                      name="toughness"
                      type="number"
                      value={cardForm.toughness || ""}
                      min={0}
                      onChange={handleChange("toughness")}
                    />
                    <ErrorMessage name="toughness" component="div" />
                  </SplitInputContainer>
                </InputContainer>

                <ButtonContainer>
                  <ClearButton type="reset">Reset</ClearButton>
                  <SubmitButton type="submit">Search</SubmitButton>
                </ButtonContainer>
              </Form>
            );
          }}
        </Formik>
      </FormContainer>
    </Container>
  );
}

function mapStateToProps(state: RootState) {
  return { cardForm: state.cardForm };
}

const mapDispatchToProps = {
  updateCardForm,
  resetCardForm,
  resetCardList,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
