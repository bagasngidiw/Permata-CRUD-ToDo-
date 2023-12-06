import { Container, Box, Grid, GridItem, Image, Text, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import previewImage from '../assets/previewimage.png';
import gradientsvg1 from '../assets/gradientsvg1.svg'
import gradientsvg2 from '../assets/gradientsvg2.svg'

export default function Main({ children }) {

    return (
        <Box margin='0' padding='0' height='100vh' background={'#FAFAFA'}>
            <Image position={'absolute'} top={0} left={0} src={gradientsvg1} />
            <Image position={'absolute'} bottom={0} left={0} src={gradientsvg2} />

            <Grid
                templateColumns='repeat(3, 1fr)'
                templateRows='repeat(2,1fr)'
                height='100%'
            >
                <GridItem rowSpan={1} colSpan={2} pt={'70px'}>
                    <Container>
                        <Text fontSize={'117px'} fontWeight={'700'} letterSpacing={'-3.533px'} background={'linear-gradient(98deg, #EB5757 4.09%, #9B51E0 100%)'} lineHeight={1.2}
                            backgroundClip={'text'} alignSelf='flex-start'>TO DO LIST</Text>

                    </Container>
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} bg={'#FFFFFF'}>
                    {children}
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                    <Container>
                        <Image src={previewImage} boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)" flexShrink={0} borderRadius={10}
                        />
                    </Container>
                </GridItem>
            </Grid>
        </Box>
    )
}