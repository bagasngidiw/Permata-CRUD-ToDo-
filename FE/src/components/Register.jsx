import { Box, Button, Flex, Input, Text, InputGroup, InputRightElement, Image, FormControl, Spinner } from '@chakra-ui/react';
import useShowPassword from '../hooks/useShowPassword';
import dontshowpw from '../assets/dontshowpw.svg'
import showpw from '../assets/showpw.svg'
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import {useState } from 'react';


export default function Register() {
  const { showPassword, togglePasswordVisibility } = useShowPassword()
  const { handleChange, isLoading, signUp} = useRegister() 
  return (
    <>
      <Box w="100%" h={'100%'} pt="20px" pb='230px' px={'64px'}>
        <Text color={'#5D5871'} mt={'10px'} fontSize={'20px'} fontWeight={'500'} letterSpacing={0.1}>Welcome to To Do List 👋</Text>
        <Text color={'#5D5871'} fontSize={'13px'} fontWeight={'400'} lineHeight={'16.9px'}>Please sign-up, and start manage further</Text>
        <Text color={'#5D5871'} mt={'40px'} fontSize={'20px'} fontWeight={'500'} >Sign Up</Text>

        <FormControl isRequired>
          <Text color={'#5D5871'} mt={'20px'} fontSize={'13px'} fontWeight={'400'}>Name</Text>
          <Input
            name='name'
            onChange={handleChange}
            mt="5px"
            placeholder="Your Name"
            _placeholder={{ color: '#A6A3A3' }}
            borderRadius={'5px'}
          />

          <Text color={'#5D5871'} mt={'15px'} fontSize={'13px'} fontWeight={'400'}>Phone Number</Text>
          <Input
            name='phoneNumber'
            onChange={handleChange}
            mt="5px"
            placeholder="+62"
            _placeholder={{ color: '#A6A3A3' }}
            borderRadius={'5px'}
          />

          <Text color={'#5D5871'} mt={'15px'} fontSize={'13px'} fontWeight={'400'}>Email</Text>
          <Input
            name='email'
            onChange={handleChange}
            mt="5px"
            placeholder="example@gmail.com"
            _placeholder={{ color: '#A6A3A3' }}
            type={'email'}
            borderRadius={'5px'}
          />

          <Text color={'#5D5871'} mt={'15px'} fontSize={'13px'} fontWeight={'400'}>Username</Text>
          <Input
            name='username'
            onChange={handleChange}
            mt="5px"
            placeholder="Your Username"
            _placeholder={{ color: '#A6A3A3' }}
            borderRadius={'5px'}
          />

          <Text color={'#5D5871'} mt={'15px'} fontSize={'13px'} fontWeight={'400'}>Password</Text>
          <InputGroup mt="2">
            <Input
              name='password'
              onChange={handleChange}
              mt={'5px'}
              placeholder="*****"
              _placeholder={{ color: '#A6A3A3' }}
              type={showPassword ? 'text' : 'password'}
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
          <Button onClick={signUp} disabled={isLoading}  mt="40px" bg="#1571DE" color={'#FFF'} borderRadius={'5px'} width={'100%'} _hover={{ bg: '#125aa3' }} >
            {isLoading ? (
              <Spinner size="sm" color="white" /> // Show spinner if isLoading is true
            ) : (
              "Sign Up" // Show "Sign Up" text if isLoading is false
            )}
          </Button>
        </FormControl>

        <Flex mt='30px' width={'100%'} justify={'center'}>
          <Text color={'#5D5871'}>
            Already have an account?{' '}
            <Link to={'/login'}>
              <Text as="span" color="#1571DE" _hover={{ textDecoration: 'underline' }}>
                Login
              </Text>
            </Link>
          </Text>
        </Flex>
      </Box>
    </>
  );
};

