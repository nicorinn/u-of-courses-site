import { Box, Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { ScoreBadge } from '../components/scoreBadge/ScoreBadge';

const Info: NextPage = () => {
  return (
    <Box p={5}>
      <Box mb={10}>
        <Text fontSize={20} fontWeight={600}>
          Where do these numbers come from?
        </Text>
      </Box>
      <Box mb={10}>
        <Text fontWeight={600}>Sentiment Score</Text>
        <Text>
          {`The sentiment score is a value from -1 (negative) to 1 (positive) that
          captures the average sentiment or opinion in the comments. It was
          calculated by a machine learning model.`}
          <br />
          {`Most sections have a
          sentiment score >0. In fact, 0.3 is low and -0.3 means you
          should avoid that prof/course at all costs.`}
        </Text>
      </Box>
      <Box>
        <Flex alignItems="flex-end" gap={3}>
          <Text fontWeight={600}>Badges</Text>
          <ScoreBadge score={7.8} />
          <ScoreBadge score={8.3} />
          <ScoreBadge score={9.1} />
        </Flex>
        <Text mb={3}>
          These badges represent the average on a 1-10 scale of the following
          mean scores for a course (if present):
        </Text>
        <Image width={250} height={353} src="/three.png" alt="screenshot" />
        <Image width={250} height={490} src="/one.png" alt="screenshot" />
        <Text mt={3}>
          {`Why these scores specifically? I think they're the most relevant ones
          when deciding whether to take a course, especially since many of the
          others don't vary much between courses or are already captured by the
          sentiment score.`}
        </Text>
      </Box>
    </Box>
  );
};

export default Info;
