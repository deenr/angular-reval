export interface ProgressStep {
  stepName: string;
  svgIcon: string;
  complete: boolean;
  current: boolean;
  text: string;
  supportingText: string;
}
