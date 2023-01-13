import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Collapse,
  Flex,
  Heading,
  Stack,
  Tag,
} from "@chakra-ui/react";
import { TodoItem, Spinner } from "../../components";
import useGetTasks from "../../hooks/useGetTasks";
import AddTask from "../../components/AddTask";
import AlertListEmpty from "../../components/AlertListEmpty";
import useAuth from "../../hooks/useAuth";

const Todo: React.FC = () => {
  const { today, next, finished, isLoadingTasks } = useGetTasks();
  const { user } = useAuth();

  if (isLoadingTasks) {
    return (
      <Flex justifyContent="center" alignItems="center" padding="300px">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Stack gap="20px">
      <Heading>Bienvenido {user?.displayName || user?.email}</Heading>
      <AddTask />
      <Accordion defaultIndex={[0]} allowMultiple maxW="100%">
        <AccordionItem>
          {({ isExpanded }) => (
            <Collapse in={true} animateOpacity>
              <h2>
                <AccordionButton gap="5px">
                  <Box as="span" flex="1" textAlign="left">
                    Hoy
                  </Box>
                  {!isExpanded && <Tag colorScheme="green">{today.length}</Tag>}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {today.length === 0 && (
                <AccordionPanel pb={4}>
                  <AlertListEmpty />
                </AccordionPanel>
              )}
              {today.map((task) => (
                <AccordionPanel key={task.id} pb={4}>
                  <TodoItem data={task} />
                </AccordionPanel>
              ))}
            </Collapse>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <Collapse in={true} animateOpacity>
              <h2>
                <AccordionButton gap="5px">
                  <Box as="span" flex="1" textAlign="left">
                    Próximamente
                  </Box>
                  {!isExpanded && <Tag colorScheme="green">{next.length}</Tag>}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {next.map((task) => (
                <AccordionPanel key={task.id} pb={4}>
                  <TodoItem data={task} />
                </AccordionPanel>
              ))}
            </Collapse>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <Collapse in={true} animateOpacity>
              <h2>
                <AccordionButton gap="5px">
                  <Box as="span" flex="1" textAlign="left">
                    Terminadas
                  </Box>
                  {!isExpanded && (
                    <Tag colorScheme="green">{finished.length}</Tag>
                  )}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {finished.map((task) => (
                <AccordionPanel key={task.id} pb={4}>
                  <TodoItem data={task} />
                </AccordionPanel>
              ))}
            </Collapse>
          )}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};

export default Todo;
