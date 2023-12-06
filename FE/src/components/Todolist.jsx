import { Box, Button, ButtonGroup, Checkbox, Flex, Input, Text, Menu, MenuButton, Grid, GridItem } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useTodoList } from "../hooks/useTodoList";
import { useUpdateStatusTodo } from "../hooks/useUpdateStatusTodo";
import DeleteTodolist from "./DeleteTodolist";
import DropDownCategory from "./DropwDownCategory";
import EditTodolist from "./EditTodolist";
import { useCategory } from "../hooks/useCategory";

export default function Todolist({ selectedCategory }) {
    const { todo, createTodolist } = useTodoList()
    const { checkedState, handleCheckbox } = useUpdateStatusTodo();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const { category } = useCategory()
    const [title, setTitle] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSelectedCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && title && selectedCategoryId) {
            try {
                // console.log(selectedCategoryId, "select cat id");
                await createTodolist(title, selectedCategoryId);
            } catch (error) {
                console.error('Error creating todo:', error);
            }
            setTitle('');
        }
    };

    const [selectedTodoItem, setselectedTodoItem] = useState({ title: 'Initial Title' });


    const filteredTodoList = selectedCategory != null ?
        selectedCategory.selectedTodoByCategory !== null ?
            selectedCategory.selectedTodoByCategory : []
        : todo;

    return (

        <Box pt='84.16px' pl={8} h='100vh'>
            <Text color={'#000'} fontSize={'32px'} fontWeight={'700'} lineHeight={'normal'}>{
                selectedCategory != null ?
                    selectedCategory.selectedCategoryById !== null ?
                        selectedCategory.selectedCategoryById.title : "All Task"
                    : "All Task"
            }
            </Text>
            <Box display={'flex'}>
                <Input
                    mt={'27.5px'}
                    mb={'63.34px'}
                    mr={'50px'}
                    w={'500px'}
                    h={'58px'}
                    name='title'
                    borderRadius={'6px'}
                    background={'#E1DEDE'}
                    placeholder='Add a new task'
                    onKeyPress={handleKeyPress}
                    onChange={handleTitleChange}
                    _placeholder={{ color: '#ABABAB', fontSize: '25px', fontWeight: '400px' }}
                />

                <DropDownCategory key={todo._id}
                    handleSelectedCategory={handleSelectedCategory}
                    selectedCategoryId={selectedCategoryId}
                />

                {/* <DropDownCategory/> */}
            </Box>
            <Box pl={'20px'}>
                {filteredTodoList !== null && filteredTodoList !== undefined ? filteredTodoList.map((todoItem) => {
                    const isChecked = checkedState[todoItem._id] ?? todoItem.status;
                    
                    return (
                        <Grid templateColumns={'repeat(3, 1fr)'} key={todoItem._id} >
                            <GridItem colSpan={2}>
                                <Flex fontSize={'23px'} fontWeight={'400'} alignItems={'center'} pb={'20px'} width={'700px'}>
                                    <Checkbox border={'1px solid #EB5757'} mr={'16px'} onChange={() => handleCheckbox(todoItem._id, todoItem.status)} isChecked={isChecked}>
                                    </Checkbox>

                                    <Text textAlign={'center'} style={{ textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? '#EB5757' : 'inherit' }}>
                                        {todoItem.title}
                                    </Text>

                                    <Box py={'7.41px'} px={'33.1px'} flexShrink={'0'} borderRadius={'40px'} bg={todoItem.category.color} color={'#FFFFFF'} fontSize={'13px'} fontWeight={'400'} ml={'16px'}>
                                        {todoItem.category.title}
                                    </Box>


                                </Flex>
                            </GridItem>
                            <GridItem display={'flex'} justifyContent={'flex-end'}>
                                <ButtonGroup gap={3} >
                                    <Button onClick={() => {
                                        setselectedTodoItem(todoItem)
                                        setIsOpen(true)
                                    }}
                                        justifyContent={'flex-end'}
                                        colorScheme={'whatsapp'}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={() => {
                                        setselectedTodoItem(todoItem)
                                        setIsOpenDeleteModal(true)
                                    }}
                                        justifyContent={'flex-end'}
                                        colorScheme={'red'}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </ButtonGroup>
                            </GridItem>
                        </Grid>
                    );
                }) : ""}
            </Box>
            <EditTodolist
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                todoItem={selectedTodoItem}
            />
            <DeleteTodolist isOpen={isOpenDeleteModal}
                onClose={() => setIsOpenDeleteModal(false)}
                todoItem={selectedTodoItem} />
        </Box >
    )
}