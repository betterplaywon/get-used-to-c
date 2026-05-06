import type { Tutorial } from './types';

export const CONTROL_FLOW_TUTORIAL: Tutorial = {
  slug: 'control-flow',
  title: '조건문과 반복문',
  summary: '프로그램이 갈림길에서 갈라지고, 같은 일을 반복하게 만드는 법을 익힙니다.',
  steps: [
    {
      title: 'if / else if / else',
      body: [
        'C의 `if`는 괄호 안 표현식이 0이 아니면 참으로 봅니다. `if (x)`는 `if (x != 0)`과 같습니다.',
        '여러 갈래는 `else if`로 이어 붙입니다. `else`는 가장 마지막의 "그 외 모두"입니다.',
        '실수하기 쉬운 점: 중괄호 `{}` 없이 한 줄짜리 `if`를 쓰면 다음 한 문장만 묶입니다. 가독성과 안전을 위해 항상 중괄호를 쓰는 습관을 추천합니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int score = 75;

    if (score >= 90) {
        printf("A\\n");
    } else if (score >= 80) {
        printf("B\\n");
    } else if (score >= 70) {
        printf("C\\n");
    } else {
        printf("F\\n");
    }
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'C\n',
    },
    {
      title: 'switch — 정수 한 값으로 갈라지기',
      body: [
        '한 변수의 값에 따라 여러 갈래로 나뉠 때 `switch`가 깔끔합니다. 단, 비교 대상은 정수형(또는 문자, `enum`)이어야 합니다.',
        '`break`를 빠뜨리면 다음 `case`로 흘러내려가는 **fall-through**가 일어납니다. 의도한 fall-through라면 그렇게 표시해 주는 주석을 남기세요.',
        '`default`는 어디에도 매칭되지 않은 경우의 처리입니다. 가능한 한 항상 두는 편이 안전합니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int day = 3;

    switch (day) {
        case 1: printf("월요일\\n"); break;
        case 2: printf("화요일\\n"); break;
        case 3: printf("수요일\\n"); break;
        case 4: printf("목요일\\n"); break;
        case 5: printf("금요일\\n"); break;
        default: printf("주말\\n"); break;
    }
    return 0;
}
`,
      language: 'c',
      expectedStdout: '수요일\n',
    },
    {
      title: 'for 반복문 — 횟수가 정해진 반복',
      body: [
        '`for (init; cond; step)`은 세 부분으로 나뉩니다. 처음 한 번 `init`, 매 반복 직전에 `cond`를 검사, 매 반복 끝에 `step`이 실행됩니다.',
        '인덱스가 0부터 시작해 `i < n`까지 도는 패턴이 가장 흔합니다. 배열 단원에서 다시 만나게 됩니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("1+2+3+4+5 = %d\\n", sum);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '1+2+3+4+5 = 15\n',
    },
    {
      title: 'while과 do-while — 조건이 먼저인 반복',
      body: [
        '횟수가 아니라 어떤 조건이 만족될 때까지 반복해야 한다면 `while`이 자연스럽습니다.',
        '`while`은 조건을 먼저 보고 들어갑니다. 들어가지조차 못할 수도 있습니다.',
        '`do { ... } while (cond);`은 본문을 한 번은 실행하고 나서 조건을 검사합니다. 사용자에게 적어도 한 번은 입력을 받아야 할 때 같이 자주 쓰입니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int n = 16;
    int steps = 0;

    while (n > 1) {
        n /= 2;
        steps++;
    }
    printf("%d번 만에 1로 줄어들었습니다\\n", steps);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '4번 만에 1로 줄어들었습니다\n',
    },
    {
      title: 'break와 continue',
      body: [
        '반복문 안에서 `break`는 그 즉시 반복을 끝내고 빠져나옵니다.',
        '`continue`는 이번 회차의 나머지를 건너뛰고 다음 회차로 넘어갑니다.',
        '둘 다 잘 쓰면 조건이 깊게 중첩되는 것을 막아주지만, 흐름을 따라가기 어렵게 만들 수도 있으니 남용은 피하세요.',
      ],
      code: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;
        if (i > 7) break;
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}
`,
      language: 'c',
      expectedStdout: '1 3 5 7 \n',
    },
  ],
};
