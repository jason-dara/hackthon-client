import {
  Box,
  Button,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [alt, setAlt] = useState(0);
  const [radius, setRadius] = useState(0);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMadeRequest, setHasMadeRequest] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { data } = await axios.post('http://localhost:5000/api/v1/sample', {
      lng,
      lat,
      alt,
      radius,
    });
    setResult(data);
    setLoading(false);
    setHasMadeRequest(true);
  };

  return (
    <>
      <Head>
        <title>Hackathon</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SimpleGrid>
        <Box p={10}>
          <Heading as='h3' size='md' mb={4}>
            Enter your query
          </Heading>
          <Text>Enter a longitude</Text>
          <NumberInput onChange={(e) => setLng(parseFloat(e))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>Enter a latitude</Text>
          <NumberInput onChange={(e) => setLat(parseFloat(e))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>Enter a altitude</Text>
          <NumberInput onChange={(e) => setAlt(parseFloat(e))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>Enter a radius (m)</Text>
          <NumberInput onChange={(e) => setRadius(parseFloat(e))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button mt={5} onClick={() => handleSubmit()}>
            Produce List
          </Button>
        </Box>
        <Box p={10}>
          <Heading as='h3' size='md' mb={4}>
            List of Points
          </Heading>
          {loading ? (
            <Spinner mt={4} />
          ) : (
            <Box>
              {result.length ? (
                <TableContainer>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th isNumeric>Longitude</Th>
                        <Th isNumeric>Latitude</Th>
                        <Th isNumeric>Altitude</Th>
                        <Th isNumeric>Distance</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {result.map(
                        (
                          resultItem: {
                            id: string;
                            lng: number;
                            lat: number;
                            alt: number;
                            distance: number;
                          },
                          i
                        ) => (
                          <Tr key={i}>
                            <Td key={i + 1}>{resultItem.id}</Td>
                            <Td key={i + 2} isNumeric>
                              {resultItem.lng}
                            </Td>
                            <Td key={i + 3} isNumeric>
                              {resultItem.lat}
                            </Td>
                            <Td key={i + 4} isNumeric>
                              {resultItem.alt}
                            </Td>
                            <Td key={i + 5} isNumeric>
                              {resultItem.distance}
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Text>{!hasMadeRequest ? 'Try out a query to see what you get' : 'No results 😔'}</Text>
              )}
            </Box>
          )}
        </Box>
      </SimpleGrid>
    </>
  );
}
