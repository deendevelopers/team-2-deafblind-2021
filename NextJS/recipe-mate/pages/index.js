import Head from 'next/head'
import { Box, Flex, Heading } from "@chakra-ui/react";
import RecipeSearch from '../components/RecipeSearch';

export default function Home() {
  return (
    <div >
      <Head>
        <title>Recipe Mate</title>
        <meta name="description" content="Search it, dish it, plate it - Everyone needs a Recipe Mate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Flex direction="column" bg="green.100" mb={4}>
          <Box p={4} w="100%" >
            <Heading as="h1" size="xl" color="#111">Search it, dish it, plate it</ Heading>
            <Heading as="h2" size="md" fontWeight="normal" color="#111">Everyone needs a Recipe Mate</ Heading>
            <RecipeSearch />
          </Box>
        </Flex>
      </main>
    </div>
  )
}
