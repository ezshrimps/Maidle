import { Card, Flex } from "@chakra-ui/react";
import "@fontsource/press-start-2p"; // Font import
import { ImageCircular } from "./logo";
import { GuessSongBox } from "./GuessInput";

function App() {
  return (
    <Flex
      direction="column"
      justify="top"
      paddingTop="5%"
      align="center"
      height="100vh"
      gap="6" // optional spacing between logo and card
    >
      <ImageCircular />
      <Card.Root width="80%" textAlign="center">
        <Card.Header fontSize="5xl" fontFamily="'Press Start 2P', sans-serif">
          <h1>Maidle</h1>
        </Card.Header>
        <Card.Body>
        <GuessSongBox></GuessSongBox>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card.Root>
    </Flex>
  );
}

export default App;

