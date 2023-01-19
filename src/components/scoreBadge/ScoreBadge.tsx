import { Badge } from '@chakra-ui/react';
import React from 'react';
import { Section } from '../../types';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const value = Math.round(score * 10) / 10;
  return (
    <Badge bgColor={value >= 8 ? '#f7e98e' : ''} m={1} pt={1}>
      {value.toFixed(1)}
    </Badge>
  );
};

const SectionScoreBadge: React.FC<{ section: Section }> = ({ section }) => {
  const subscores = [
    section.evaluatedFairly,
    section.helpfulOutsideOfClass,
    section.standardsForSuccess,
    section.usefulFeedback,
  ];

  const sum = subscores.reduce((acc, subscore) => {
    if (subscore) {
      return acc! + subscore;
    }
    return acc;
  }, 0);

  const count = subscores.filter((subscore) => subscore !== null).length;

  if (sum) {
    return <ScoreBadge score={(sum / count) * 2} />;
  }
  return null;
};

export default SectionScoreBadge;

export { ScoreBadge };
