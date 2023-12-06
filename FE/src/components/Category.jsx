import { Box, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, UnorderedList, Button, Input, PopoverFooter, Tag, Text, FormControl } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { useTodoList } from "../hooks/useTodoList";

export default function Category({ onSelectedCategoryChange }) {
    const { category, fetchById, newCategory, handleColorChange, handleTitleChange, createCategory, isOpen, setIsOpen } = useCategory();
    const { fetchDataByCategory, fetchData } = useTodoList();
    const [selectedTodoByCategory, setselectedTodoByCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(()=>{
        handleAll();
    },[])

    const handleAll = async () => {
        const TodosAll = await fetchData();
        setselectedTodoByCategory(TodosAll);
        setSelectedCategory(null);

        onSelectedCategoryChange(null, TodosAll);
    }

    const handleCategoryClick = async (categoryId) => {
        const todosByCategory = await fetchDataByCategory(categoryId);
        setselectedTodoByCategory(todosByCategory);

        const categoryById = await fetchById(categoryId)
        setSelectedCategory(categoryById);

        onSelectedCategoryChange(categoryById, todosByCategory);

    };


    return (
        <Box pt='164.66px' pl='70.5px' pr={'20px'} borderRight={'2px solid #D8D8D8'} h={'100vh'}>
            <UnorderedList listStyleType={'none'} fontSize={'24px'} spacing={'20px'}>

                <ListItem pl={2} cursor={'pointer'} onClick={() => handleAll()} color={'#000'} fontWeight={'700'} lineHeight={'normal'}>All Tasks</ListItem>

                {category.map((categoryItem) => (
                    <ListItem
                        key={categoryItem._id}
                        color={selectedCategory === categoryItem._id ? '#3182CE' : '#000'}
                        fontWeight={'400'}
                        lineHeight={'normal'}
                        pl={2}
                        cursor='pointer'
                        borderRadius={'10px'}
                        transition="background-color 0.2s ease-in-out"
                        _hover={{
                            backgroundColor: '#F1EFEF'
                        }}
                        onClick={() => handleCategoryClick(categoryItem._id)}
                    >
                        {categoryItem.title}
                    </ListItem>
                ))}
                {/* POPOVER TO ADD CATEGORY */}
                <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <PopoverTrigger>
                        <ListItem
                            color={'#ABABAB'}
                            fontWeight={'400'}
                            pl={2}
                            lineHeight={'normal'}
                            cursor='pointer'
                            as={'button'}
                            borderRadius={'10px'}
                            transition="background-color 0.2s ease-in-out"
                            _hover={{
                                backgroundColor: '#F1EFEF'
                            }}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            + New category
                        </ListItem>
                    </PopoverTrigger>
                    <PopoverContent border={'1px solid black'}>
                        <PopoverArrow />
                        <FormControl isRequired>
                            <PopoverHeader><Input width={'250px'} border={'2.5px solid #D8D8D8'}  onChange={handleTitleChange} placeholder={'New Category'} /></PopoverHeader>
                            <PopoverBody fontSize={'16px'}>Choose your Color Category</PopoverBody>
                            <PopoverFooter><Input type={'color'} border={'2.5px solid #D8D8D8'} onChange={handleColorChange} value={newCategory.color} /></PopoverFooter>
                            <PopoverBody><Tag bgColor={newCategory.color} color={'white'}>Sample Color</Tag></PopoverBody>
                            <PopoverFooter><Button size={'md'} onClick={createCategory}>Add</Button></PopoverFooter>
                        </FormControl>
                    </PopoverContent>
                </Popover>
                {/* END POPOVER */}
                
            </UnorderedList>
        </Box>
    );
}
