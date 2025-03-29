import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, IconButton, Tooltip } from "@mui/material";
import { FavouritesContext } from "../../context/Favourites/FavouritesContext";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Stepper(props: Props) {
  const theme = useTheme();
  const { favourites } = React.useContext(FavouritesContext);
  const { currentStep, setCurrentStep } = props;
  const handleNext = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <MobileStepper
      variant="progress"
      steps={4}
      activeStep={currentStep}
      sx={{
        flex: 0,
        position: "initial",
      }}
      nextButton={
        <Box display={"flex"} gap={2}>
          <Box height={18} width={18}>
            {favourites.length == 0 && (
              <Tooltip title={"Select some favorties"}>
                <IconButton>
                  <ErrorIcon color="error" sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Button
            size="small"
            onClick={handleNext}
            disabled={currentStep === 3 || favourites.length === 0}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        </Box>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={currentStep === 1}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
