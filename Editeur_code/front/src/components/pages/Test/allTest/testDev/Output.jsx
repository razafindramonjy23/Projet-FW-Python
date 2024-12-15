import React, { useState } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { executeCode } from './Api';
import { generateContent } from './GeminiApi';  
const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);

      // Exécuter le code
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);

      // Obtenir des suggestions via Gemini
      const prompt = `Analyse le code suivant et propose des suggestions pas plus 30 mots:\n\n${sourceCode}`;
      const geminiSuggestions = await generateContent(prompt);  
      setSuggestions(geminiSuggestions.split('\n'));  
    } catch (error) {
      console.error(error);
      toast({
        title: "Une erreur s'est produite.",
        description: error.message || "Impossible d'exécuter le code ou de récupérer les suggestions",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="100%">
      <Text mb={2} fontSize="lg">Console</Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>

      {/* Affichage des résultats */}
      <Box
        height="35vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>

      {/* Affichage des suggestions */}
      <Text mt={4} mb={2} fontSize="lg">
        Suggestions de Gemini
      </Text>
      <Box
        height="35vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor="#333"
        overflowY="scroll"
      >
        {suggestions.length > 0
          ? suggestions.map((suggestion, i) => (
              <Text key={i}>• {suggestion}</Text>
            ))
          : "No suggestions available"}
      </Box>
    </Box>
  );
};

export default Output;
