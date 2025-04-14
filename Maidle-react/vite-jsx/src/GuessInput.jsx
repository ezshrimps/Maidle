import { Field, Input } from "@chakra-ui/react"

export const GuessSongBox = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Guess today's song: <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="Enter a song name" />
      <Field.HelperText>Huhhhh...What is today's song!!!</Field.HelperText>
    </Field.Root>
  )
}
