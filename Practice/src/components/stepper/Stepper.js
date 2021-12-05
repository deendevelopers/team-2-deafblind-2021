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
// const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

export const Vertical = ({ steps }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const allSteps = steps.map((el) => {
    const { number, step, equipment } = el;
    return { label: `Step ${number}`, content: step };
  });
  const hello = [
    { number: `£ ${steps.ingredients}`, detailDescription: "Monthly Cost" },
    // {
    //   detail: `${item.internet_speed} Mbps`,
    //   detailDescription: `${item.broadband_type} Speed`,
    // },
    // { detail: `£ ${item.set_up_cost}`, detailDescription: "Setup Costs" },
    // {
    //   detail: `${item.contract_info}`,
    //   detailDescription: "Contract",
    // },
  ];
  //   console.log({ hello });
  console.log(steps);
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
      {activeStep === 3 ? (
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
