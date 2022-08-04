import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { Box, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { getBarX } from '../../utils';
import { StatComparison } from '../../types';
import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons';

export type BarsProps = {
  currentVal: number;
  averageData: StatComparison;
  isSentiment?: boolean;
  isHours?: boolean;
  label: string;
  width: number;
  height: number;
};

const ComparisonChart: React.FC<BarsProps> = ({
  currentVal,
  averageData,
  isSentiment = false,
  isHours = false,
  label,
  width,
  height,
}: BarsProps) => {
  // Should never actually be undefined
  // TODO: Maybe update type or use !
  const averageVal = averageData.average ?? currentVal;
  const x = isSentiment ? 5 : 10;
  const boxWidth = width + 20;

  const sectionColor = '#b56576';
  const totalColor = '#6d597a';

  const currentWidth = (() => {
    if (isSentiment) return Math.abs((currentVal / 2) * width);
    if (isHours) return (currentVal / 33) * width;
    return (currentVal / 5) * width;
  })();

  const averageWidth = (() => {
    if (isSentiment) return (averageVal / 2) * width;
    if (isHours) return (averageVal / 33) * width;
    return (averageVal / 5) * width;
  })();

  const domain = (() => {
    if (isSentiment) return [-1, 1];
    if (isHours) return [0, 35];
    return [0, 10];
  })();

  const scale = scaleLinear<number>({
    domain: domain,
    range: [10, width],
    nice: true,
  });

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text fontWeight={700}>{label}</Text>
        <VStack ml={5} mb={5} textAlign="left">
          <Text fontWeight={700} color={sectionColor}>
            current
          </Text>
          <Tooltip
            label={`average for all ${averageData.sectionCount} sections with this value`}
            fontSize="xs"
            placement="left-start"
          >
            <Flex>
              <Text fontWeight={700} color={totalColor}>
                average
              </Text>
              <InfoIcon boxSize={2} color={totalColor} />
            </Flex>
          </Tooltip>
        </VStack>
      </Flex>
      <svg width={boxWidth} height={height}>
        <rect width={boxWidth} height={height} fill="white" rx={14} />
        <Group>
          <Bar
            key={0}
            x={getBarX(currentVal, width, isSentiment) + x}
            y={0}
            width={currentWidth}
            height={20}
            fill={sectionColor}
            rx={4}
          />
          <Bar
            key={1}
            x={getBarX(averageVal, width, isSentiment) + x}
            y={10}
            width={averageWidth}
            height={20}
            fill={totalColor}
            rx={4}
          />
          <AxisBottom
            top={30}
            scale={scale}
            stroke="#355070"
            tickStroke="#355070"
            numTicks={isHours ? 5 : 2}
            tickLabelProps={() => ({
              fill: '#355070',
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
