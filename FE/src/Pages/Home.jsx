import { Box, Button, Grid, GridItem, Image, Menu, MenuButton } from "@chakra-ui/react";
import Category from "../components/Category";
import Todolist from "../components/Todolist";
import homegradient1 from '../assets/homegradient1.svg'
import homegradient2 from '../assets/homegradient2.svg'
import { useState } from "react";
import useLogout from "../hooks/useLogout";

export default function Home() {
    const [externalSelectedCategory, setExternalSelectedCategory] = useState(null);
    // const [selectedCategory, setExternalSelectedCategory] = useState(null);
    const { logout } = useLogout()

    const handleSelectedCategoryChange = (selectedCategoryById, selectedTodoByCategory) => {

        setExternalSelectedCategory({ selectedCategoryById, selectedTodoByCategory });
    };

    return (
        <Box>
            <Image position={'absolute'} bottom={0} left={0} src={homegradient1} zIndex={'-1'} />
            <Image position={'absolute'} top={0} right={0} src={homegradient2} zIndex={'-1'} />
            <Grid templateColumns='repeat(4, 1fr)' height={'100vh'}>

                <GridItem colSpan={1}>
                    <Category onSelectedCategoryChange={handleSelectedCategoryChange} />
                </GridItem>
                <GridItem colSpan={2}>
                    <Todolist selectedCategory={externalSelectedCategory} />
                </GridItem>
                <GridItem colSpan={1}>
                    {/* LOGOUT */}
                    <Menu>
                        <MenuButton position={'absolute'} top={10} right={10} as={Button} onClick={() => logout()}>
                            Logout
                        </MenuButton>
                    </Menu>
                    {/* END MENU */}
                </GridItem>
            </Grid>
        </Box>
    )
}