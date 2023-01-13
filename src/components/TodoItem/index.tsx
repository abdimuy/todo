import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  GridItem,
  Input,
  Stack,
  ScaleFade,
  Text,
  useEditableControls,
} from "@chakra-ui/react";
import React from "react";
import { TodoItemProps } from "./types";
import useUpdateTask from "../../hooks/useUpdateTask";
import { TaskUpdate } from "../../services/storage/updateTask";
import { EditableControls } from "../../components";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

const TodoItem: React.FC<TodoItemProps> = ({ data }) => {
  const [fieldsEdited, setFieldsEdited] = React.useState<TaskUpdate>({
    description: data.description,
  });
  const { updateTask, error: errorUpdate } = useUpdateTask();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsEdited({
      ...fieldsEdited,
      [event.target.name]: event.target.value,
    });
  };

  const dateTask = data.date as Timestamp;
  const dateTaskFormated = format(dateTask.toDate(), "dd/MM/yyyy");

  return (
    <ScaleFade in={true}>
      <Grid templateColumns="30px 1fr" placeItems="center" gap="2">
        <GridItem justifyContent="center">
          <Checkbox
            onChange={(e) => {
              updateTask(data.id || "", { completed: e.target.checked });
            }}
            size="lg"
            defaultChecked={data.completed}
          ></Checkbox>
        </GridItem>
        <GridItem justifyContent="center" width="100%">
          <Editable
            textAlign="left"
            fontSize="md"
            isPreviewFocusable={false}
            defaultValue={data.description}
            onSubmit={() => updateTask(data.id || "", fieldsEdited)}
          >
            <Stack direction="row">
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                paddingRight="3"
              >
                <EditablePreview
                  textColor={data.completed ? "gray" : ""}
                  textDecoration={data.completed ? "line-through" : "none"}
                />
                <Input
                  size="sm"
                  name="description"
                  as={EditableInput}
                  onChange={handleInputChange}
                  value={fieldsEdited.description as string}
                  width="100%"
                />
              </Stack>
              <Text
                display="flex"
                alignItems="center"
                fontSize="sm"
                color="gray"
                textAlign="center"
                width="min-content"
              >
                {dateTaskFormated}
              </Text>
              <EditableControls idTask={data.id || ""} />
            </Stack>
          </Editable>
        </GridItem>
      </Grid>
    </ScaleFade>
  );
};

export default TodoItem;
