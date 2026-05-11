import type { Tutorial } from './types';

export const FUNCTIONS_TUTORIAL: Tutorial = {
  slug: 'functions',
  title: '함수',
  summary: '코드를 이름 붙은 단위로 묶고, 값을 주고받는 법을 익힙니다.',
  steps: [
    {
      title: '함수 — 이름 붙은 코드 블록',
      body: [
        '함수는 입력(매개변수)을 받아 출력(반환값)을 돌려주는 작은 기계입니다. 같은 일을 여러 곳에서 해야 할 때 함수를 만들면 코드가 짧아지고, 이름 덕에 의도가 드러납니다.',
        '형태: `<반환타입> <이름>(<매개변수 목록>) { ... return <값>; }`. 반환할 값이 없으면 반환타입을 `void`로 둡니다.',
        '`main`도 사실 함수입니다. 프로그램은 `main`에서 시작해, `return 0;`으로 운영체제에 "정상 종료"를 알리고 끝납니다.',
      ],
      code: `#include <stdio.h>

int square(int x) {
    return x * x;
}

int main(void) {
    int n = 5;
    printf("%d의 제곱은 %d입니다\\n", n, square(n));
    return 0;
}
`,
      language: 'c',
      expectedStdout: '5의 제곱은 25입니다\n',
    },
    {
      title: '값에 의한 전달 (pass-by-value)',
      body: [
        'C의 매개변수는 기본적으로 **값 복사**입니다. 호출하는 쪽의 변수를 함수 안에서 바꿔도, 호출한 쪽 원본은 그대로입니다.',
        '함수 안의 매개변수 `n`과, 호출한 쪽의 변수 `x`는 이름만 같아도 메모리 위치가 다른 별개의 칸입니다.',
        '값을 수정해 호출자에게 돌려주고 싶다면 (1) 반환값으로 돌려주거나 (2) 포인터를 넘겨야 합니다. 두 번째 방법은 포인터 단원에서 다룹니다.',
      ],
      code: `#include <stdio.h>

void try_to_change(int n) {
    n = 999;
}

int main(void) {
    int x = 10;
    try_to_change(x);
    printf("x는 여전히 %d입니다\\n", x);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'x는 여전히 10입니다\n',
      memoryTrace: {
        scenario: '값 복사 — 함수 안의 n과 main의 x는 별개의 칸',
        snapshots: [
          {
            line: 8,
            caption: 'main 진입 — x=10이 main 프레임에 자리잡습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '10', address: '0x7ffd0040' },
                ],
              },
            ],
          },
          {
            line: 9,
            caption:
              '`try_to_change(x)` 호출 — 새 프레임이 쌓이고, 매개변수 n에는 x의 **값(10)** 이 복사돼 들어갑니다. 주소는 다릅니다.',
            frames: [
              {
                name: 'try_to_change',
                vars: [
                  {
                    name: 'n',
                    type: 'int',
                    value: '10',
                    address: '0x7ffd0020',
                    note: 'x의 사본',
                  },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '10', address: '0x7ffd0040' },
                ],
              },
            ],
          },
          {
            line: 4,
            caption: '`n = 999;` — 함수의 사본만 999로 바뀝니다. main의 x는 그대로.',
            frames: [
              {
                name: 'try_to_change',
                vars: [
                  { name: 'n', type: 'int', value: '999', address: '0x7ffd0020' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '10', address: '0x7ffd0040' },
                ],
              },
            ],
          },
          {
            line: 10,
            caption:
              '함수 반환 — try_to_change 프레임이 사라집니다. main의 x는 여전히 10.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '10', address: '0x7ffd0040' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '함수 선언과 정의 분리 — 프로토타입',
      body: [
        'C는 위에서 아래로 컴파일하기 때문에, `main`보다 아래에 정의된 함수를 `main` 안에서 호출하려면 위쪽에 **선언(프로토타입)** 을 먼저 적어줘야 합니다.',
        '선언은 시그니처만 알려주고, 정의는 실제 본문을 적습니다. 이 분리는 헤더 파일(`*.h`)과 소스 파일(`*.c`)로 코드를 나누는 기반이기도 합니다.',
      ],
      code: `#include <stdio.h>

int add(int a, int b);

int main(void) {
    printf("3 + 4 = %d\\n", add(3, 4));
    return 0;
}

int add(int a, int b) {
    return a + b;
}
`,
      language: 'c',
      expectedStdout: '3 + 4 = 7\n',
    },
    {
      title: '직접 만들어보기 — max 함수',
      body: [
        '두 정수 중 큰 값을 돌려주는 `max` 함수를 작성해 보세요. 비어 있는 본문을 채워서 실행하면 됩니다.',
        '두 값이 같을 때 어느 쪽을 돌려줘도 결과가 같다는 점, 비교 후 `return`은 한 번만 도달한다는 점을 떠올리며 작성해 보세요.',
      ],
      code: `#include <stdio.h>

int max(int a, int b) {
    // TODO: a와 b 중 큰 값을 반환하세요
    return 0;
}

int main(void) {
    printf("max(3, 7) = %d\\n", max(3, 7));
    printf("max(9, 2) = %d\\n", max(9, 2));
    return 0;
}
`,
      language: 'c',
      hint: '`if (a > b) return a; else return b;` 또는 삼항 연산자 `return a > b ? a : b;`',
    },
  ],
};
