import type { Tutorial } from './types';

export const DYNAMIC_MEMORY_TUTORIAL: Tutorial = {
  slug: 'dynamic-memory',
  title: '동적 할당 — `malloc`과 `free`',
  summary:
    '컴파일 시점이 아니라 실행 중에 필요한 만큼 메모리를 빌리고 돌려주는 법, 그리고 그 영역인 힙(heap)을 다룹니다.',
  steps: [
    {
      title: '왜 동적 할당이 필요한가',
      body: [
        '지금까지 본 변수와 배열은 모두 **컴파일 시점에 크기가 정해진** 메모리(=스택)에 자리잡았습니다. `int arr[5]`처럼요.',
        '하지만 사용자 입력이나 파일 크기처럼 "실행해 봐야 알 수 있는" 크기는 어떻게 다룰까요? 충분히 큰 배열을 미리 잡아두는 건 낭비고, 모자라면 또 위험합니다.',
        '`malloc`은 실행 중에 원하는 바이트 수만큼 메모리를 빌려달라고 요청하고, `free`는 다 쓴 메모리를 돌려줍니다. 이렇게 빌리는 영역을 **힙(heap)** 이라 부릅니다. 스택과 다른 별도 영역입니다.',
      ],
    },
    {
      title: '`malloc` — 힙에 칸을 빌리고 주소를 받기',
      body: [
        '`malloc(n)`은 힙에 `n`바이트짜리 영역을 잡고, 그 첫 주소를 돌려줍니다. 반환형은 `void *`(타입 미상의 주소)이라, 쓸 때는 원하는 포인터 타입으로 캐스팅합니다.',
        '`int *p = (int *)malloc(sizeof(int) * 4);`는 "정수 4칸 분량(보통 16바이트)을 빌려서, 그 시작 주소를 p에 담는다"는 뜻입니다.',
        '실패하면 `NULL`을 돌려주므로, 진지한 코드에서는 `if (p == NULL)` 검사를 합니다. 이 단원에서는 단순화를 위해 검사를 생략합니다.',
      ],
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = (int *)malloc(sizeof(int) * 4);

    for (int i = 0; i < 4; i++) {
        p[i] = (i + 1) * 10;
    }
    for (int i = 0; i < 4; i++) {
        printf("p[%d] = %d\\n", i, p[i]);
    }

    free(p);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'p[0] = 10\np[1] = 20\np[2] = 30\np[3] = 40\n',
      memoryTrace: {
        scenario: '힙에서 4칸을 빌려 채우고 다시 돌려주는 흐름',
        snapshots: [
          {
            line: 5,
            caption:
              '`malloc(16)` — 힙에 4칸짜리 영역이 잡히고, 그 첫 주소가 main의 p에 들어갑니다. 칸 안의 값은 아직 정해지지 않은 상태(쓰레기 값).',
            frames: [
              {
                name: 'main',
                vars: [
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x55a0e000',
                    address: '0x7ffd0040',
                    note: '→ 힙 영역',
                  },
                ],
              },
              {
                name: 'heap',
                vars: [
                  { name: '[0]', type: 'int', value: '?', address: '0x55a0e000' },
                  { name: '[1]', type: 'int', value: '?', address: '0x55a0e004' },
                  { name: '[2]', type: 'int', value: '?', address: '0x55a0e008' },
                  { name: '[3]', type: 'int', value: '?', address: '0x55a0e00c' },
                ],
              },
            ],
          },
          {
            line: 8,
            caption:
              '첫 반복문이 끝나면 힙의 4칸이 10, 20, 30, 40으로 채워집니다. p가 가리키는 곳을 통해 쓴 것이라, 칸의 주소(힙)는 그대로.',
            frames: [
              {
                name: 'main',
                vars: [
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x55a0e000',
                    address: '0x7ffd0040',
                  },
                ],
              },
              {
                name: 'heap',
                vars: [
                  { name: '[0]', type: 'int', value: '10', address: '0x55a0e000' },
                  { name: '[1]', type: 'int', value: '20', address: '0x55a0e004' },
                  { name: '[2]', type: 'int', value: '30', address: '0x55a0e008' },
                  { name: '[3]', type: 'int', value: '40', address: '0x55a0e00c' },
                ],
              },
            ],
          },
          {
            line: 14,
            caption:
              '`free(p);` — 힙 영역이 시스템에 반환됩니다. p 자체는 여전히 그 주소를 들고 있지만, 그 주소를 다시 쓰면 안 됩니다(댕글링 포인터).',
            frames: [
              {
                name: 'main',
                vars: [
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x55a0e000',
                    address: '0x7ffd0040',
                    note: '댕글링 — 더 이상 유효한 곳 아님',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '`free` — 빌린 만큼 돌려주기',
      body: [
        '`free(p)`는 `malloc`으로 받은 시작 주소를 돌려줘야 합니다. 일부만 잘라서 돌려줄 수는 없습니다.',
        '두 가지 흔한 사고:',
        '- **메모리 누수**: `free`를 잊으면 그 영역이 프로그램이 끝날 때까지 못 쓰게 잡혀 있습니다. 짧은 프로그램은 OS가 정리해 주지만, 오래 도는 프로그램에서는 결국 메모리가 바닥납니다.',
        '- **댕글링 포인터**: `free` 후에도 같은 주소를 들고 있다가 역참조하면 정의되지 않은 동작입니다. 안전을 위해 `free` 직후 `p = NULL;`로 초기화하는 패턴이 흔합니다.',
        '- **이중 해제**: 같은 포인터를 두 번 `free`하면 충돌합니다. `NULL`로 초기화해 두면 두 번째 `free(NULL)`은 안전하게 무시됩니다.',
      ],
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = (int *)malloc(sizeof(int));
    *p = 42;
    printf("*p = %d\\n", *p);

    free(p);
    p = NULL;

    if (p == NULL) {
        printf("p는 안전하게 비워졌습니다\\n");
    }
    return 0;
}
`,
      language: 'c',
      expectedStdout: '*p = 42\np는 안전하게 비워졌습니다\n',
      memoryTrace: {
        scenario: 'free 후 NULL로 초기화하는 안전 패턴',
        snapshots: [
          {
            line: 6,
            caption: '`*p = 42;` — 힙에 빌린 1칸에 42를 적습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x55a0e000',
                    address: '0x7ffd0040',
                    note: '→ 힙',
                  },
                ],
              },
              {
                name: 'heap',
                vars: [
                  { name: '[0]', type: 'int', value: '42', address: '0x55a0e000' },
                ],
              },
            ],
          },
          {
            line: 9,
            caption: '`free(p);` — 힙의 칸이 사라집니다. p는 댕글링.',
            frames: [
              {
                name: 'main',
                vars: [
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x55a0e000',
                    address: '0x7ffd0040',
                    note: '댕글링',
                  },
                ],
              },
            ],
          },
          {
            line: 10,
            caption: '`p = NULL;` — p에 NULL을 적어, 실수로 역참조해도 즉시 에러로 멈추게 만듭니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  {
                    name: 'p',
                    type: 'int *',
                    value: 'NULL (0x0)',
                    address: '0x7ffd0040',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '실행 중에 결정되는 크기 — 동적 배열',
      body: [
        '`malloc`의 진짜 가치는 "크기를 실행 중에 정할 수 있다"는 점입니다. 사용자가 입력한 `n`만큼 배열을 잡으려면 `int *arr = (int *)malloc(sizeof(int) * n);`이면 됩니다.',
        '아래 예제는 1부터 n까지의 합을 동적 배열에 저장한 뒤 출력합니다. `n`을 바꿔서 실행해 보세요.',
      ],
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *arr = (int *)malloc(sizeof(int) * n);

    int total = 0;
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        total += arr[i];
    }
    printf("1..%d 합 = %d\\n", n, total);

    free(arr);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '1..5 합 = 15\n',
      hint: 'n=10으로 바꾸면 1+2+...+10 = 55가 됩니다.',
    },
  ],
};
