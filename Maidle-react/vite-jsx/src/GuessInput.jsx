import { useState } from "react";
import { motion } from "framer-motion";

import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

import songs from "./songData/songs_first_50.json";

const todaySong = {
  name: "True Love Song",
  artist: "Kai/クラシック「G線上のアリア」",
  type: "std",
  category: "maimai",
  version: "maimai",
  masterLV: 12.4,
};

const fields = ["name", "artist", "type", "category", "version", "master_difficulty"];
const fieldLabels = {
  name: "Name",
  artist: "Artist",
  type: "Type",
  category: "Category",
  version: "Version",
  master_difficulty: "Master Lv."
};

export const GuessSongBox = () => {
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setGuess(input);

    if (input.trim() !== "") {
      const filtered = songs
        .filter((s) =>
          s.name.toLowerCase().includes(input.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const extractMasterLevel = (song) => {
    const masterChart = song.charts?.find((chart) => chart.difficulty === "master");
    return masterChart ? masterChart.internal_level : null;
  };

  const handleSubmit = () => {
    if (isGameOver) return;

    const match = songs.find(
      (s) => s.name.toLowerCase() === guess.trim().toLowerCase()
    );

    let entry = null;

    if (match) {
      const extractedMasterLevel = extractMasterLevel(match);
      const isCorrect =
        match.name === todaySong.name &&
        match.artist === todaySong.artist &&
        match.type === todaySong.type &&
        match.category === todaySong.category &&
        match.version === todaySong.version &&
        extractedMasterLevel === todaySong.masterLV;

      entry = {
        ...match,
        master_difficulty: extractedMasterLevel,
      };

      if (isCorrect) {
        setIsGameOver(true);
        setCorrectCount((prev) => prev + 1);
      }
    } else {
      entry = { name: guess, notFound: true };
    }

    setGuesses((prev) => [...prev, entry]);
    setSuggestions([]);
    setGuess("");
  };

  const renderGuessRow = (song, index) => {
    if (song.notFound) {
      return (
        <Text key={index} color="red.400">
          ❌ "{song.name}" not found
        </Text>
      );
    }

    return (
      <Flex key={index} w="100%" gap="2">
        {fields.map((field) => {
          let bgColor = "red.500";
          if (field === "master_difficulty") {
            if (song[field] === todaySong.masterLV) {
              bgColor = "green.500";
            } else if (
              Math.floor(song[field]) === Math.floor(todaySong.masterLV)
            ) {
              bgColor = "orange.400";
            }
          } else if (song[field] === todaySong[field]) {
            bgColor = "green.500";
          }

          return (
            <Box
              key={field}
              flex="1"
              bg={bgColor}
              color="white"
              textAlign="center"
              borderRadius="md"
              py="2"
              fontWeight="bold"
            >
              {song[field]}
            </Box>
          );
        })}
      </Flex>
    );
  };

  return (
    <VStack spacing={4} align="start" w="100%">
      <Flex gap="2" direction="column" width="40%">
        <Flex gap="2">
          <Input
            placeholder="Enter a song name"
            value={guess}
            onChange={handleChange}
            isDisabled={isGameOver}
          />
          <Button
            width="10%"
            variant="outline"
            onClick={handleSubmit}
            isDisabled={isGameOver}
          >
            Submit
          </Button>
        </Flex>

        {guess.trim() !== "" && suggestions.length > 0 && (
          <Box mt="1" bg="black" p="2" borderRadius="md" boxShadow="sm">
            {suggestions.map((song, index) => (
              <Text
                key={index}
                fontSize="sm"
                _hover={{ bg: "#2b2b2b", cursor: "pointer" }}
                onClick={() => {
                  setGuess(song.name);
                  setSuggestions([]);
                }}
              >
                {song.name}
              </Text>
            ))}
          </Box>
        )}
      </Flex>

      <Flex w="100%" gap="2" px="1">
        {fields.map((field) => (
          <Box
            key={field}
            flex="1"
            textAlign="center"
            fontWeight="bold"
            color="white"
          >
            {fieldLabels[field]}
          </Box>
        ))}
      </Flex>

      <Flex direction="column-reverse" gap="2" w="100%">
        {guesses.map((song, idx) => renderGuessRow(song, idx))}
      </Flex>

      <Box>
        <Text>
          Total guesses: <b>{guesses.length}</b>
        </Text>
        <Text>
          Correct guesses: <b>{correctCount}</b>
        </Text>
        {isGameOver && (
          <Text color="green.300">🎉 You guessed it right! </Text>
        )}
      </Box>
    </VStack>
  );
};
