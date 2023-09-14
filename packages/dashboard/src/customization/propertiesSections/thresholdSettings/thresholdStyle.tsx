import React, { useState } from 'react';
import { FormField, Select, SelectProps } from '@cloudscape-design/components';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';
import { ThresholdStyleType } from '@iot-app-kit/react-components/src/components/chart/types';

export type ThresholdStyleSettingsProps = {
  thresholdStyle: ThresholdStyleType;
  setThresholdStyle: (thresholdStyle: ThresholdStyleType) => void;
  updateAllThresholdStyles: (thresholdStyle: ThresholdStyleType) => void;
};

enum ThresholdStyleOptions {
  asLines = 'As lines',
  asFilledRegion = 'As filled region',
  asLinesAndFilledRegion = 'As lines and filled region',
}

const options = [
  { label: ThresholdStyleOptions.asLines, value: '1' },
  { label: ThresholdStyleOptions.asFilledRegion, value: '2' },
  { label: ThresholdStyleOptions.asLinesAndFilledRegion, value: '3' },
];

const convertOptionToThresholdStyle = (selectedOption: OptionDefinition): ThresholdStyleType => {
  switch (selectedOption.label) {
    case ThresholdStyleOptions.asLines: {
      return {
        visible: true,
      };
    }
    case ThresholdStyleOptions.asFilledRegion: {
      return {
        visible: false,
        fill: 'color',
      };
    }
    case ThresholdStyleOptions.asLinesAndFilledRegion: {
      return {
        visible: true,
        fill: 'color',
      };
    }
    default: {
      return {};
    }
  }
};

const convertThresholdStyleToOption = (thresholdStyle: ThresholdStyleType): OptionDefinition => {
  if (!!thresholdStyle.visible && !thresholdStyle.fill) {
    return options[0];
  } else if (!thresholdStyle.visible && !!thresholdStyle.fill) {
    return options[1];
  } else if (!!thresholdStyle.visible && !!thresholdStyle.fill) {
    return options[2];
  } else {
    return options[0];
  }
};

export const ThresholdStyleSettings: React.FC<ThresholdStyleSettingsProps> = ({
  thresholdStyle,
  setThresholdStyle,
  updateAllThresholdStyles,
}) => {
  const [selectedOption, setSelectedOption] = useState<SelectProps.Option>(
    convertThresholdStyleToOption(thresholdStyle)
  );

  return (
    <FormField label='Show thresholds'>
      <Select
        onChange={({ detail }) => {
          setSelectedOption(detail.selectedOption);
          const thresholdStyle = convertOptionToThresholdStyle(detail.selectedOption);
          // Update thresholdStyle state variable
          setThresholdStyle(thresholdStyle);
          // Update styles of all thresholds
          updateAllThresholdStyles(thresholdStyle);
        }}
        options={options}
        selectedOption={selectedOption}
      />
    </FormField>
  );
};