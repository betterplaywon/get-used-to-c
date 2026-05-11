import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { findTutorial, findTutorialIndex, type Tutorial } from '@/shared/config/tutorials';
import { StepBody } from '@/shared/ui/StepBody';
import { StepNav } from '@/shared/ui/StepNav';
import { StepRunner } from '@/features/run-tutorial-step';
import { MemoryViewer } from '@/features/visualize-memory';
import { getStepNavInfo } from '../lib/getStepNavInfo';

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
  const navInfo = getStepNavInfo(tutorial.slug, stepIndex, tutorial.steps.length);

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      return;
    }
    if (navInfo.prevTutorialSlug) {
      navigate(`/tutorials/${navInfo.prevTutorialSlug}`);
    }
  };

  const handleNext = () => {
    if (stepIndex < tutorial.steps.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    if (navInfo.nextTutorialSlug) {
      navigate(`/tutorials/${navInfo.nextTutorialSlug}`);
    } else {
      navigate('/tutorials');
    }
  };

  const hasCode = step.code != null;
  const hasMemoryTrace =
    step.memoryTrace != null && step.memoryTrace.snapshots.length > 0;
  const hasRightColumn = hasCode || hasMemoryTrace;

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
          gridTemplateColumns: hasRightColumn ? { xs: '1fr', md: '1fr 1fr' } : '1fr',
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h2">{step.title}</Typography>
          <StepBody paragraphs={step.body} />
        </Stack>

        {hasRightColumn && (
          <Stack sx={{ gap: 2 }}>
            {hasCode && step.code && (
              <StepRunner
                key={`${tutorial.slug}-${stepIndex}`}
                initialCode={step.code}
                language={step.language ?? 'c'}
                expectedStdout={step.expectedStdout}
                hint={step.hint}
              />
            )}
            {hasMemoryTrace && step.memoryTrace && (
              <MemoryViewer
                key={`${tutorial.slug}-${stepIndex}-mem`}
                trace={step.memoryTrace}
              />
            )}
          </Stack>
        )}
      </Box>

      <StepNav
        current={stepIndex}
        total={tutorial.steps.length}
        onPrev={handlePrev}
        onNext={handleNext}
        prevLabel={navInfo.prevLabel}
        nextLabel={navInfo.nextLabel}
        prevDisabled={navInfo.prevDisabled}
      />
    </Stack>
  );
}
