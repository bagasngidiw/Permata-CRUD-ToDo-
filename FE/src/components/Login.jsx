import { Box, Button, Flex, Heading, Input, List, ListItem, Text, InputGroup, InputRightElement, Image, FormControl, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import dontshowpw from '../assets/dontshowpw.svg'
import showpw from '../assets/showpw.svg'
import useLogin from '../hooks/useLogin';
import useShowPassword from '../hooks/useShowPassword';


export default function Login() {

  const { showPassword, togglePasswordVisibility } = useShowPassword()
  const { handleChange, isLoading, signIn } = useLogin()

  return (
    <>
      <Box w="100%" h={'100%'} pt="126px" px={'64px'}>
        <Text color={'#5D5871'} mt={'10px'} fontSize={'20px'} fontWeight={'500'} letterSpacing={0.1}>Welcome to To Do List 👋</Text>
        <Text color={'#5D5871'} fontSize={'13px'} fontWeight={'400'} lineHeight={'16.9px'}>Please sign-in to your account, and start manage further</Text>
        <Text color={'#5D5871'} mt={'40px'} fontSize={'20px'} fontWeight={'500'} >Sign In</Text>

        <FormControl isRequired>
          <Text color={'#5D5871'} mt={'20px'} fontSize={'13px'} fontWeight={'400'}>Username</Text>
          <Input
            name='username'
            onChange={handleChange}
            mt="5px"
            placeholder="Your registered username"
            _placeholder={{ color: '#A6A3A3' }}
            borderRadius={'5px'}
          />
          <Text color={'#5D5871'} mt={'15px'} fontSize={'13px'} fontWeight={'400'}>Password</Text>
          <InputGroup mt="5">
            <Input
              name='password'
              onChange={handleChange}
              placeholder="*****"
              type={showPassword ? 'text' : 'password'}
              _placeholder={{ color: '#A6A3A3' }}
              borderRadius="5px"
            />
            <InputRightElement width="3rem" cursor="pointer">
              <Image
                src={showPassword ? dontshowpw : showpw}
                onClick={togglePasswordVisibility}
                style={{ width: '1.25rem', height: '1.25rem' }}
              />
            </InputRightElement>
          </InputGroup>
          <Button onClick={signIn} mt="40px" bg="#1571DE" color={'#FFF'} borderRadius={'5px'} width={'100%'} _hover={{ bg: '#125aa3' }} >
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Sign In" 
            )}
          </Button>
        </FormControl>

        <Flex mt='30px' width={'100%'} justify={'center'}>
          <Text>
            Don't have an account yet?{' '}
            <Link to={'/'}>
              <Text as="span" color="#1571DE" _hover={{ textDecoration: 'underline' }}>
                Sign Up
              </Text>
            </Link>
          </Text>
        </Flex>
      </Box>
    </>
  );
};

