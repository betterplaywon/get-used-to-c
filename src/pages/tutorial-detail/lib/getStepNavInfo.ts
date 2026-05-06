import { TUTORIALS, findTutorialIndex } from '@/shared/config/tutorials';

export type StepNavInfo = {
  prevLabel: string;
  nextLabel: string;
  prevDisabled: boolean;
  prevTutorialSlug?: string;
  nextTutorialSlug?: string;
};

export function getStepNavInfo(
  tutorialSlug: string,
  stepIndex: number,
  totalSteps: number,
): StepNavInfo {
  const tutorialIndex = findTutorialIndex(tutorialSlug);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;
  const prevTutorial = tutorialIndex > 0 ? TUTORIALS[tutorialIndex - 1] : undefined;
  const nextTutorial =
    tutorialIndex < TUTORIALS.length - 1 ? TUTORIALS[tutorialIndex + 1] : undefined;

  const prevLabel = isFirstStep
    ? prevTutorial
      ? `이전 단원: ${prevTutorial.title}`
      : '이전'
    : '이전 단계';
  const nextLabel = isLastStep
    ? nextTutorial
      ? `다음 단원: ${nextTutorial.title}`
      : '목록으로'
    : '다음 단계';

  return {
    prevLabel,
    nextLabel,
    prevDisabled: isFirstStep && !prevTutorial,
    prevTutorialSlug: prevTutorial?.slug,
    nextTutorialSlug: nextTutorial?.slug,
  };
}
