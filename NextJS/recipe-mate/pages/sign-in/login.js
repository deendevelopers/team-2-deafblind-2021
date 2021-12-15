import { signInWithEmailAndPassword } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseUtils";
import { FormControl, FormLabel, Input, Center, Heading, Flex } from "@chakra-ui/react";
import ChakraCustomButton from "../../components/ChakraCustomButton";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addRecipeSlugToUserSavedRecipesSlugs } from "../../redux/user/userActions";

const Login = () => {
    const { currentUser, saveRecipeWithSignIn, recipeSlugToSaveWithSignIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const router = useRouter();

    const [ formInputs, setFormInputs ] = useState({ email: "", password: "" }); 

    useEffect(() => {
        if(currentUser) router.replace("/dashboard");
    }, [currentUser]);
    
    const handleChange = ({ target: { name, value } }) => {
        setFormInputs(prevFormInputState => ({ 
            ...prevFormInputState,
            [name]: value
        }))
    }   

    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log(formInputs);
        const { email,  password } = formInputs;

        try {
            const { user } =  await signInWithEmailAndPassword(auth, email, password);
            if(saveRecipeWithSignIn){
                console.log("Save Recipe with Register")
                dispatch(addRecipeSlugToUserSavedRecipesSlugs({ userId: user.uid, recipeSlug: recipeSlugToSaveWithSignIn }));
            }
            setFormInputs({email: '', password:''})

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex as="section" direction="column" p={4}>
            <Center>
                <Heading as='h2' fontSize="2xl" m={[10, 0]}>
                    Log in
                </Heading>
            </Center>            
            
            <form className="login-form" onSubmit={handleSubmit}>

                <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input name="email" id="emailForLogin" type="email" value={formInputs.email} onChange={handleChange}/>
                </FormControl>

                <FormControl id='password'>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" id="passwordForLogin" type="password" value={formInputs.password} onChange={handleChange}/>
                </FormControl>

    
                <ChakraCustomButton type="submit" bg="#285E61" color="#fff">
                    Log-In
                </ChakraCustomButton>
            
            </ form>
        </ Flex>
    )
}

export default Login;