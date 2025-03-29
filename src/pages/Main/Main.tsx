import { useState } from "react";
import Stepper from "../../components/Stepper/Stepper";
import ConfirmFavorites from "../ConfirmFavorites/ConfirmFavorites";
import GenerateMatch from "../GenerateMatch/GenerateMatch";
import { DogsList } from "../../components/DogList/DogsList";
import { Box } from "@mui/material";

const Main = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <Box display={"flex"} flexDirection={"column"} height={'100%'}>
      <Box flex={1} overflow={"hidden"}>
        {currentStep === 1 && <DogsList />}
        {currentStep === 2 && <ConfirmFavorites />}
        {currentStep === 3 && <GenerateMatch />}
      </Box>
      <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Box>
  );
};

export default Main;
