import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    Select,
    useDisclosure,
} from '@chakra-ui/react';
import { useTodoList } from '../hooks/useTodoList';

export default function DeleteTodolist({ isOpen, onClose, todoItem }) {

    const { deleteTodolist } = useTodoList()

    const handleDelete = () => {
        deleteTodolist(todoItem._id)
        onClose()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are u sure want to Delete This Todo?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleDelete()}>
                            Yes
                        </Button>
                        <Button variant='ghost' onClick={onClose}>No</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}