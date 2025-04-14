import { Field, Input, Button, Flex, Box, Text } from "@chakra-ui/react"
import { useState } from "react"
import songsData from "./songData/songs_first_50.json"

export const GuessSongBox = () => {
  const [guess, setGuess] = useState("")
  const [suggestions, setSuggestions] = useState([])

  
  const handleSubmit = () => {
    console.log("User guess:", guess)
  }

  const handleChange = (e) => {
    const input = e.target.value
    setGuess(input)

    if (input.trim() !== "") {
      const filtered = songsData.filter(song =>
        song.name.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  return (
    <Field.Root required>
      <Field.Label>
        Guess today's song: <Field.RequiredIndicator />
      </Field.Label>

      <Flex gap="2" direction="column" >
        <Flex gap="2" justifyContent="center">
          <Input 
            placeholder="Enter a song name" 
            value={guess}
            onChange={handleChange} 
            width="630px"
          />
          <Button 
            bg="bg.subtle" 
            variant="outline"
            whiteSpace="nowrap"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>

        {guess.trim() !== "" && suggestions.length > 0 && (
          <Box mt="2" bg="black" p="2" borderRadius="md" boxShadow="sm">
            {suggestions.map((song, index) => (
              <Text 
                key={index} 
                fontSize="sm" 
                _hover={{ bg: "gray.700", cursor: "pointer" }}
                onClick={() => setGuess(song.name)}
              >
                {song.name}
              </Text>
            ))}
          </Box>
        )}
      </Flex>
    </Field.Root>
  )
}
