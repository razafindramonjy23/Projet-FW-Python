import React from 'react'
import { Box } from '@chakra-ui/react'
import EditorWindows from './EditorWindows'


function EditeurDeCode() {
  return (
    <Box minH="100vh" bg="#daf5ed" color="gray.500" px={6} py={8} >
      <EditorWindows />
    </Box>
  )
}

export default EditeurDeCode
 