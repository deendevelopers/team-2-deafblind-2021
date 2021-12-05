import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Box, Center, Heading, Button, Flex } from "@chakra-ui/react";

export const Vertical = ({ steps }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const allSteps = steps.map((el) => {
    const { number, step, equipment } = el;
    return {
      label: `Step ${number}`,
      content: step,
      equipment: [...equipment],
    };
  });
  console.log(allSteps[0]);
  console.log(steps);
  return (
    <>
      <Box>
        <Steps orientation="vertical" activeStep={activeStep}>
          {allSteps.map(({ label, content, equipment }, index) => (
            <Step width="100%" label={label} key={label}>
              <Box my={1} index={index} bg="#6562">
                {/* <Box display="flex" justifyContent="center" mb={2}>
                  <ol>
                    Equipment:
                    {equipment.map((x, index) => (
                      <>
                        <li key={index} sx={{ textTransform: "uppercase" }}>
                          {" "}
                          {x.name}
                        </li>
                      </>
                    ))}
                  </ol>
                </Box> */}

                <Box> {content}</Box>
              </Box>
            </Step>
          ))}
        </Steps>
      </Box>
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
