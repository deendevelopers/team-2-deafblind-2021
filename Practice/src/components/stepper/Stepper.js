import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
  Box,
  Center,
  Heading,
  Button,
  Text,
  Stack,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export const Vertical = ({ steps }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const allSteps = steps.map((el) => {
    const { number, step, equipment } = el;
    return { label: `Step ${number}`, content: step };
  });

  return (
    <>
      <Steps orientation="vertical" activeStep={activeStep}>
        {allSteps.map(({ label, content }, index) => (
          <Step width="100%" label={label} key={label}>
            <Box my={1} index={index}>
              {content}
            </Box>
          </Step>
        ))}
      </Steps>
      {activeStep === allSteps.length ? (
        <Center p={4} flexDir="column">
          <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
          <Button mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Center>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            mr={4}
            size="sm"
            variant="ghost"
            onClick={prevStep}
            isDisabled={activeStep === 0}
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Vertical;
