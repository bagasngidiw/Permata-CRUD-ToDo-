import { useState, useEffect } from 'react';
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
    Box,
    Divider,
    Text,
} from '@chakra-ui/react';
import { useTodoList } from '../hooks/useTodoList';
import { useCategory } from '../hooks/useCategory';

// Assuming todoItem and onClose function are available in your component

const EditTodolist = ({ isOpen, onClose, todoItem }) => {
    const [titleValue, settitleValue] = useState('');
    const [idValue, setidValue] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [selectedTodoItem, setselectedTodoItem] = useState(todoItem);

    const { updateTodolist } = useTodoList()
    const { category, fetchById } = useCategory()



    useEffect(() => {

        if (isOpen) {
            setselectedTodoItem(todoItem);
            settitleValue(todoItem.title);
            setidValue(todoItem._id);
            setcategoryId(todoItem.category._id)
        }
    }, [isOpen, todoItem]);

    const handleInputChange = (event) => {
        settitleValue(event.target.value);
    };

    const handleSelectedChange = (event) => {
        setcategoryId(event.target.value);
    };

    const handleEdit = async () => {
        const _cat = await fetchById(categoryId);

        todoItem.title = titleValue;
        todoItem.category = _cat;
        await updateTodolist(idValue, titleValue, _cat)
        onClose();
    };

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Todolist</ModalHeader>
                <ModalCloseButton />
                <ModalBody rowGap={2}>
                    <Input value={idValue} hidden={true} onChange={() => { }} />
                    <Box mb={5}>
                        <Text as={'b'}>Title</Text>
                        <Input name='title' value={titleValue} onChange={handleInputChange} />
                    </Box>
                    <Input name='categoryId' hidden={true} value={categoryId} onChange={handleInputChange} />

                    <Text as={'b'}>Category</Text>
                    <Select value={categoryId} onChange={handleSelectedChange} >
                        {category.map((catitem) => (
                            <option key={catitem._id} value={catitem._id} >{catitem.title}</option>
                        ))}
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleEdit}>
                        Edit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditTodolist;
