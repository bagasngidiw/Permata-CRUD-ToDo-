import { Select } from "@chakra-ui/react";
import { useCategory } from "../hooks/useCategory";
import { useState, useEffect } from 'react';


export default function DropwDownCategory({ handleSelectedCategory, selectedCategoryId }) {
    // const [categoryId, setcategoryId] = useState('')
    const { category } = useCategory()

    const handleSelectedChange = (event) => {
        const newSelectedCategoryId = event.target.value;
        handleSelectedCategory(newSelectedCategoryId); // Pass the selected category ID to the parent component
    };


    return (
        <Select mt={9} width={'200px'} value={selectedCategoryId} onChange={handleSelectedChange}>
            {category.map((catItem) => (
                <option key={catItem._id} value={catItem._id} >{catItem.title}</option>
            ))}
        </Select>
    )
}