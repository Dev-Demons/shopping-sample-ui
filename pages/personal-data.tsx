import type { NextPage } from "next";
import Layout from "../components/layoutComponents/Layout";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../lib/hooks";





import {
  updateUser,
  getOwnUser,
  selectUserStatus,
  selectUserData
} from "../lib/userSlice"

import { REQUEST_STATUS } from "../enums";

// to be removed, not meant to use chakra UI
import * as ch from "@chakra-ui/react"
import { useRouter } from "next/router";


const PersonalData: NextPage = () => {
  const router = useRouter()

  // Retrieve data from store
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector(selectUserStatus);
  const userData = useAppSelector(selectUserData);

  // Establish Component State
  const [formUserData, setUserFormData] = useState({
    display_name: '',
    email: '',
    gender: '',
  })

  const [password, setPassword] = useState('')


  const setUserName = (userName: string) => {
    let newState = { ...formUserData }
    newState.display_name = userName
    setUserFormData(newState)
  }

  const setEmail = (email: string) => {
    let newState = { ...formUserData }
    newState.email = email
    setUserFormData(newState)
  }

  const setGender = (gender: string) => {
    let newState = { ...formUserData }
    newState.gender = gender
    setUserFormData(newState)
  }





  // Handle User Status
  useEffect(
    () => {
      console.log(userStatus, userData)


      console.log(JSON.stringify(userData))

      if (userStatus == REQUEST_STATUS.IDLE) {
        dispatch(getOwnUser());
        return
      }



      if (userStatus == REQUEST_STATUS.FAILED) {
        router.push("/");
        return
      }

      if (userStatus == REQUEST_STATUS.SUCCEEDED) {
        setUserFormData(
          {
            display_name: userData.user.display_name,
            email: 'defaultemail@email.com',
            gender: 'Male',
          }
        )
        return
      }



    }, [setUserFormData, userData, userStatus]
  )
  console.log(formUserData)

  // Logic for handling the submit
  const handleSubmit = () => {

    let payload = {
      "email": formUserData.email,
      "display_name": formUserData.display_name,
      "gender": formUserData.gender,
      "phone_number": "14933549806",
    }

    dispatch(updateUser(payload))
  }

  // Rendering the page
  return (
    <Layout>
      <ch.HStack w="full" mb={5} >
        <ch.Spacer />
        <ch.VStack px={100} py={20} w="80%" h="full" bg="white">
          {
            userStatus == REQUEST_STATUS.SUCCEEDED ?
              <>
                <HeadPortraitField />
                <UserNameField userName={formUserData.display_name} setUserName={setUserName} />
                <GenderField gender={formUserData.gender} setGender={setGender} />
                <EmailField email={formUserData.email} setEmail={setEmail} />
                <BindingAccountField />
                <PasswordField password={password} setPassword={setPassword} />
                <RoleField role="Vendor" />
                <CountryField country="United States of America" />
                <SubmitButton handleSubmit={handleSubmit} />
              </>
              : <>Loading</>
          }
        </ch.VStack>
        <ch.Spacer />
      </ch.HStack>
    </Layout>
  );
};

export default PersonalData;


const HeadPortraitField = () => {

  const { isOpen, onOpen, onClose } = ch.useDisclosure()

  const handleFileSubmit = () => {
    alert("Submitting a new file")
    onClose()
  }

  return (
    <>
      {/* Modal */}
      <ch.Modal isOpen={isOpen} onClose={onClose}>
        <ch.ModalOverlay />
        <ch.ModalContent>
          <ch.ModalHeader>Upload a new image...</ch.ModalHeader>
          <ch.ModalCloseButton />
          <ch.ModalBody>
            Some file upload component
          </ch.ModalBody>
          <ch.ModalFooter>
            <ch.Button colorScheme='blue' mr={3} onClick={handleFileSubmit}>
              Upload
            </ch.Button>
            <ch.Button variant='ghost' onClick={onClose}>Cancel</ch.Button>
          </ch.ModalFooter>
        </ch.ModalContent>
      </ch.Modal>


      {/* FORM */}
      <ch.FormControl >
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>
            HeadPortrait:
          </ch.FormLabel>
          <ch.Image onClick={onOpen} src='' alt='Dan Abramov' />
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}



const UserNameField = ({ userName, setUserName }) => {
  return (
    <>
      <ch.FormControl >
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>Username:</ch.FormLabel>
          <ch.Input
            // Style
            variant="flushed"

            // Logic
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}



const GenderField = ({ gender, setGender }) => {
  return (
    <>
      <ch.FormControl>
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>
            Gender:
          </ch.FormLabel>
          <ch.RadioGroup onChange={setGender} value={gender}>
            <ch.Stack direction='row'>
              <ch.Radio value='Male'>Man</ch.Radio>
              <ch.Radio value='Female'>Woman</ch.Radio>
            </ch.Stack>
          </ch.RadioGroup>
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}

const EmailField = ({ email, setEmail }) => {
  return (
    <>
      <ch.FormControl >
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>Email:</ch.FormLabel>
          <ch.Input
            // Style
            type="email"
            variant="flushed"

            // Logic
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isReadOnly />
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}


const PasswordField = ({ password, setPassword }) => {
  return (
    <>
      <ch.FormControl >
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>Password:</ch.FormLabel>
          <ch.Input
            // Style
            type="password"
            variant="flushed"
            placeholder="*************"

            // Logic
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}



const BindingAccountField = () => {
  return (
    <>
      <ch.FormControl >
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>Binding Account:</ch.FormLabel>
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}

const RoleField = ({ role }) => {

  const { isOpen, onOpen, onClose } = ch.useDisclosure()

  const handleSubmit = () => {

    /* Put logic for changing role here */

    onClose()
  }

  return (
    <>
      {/* Modal */}
      <ch.Modal isOpen={isOpen} onClose={onClose}>
        <ch.ModalOverlay />
        <ch.ModalContent>
          <ch.ModalHeader>Change your role...</ch.ModalHeader>
          <ch.ModalCloseButton />
          <ch.ModalBody>
            Something to do with changing roles
          </ch.ModalBody>
          <ch.ModalFooter>
            <ch.Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Upload
            </ch.Button>
            <ch.Button variant='ghost' onClick={onClose}>Cancel</ch.Button>
          </ch.ModalFooter>
        </ch.ModalContent>
      </ch.Modal>

      {/* Form */}
      <ch.FormControl>
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>Role:</ch.FormLabel>
          <ch.Text>{role}</ch.Text>
          <ch.Text color="blue" onClick={onOpen}>Change</ch.Text>
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}


const CountryField = ({ country }) => {

  const { isOpen, onOpen, onClose } = ch.useDisclosure()

  const handleSubmit = () => {

    /* Put logic for changing country here */

    onClose()
  }

  return (
    <>
      {/* Modal */}
      <ch.Modal isOpen={isOpen} onClose={onClose}>
        <ch.ModalOverlay />
        <ch.ModalContent>
          <ch.ModalHeader>Change your role...</ch.ModalHeader>
          <ch.ModalCloseButton />
          <ch.ModalBody>
            Something to do with changing countries
          </ch.ModalBody>
          <ch.ModalFooter>
            <ch.Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Upload
            </ch.Button>
            <ch.Button variant='ghost' onClick={onClose}>Cancel</ch.Button>
          </ch.ModalFooter>
        </ch.ModalContent>
      </ch.Modal>

      {/* Form */}
      <ch.FormControl >
        <ch.HStack w="full" bg="white" px={5} mx={5}>
          <ch.FormLabel pt={2}>
            Country/Region:
          </ch.FormLabel>
          <ch.Text>{country}</ch.Text>
          <ch.Text color="blue" onClick={onOpen}>
            Change (Once a Year)
          </ch.Text>
        </ch.HStack>
      </ch.FormControl>
    </>
  )
}

const SubmitButton = ({ handleSubmit }) => {
  return (
    <>
      <ch.Button
        // Style
        borderRadius={0}
        width="20%"
        mt={4}
        type="submit"

        // Logic
        onClick={handleSubmit}
      >
        Save
      </ch.Button>
    </>
  )

}
