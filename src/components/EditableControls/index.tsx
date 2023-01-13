import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Stack, Tooltip, useEditableControls } from "@chakra-ui/react";
import useDeleteTask from "../../hooks/useDeleteTask";

const EditableControls = ({ idTask }: { idTask: string }) => {
  const { deleteTask, error: errorDelete } = useDeleteTask();
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <Stack direction="row">
      <Button size="sm" {...getSubmitButtonProps()} colorScheme="green">
        <CheckIcon />
      </Button>
      <Button size="sm" {...getCancelButtonProps()} colorScheme="red">
        <CloseIcon />
      </Button>
    </Stack>
  ) : (
    <Stack direction="row">
      <Tooltip label="Editar" placement="left">
        <Button size="sm" {...getEditButtonProps()}>
          <EditIcon />
        </Button>
      </Tooltip>
      <Tooltip label="Eliminar" placement="right">
        <Button onClick={() => deleteTask(idTask)} size="sm">
          <DeleteIcon />
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default EditableControls;
