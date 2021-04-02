export interface TimeSliderProps {
  initialValue?: number;
}

export interface RulerStyledProps {
  rulerWidth: number;
}

export interface SegmentStyledProps {
  isTenth: boolean;
  isFinal: boolean;
  segmentSpacing: number;
  segmentWidth: number;
}

export interface SegmentIndicatorStyledProps {
  segmentWidth: number;
  indicatorHeight: number;
}

export interface SegmentWrapperStyledProps {
  indicatorWidth: number;
}

export interface SpacerStyledProps {
  spacerWidth: number;
}

export interface TimeSliderRef {
  value: number;
}
