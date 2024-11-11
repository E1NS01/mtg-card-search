import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCardForm, updateCardForm } from "../../actions/cardFormActions";
import { getRandomCardImage } from "../../lib/api";
import * as Yup from "yup";
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
import { Formik, FormikHelpers, ErrorMessage, Form } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  cost: Yup.number().integer().min(0),
  description: Yup.string(),
  power: Yup.number().integer().min(0),
  toughness: Yup.number().integer().min(0),
  type: Yup.string(),
});

function FormPage() {
  const { name, cost, image, type, description, power, toughness } =
    useSelector((state: RootState) => state.cardForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function initialImage() {
      if (!image) {
        dispatch(updateCardForm("image", await getRandomCardImage()));
      }
    }
    dispatch(resetCardList());
    initialImage();
  }, [image, dispatch]);

  async function handleSubmit(
    values: CardFormState,
    { setSubmitting }: FormikHelpers<CardFormState>
  ) {
    try {
      if (
        !values.type &&
        !values.cost &&
        !values.description &&
        !values.power &&
        !values.toughness
      ) {
        toast.warn(
          "At least one of Type, Cost, Description, Power or Toughness must be filled!"
        );
        return;
      }

      navigate("/loading");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset() {
    dispatch(resetCardForm());
    dispatch(updateCardForm("image", await getRandomCardImage()));
  }

  return (
    <Container>
      <FormContainer>
        <Formik
          initialValues={{
            name,
            cost,
            image,
            type,
            description,
            power,
            toughness,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {({ setFieldValue }) => {
            const handleChange =
              (field: keyof CardFormState) =>
              (
                event: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
              ) => {
                const { value } = event.target;
                setFieldValue(field, value);
                dispatch(updateCardForm(field, value));

                if (field === "type") {
                  if (
                    value === "enchantment" ||
                    value === "sorcery" ||
                    value === "instant" ||
                    value === "land"
                  ) {
                    dispatch(updateCardForm("power", ""));
                    dispatch(updateCardForm("toughness", ""));
                  }
                }
                if (value === "land") {
                  dispatch(updateCardForm("cost", ""));
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
                    value={name || ""}
                    onChange={handleChange("name")}
                    aria-label="Card Name"
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
                      value={type || ""}
                      onChange={handleChange("type")}
                      aria-label="Card Type"
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
                      visibility: type === "land" ? "hidden" : "visible",
                    }}
                  >
                    <StyledLabel htmlFor="cost">Cost</StyledLabel>
                    <StyledInput
                      id="cost"
                      name="cost"
                      type="number"
                      value={cost || ""}
                      min={0}
                      onChange={handleChange("cost")}
                      aria-label="Card Cost"
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
                    <CardImage src={image} alt="Card Image" />
                  </CardImageContainer>
                  <ImageButtonContainer>
                    <RefreshImageButton
                      type="button"
                      onClick={async () =>
                        dispatch(
                          updateCardForm("image", await getRandomCardImage())
                        )
                      }
                      aria-label="Refresh Card Image"
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
                    value={description || ""}
                    onChange={handleChange("description")}
                    aria-label="Card Description"
                  />
                  <ErrorMessage name="description" component="div" />
                </WholeLineInputContainer>

                <InputContainer
                  style={{
                    visibility:
                      type === "creature" || type === "" ? "visible" : "hidden",
                  }}
                >
                  <SplitInputContainer>
                    <StyledLabel htmlFor="power">Power</StyledLabel>
                    <StyledInput
                      id="power"
                      name="power"
                      type="number"
                      value={power || ""}
                      min={0}
                      onChange={handleChange("power")}
                      aria-label="Card Power"
                    />
                    <ErrorMessage name="power" component="div" />
                  </SplitInputContainer>

                  <SplitInputContainer>
                    <StyledLabel htmlFor="toughness">Toughness</StyledLabel>
                    <StyledInput
                      id="toughness"
                      name="toughness"
                      type="number"
                      value={toughness || ""}
                      min={0}
                      onChange={handleChange("toughness")}
                      aria-label="Card Toughness"
                    />
                    <ErrorMessage name="toughness" component="div" />
                  </SplitInputContainer>
                </InputContainer>

                <ButtonContainer>
                  <ClearButton type="reset" aria-label="Reset Form">
                    Reset
                  </ClearButton>
                  <SubmitButton type="submit" aria-label="Submit Form">
                    Search
                  </SubmitButton>
                </ButtonContainer>
              </Form>
            );
          }}
        </Formik>
      </FormContainer>
    </Container>
  );
}

export default FormPage;
