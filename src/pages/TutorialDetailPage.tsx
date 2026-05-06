import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TUTORIALS, findTutorial, findTutorialIndex } from '../features/tutorial/content';
import { StepBody } from '../features/tutorial/StepBody';
import { StepNav } from '../features/tutorial/StepNav';
import { StepRunner } from '../features/tutorial/StepRunner';
import type { Tutorial } from '../features/tutorial/types';

export function TutorialDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tutorial = slug ? findTutorial(slug) : undefined;

  if (!tutorial) {
    return (
      <Stack sx={{ gap: 2, alignItems: 'flex-start' }}>
        <Typography variant="h1">단원을 찾을 수 없습니다</Typography>
        <Typography color="text.secondary">
          요청한 단원이 없거나 주소가 잘못되었습니다.
        </Typography>
        <Button component={RouterLink} to="/tutorials" variant="contained">
          튜토리얼 목록으로
        </Button>
      </Stack>
    );
  }

  return <TutorialContent key={tutorial.slug} tutorial={tutorial} />;
}

type TutorialContentProps = {
  tutorial: Tutorial;
};

function TutorialContent({ tutorial }: TutorialContentProps) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  const step = tutorial.steps[stepIndex];
  const tutorialIndex = findTutorialIndex(tutorial.slug);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === tutorial.steps.length - 1;
  const prevTutorial = tutorialIndex > 0 ? TUTORIALS[tutorialIndex - 1] : undefined;
  const nextTutorial =
    tutorialIndex < TUTORIALS.length - 1 ? TUTORIALS[tutorialIndex + 1] : undefined;

  const handlePrev = () => {
    if (!isFirstStep) {
      setStepIndex((i) => i - 1);
      return;
    }
    if (prevTutorial) {
      navigate(`/tutorials/${prevTutorial.slug}`);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setStepIndex((i) => i + 1);
      return;
    }
    if (nextTutorial) {
      navigate(`/tutorials/${nextTutorial.slug}`);
    } else {
      navigate('/tutorials');
    }
  };

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

  const prevDisabled = isFirstStep && !prevTutorial;
  const hasCode = step.code != null;

  return (
    <Stack sx={{ gap: 3 }}>
      <Stack sx={{ gap: 1 }}>
        <Button
          component={RouterLink}
          to="/tutorials"
          variant="text"
          size="small"
          startIcon={<ChevronLeftIcon />}
          sx={{ alignSelf: 'flex-start' }}
        >
          튜토리얼 목록
        </Button>
        <Typography variant="caption" color="text.secondary">
          단원 {String(tutorialIndex + 1).padStart(2, '0')}
        </Typography>
        <Typography variant="h1">{tutorial.title}</Typography>
        <Typography color="text.secondary">{tutorial.summary}</Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: hasCode ? { xs: '1fr', md: '1fr 1fr' } : '1fr',
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h2">{step.title}</Typography>
          <StepBody paragraphs={step.body} />
        </Stack>

        {hasCode && step.code && (
          <StepRunner
            key={`${tutorial.slug}-${stepIndex}`}
            initialCode={step.code}
            language={step.language ?? 'c'}
            expectedStdout={step.expectedStdout}
            hint={step.hint}
          />
        )}
      </Box>

      <StepNav
        current={stepIndex}
        total={tutorial.steps.length}
        onPrev={handlePrev}
        onNext={handleNext}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        prevDisabled={prevDisabled}
      />
    </Stack>
  );
}
