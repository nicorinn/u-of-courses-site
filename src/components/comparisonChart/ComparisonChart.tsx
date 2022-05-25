import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';

export type BarsProps = {
  sectionVal: number;
  totalVal: number;
  isSentiment?: boolean;
  isHours?: boolean;
  label: string;
};

const ComparisonChart: React.FC<BarsProps> = ({
  sectionVal,
  totalVal,
  isSentiment = false,
  isHours = false,
  label,
}: BarsProps) => {
  const width = 400;
  const height = 100;
  const x = isSentiment ? 5 : 10;
  const boxWidth = width + 20;

  const sectionColor = '#b56576';
  const totalColor = '#6d597a';

  const sectionWidth = isSentiment
    ? sectionVal * width
    : (sectionVal / 5) * width;

  const totalWidth = isSentiment ? totalVal * width : (totalVal / 5) * width;

  const scale = scaleLinear<number>({
    domain: isSentiment ? [-1, 1] : [0, 10],
    range: [10, width],
    nice: true,
  });

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontWeight={700}>{label}</Text>
        <HStack>
          <Text fontWeight={700} color={sectionColor}>
            current
          </Text>
          <Text fontWeight={700} color={totalColor}>
            average
          </Text>
        </HStack>
      </Flex>
      <svg width={boxWidth} height={height}>
        <rect width={boxWidth} height={height} fill="url(#teal)" rx={14} />
        <Group>
          <Bar
            key={0}
            x={(isSentiment ? width / 2 : 0) + x}
            y={0}
            width={sectionWidth}
            height={20}
            fill={sectionColor}
            rx={4}
          />
          <Bar
            key={1}
            x={(isSentiment ? width / 2 : 0) + x}
            y={10}
            width={totalWidth}
            height={20}
            fill={totalColor}
            rx={4}
          />
          <AxisBottom
            top={30}
            scale={scale}
            stroke="#355070"
            tickStroke="#355070"
            numTicks={2}
            tickLabelProps={() => ({
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
    </Box>
  );
};

export default ComparisonChart;
