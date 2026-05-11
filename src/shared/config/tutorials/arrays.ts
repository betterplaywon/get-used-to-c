import type { Tutorial } from './types';

export const ARRAYS_TUTORIAL: Tutorial = {
  slug: 'arrays',
  title: '배열',
  summary: '같은 자료형 칸을 여러 개 연속으로 늘어놓는 자료구조를 익힙니다.',
  steps: [
    {
      title: '배열 — 같은 칸을 연속으로',
      body: [
        '`int arr[5];`라고 쓰면, 정수 칸 5개가 메모리에 **연속해서** 잡힙니다. 이 "연속"이 배열의 본질입니다.',
        '인덱스는 0부터 시작합니다. 칸이 5개라면 유효한 인덱스는 `0, 1, 2, 3, 4`입니다. `arr[5]`에 접근하면 배열 바깥의 메모리를 건드리는 것이고, 이는 정의되지 않은 동작입니다.',
        '초기화 시 `{ ... }` 문법으로 값을 한꺼번에 넣을 수 있고, 모자란 자리는 0으로 채워집니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'arr[0] = 10\narr[1] = 20\narr[2] = 30\narr[3] = 40\narr[4] = 50\n',
      memoryTrace: {
        scenario: '5칸짜리 int 배열이 메모리에 연속으로 자리잡는 모습',
        snapshots: [
          {
            line: 4,
            caption:
              '`int arr[5] = {10, 20, 30, 40, 50};` — 정수 칸 5개가 4바이트 간격으로 줄지어 잡힙니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'arr[0]', type: 'int', value: '10', address: '0x7ffd0040' },
                  { name: 'arr[1]', type: 'int', value: '20', address: '0x7ffd0044' },
                  { name: 'arr[2]', type: 'int', value: '30', address: '0x7ffd0048' },
                  { name: 'arr[3]', type: 'int', value: '40', address: '0x7ffd004c' },
                  { name: 'arr[4]', type: 'int', value: '50', address: '0x7ffd0050' },
                ],
              },
            ],
          },
          {
            line: 5,
            caption:
              '반복문이 i를 0→4로 돌면서 각 칸의 값을 읽어 출력합니다. 칸 자체는 변하지 않습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'arr[0]', type: 'int', value: '10', address: '0x7ffd0040' },
                  { name: 'arr[1]', type: 'int', value: '20', address: '0x7ffd0044' },
                  { name: 'arr[2]', type: 'int', value: '30', address: '0x7ffd0048' },
                  { name: 'arr[3]', type: 'int', value: '40', address: '0x7ffd004c' },
                  { name: 'arr[4]', type: 'int', value: '50', address: '0x7ffd0050' },
                  { name: 'i', type: 'int', value: '0..4', address: '0x7ffd0054' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '배열은 메모리에 정말 "이어 붙어" 있다',
      body: [
        '각 원소의 주소를 출력해 보면, 인접한 원소의 주소 차이가 정확히 `sizeof(int)`만큼이라는 사실을 확인할 수 있습니다.',
        '이 성질 덕분에 `arr[i]`가 빠르게 동작합니다. 시작 주소에 `i * sizeof(int)`를 더하기만 하면 곧바로 `i`번째 칸에 닿을 수 있습니다.',
        '주소가 환경마다 달리 찍히더라도, **차이**는 4(또는 환경에 따라 다른 `int` 크기)로 일정해야 합니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("&arr[%d] = %p\\n", i, (void *)&arr[i]);
    }
    return 0;
}
`,
      language: 'c',
    },
    {
      title: '배열 이름은 "첫 칸의 주소"',
      body: [
        '대부분의 문맥에서, 배열 이름 `arr`은 자동으로 `&arr[0]`(첫 칸의 주소)으로 변환됩니다. 그래서 `arr`을 그대로 포인터처럼 다룰 수 있습니다.',
        '`*(arr + i)`와 `arr[i]`는 같은 의미입니다. C에서 `[]`는 "이 주소에서 i칸 떨어진 곳"의 문법 설탕일 뿐입니다.',
        '단, `sizeof(arr)`만은 예외라 배열 전체 크기를 돌려줍니다(포인터로 변환되지 않음).',
      ],
      code: `#include <stdio.h>

int main(void) {
    int arr[3] = {7, 8, 9};

    printf("arr      = %p\\n", (void *)arr);
    printf("&arr[0]  = %p\\n", (void *)&arr[0]);
    printf("arr[1]   = %d\\n", arr[1]);
    printf("*(arr+1) = %d\\n", *(arr + 1));
    return 0;
}
`,
      language: 'c',
    },
    {
      title: '함수에 배열 넘기기 — 사실은 포인터가 넘어간다',
      body: [
        '함수의 매개변수 `int arr[]`와 `int *arr`는 완전히 같은 의미입니다. 배열은 함수 호출 시 첫 칸 주소로 변환되어 전달됩니다.',
        '이 때문에 함수 안에서는 `sizeof(arr)`로 배열의 길이를 알 수 없습니다. 길이는 별도의 인자로 받아야 합니다.',
        '바꿔 말해, 함수 안에서 배열을 수정하면 호출자의 배열이 그대로 바뀝니다 — 포인터가 넘어갔으니까요.',
      ],
      code: `#include <stdio.h>

int sum(int arr[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    int data[5] = {1, 2, 3, 4, 5};
    printf("합계: %d\\n", sum(data, 5));
    return 0;
}
`,
      language: 'c',
      expectedStdout: '합계: 15\n',
      memoryTrace: {
        scenario: '함수에 배열을 넘기면 사실은 첫 칸의 주소가 넘어간다',
        snapshots: [
          {
            line: 12,
            caption: '`int data[5] = {1,2,3,4,5};` — main에 5칸 배열이 자리잡습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'data[0]', type: 'int', value: '1', address: '0x7ffd0040' },
                  { name: 'data[1]', type: 'int', value: '2', address: '0x7ffd0044' },
                  { name: 'data[2]', type: 'int', value: '3', address: '0x7ffd0048' },
                  { name: 'data[3]', type: 'int', value: '4', address: '0x7ffd004c' },
                  { name: 'data[4]', type: 'int', value: '5', address: '0x7ffd0050' },
                ],
              },
            ],
          },
          {
            line: 13,
            caption:
              '`sum(data, 5)` — sum 프레임의 arr는 배열 사본이 아니라 **첫 칸의 주소**입니다. n에는 길이 5가 따로 복사돼 들어갑니다.',
            frames: [
              {
                name: 'sum',
                vars: [
                  {
                    name: 'arr',
                    type: 'int *',
                    value: '0x7ffd0040',
                    address: '0x7ffd0020',
                    note: '→ main의 data[0]',
                  },
                  { name: 'n', type: 'int', value: '5', address: '0x7ffd0028' },
                  { name: 'total', type: 'int', value: '0', address: '0x7ffd002c' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'data[0]', type: 'int', value: '1', address: '0x7ffd0040' },
                  { name: 'data[1]', type: 'int', value: '2', address: '0x7ffd0044' },
                  { name: 'data[2]', type: 'int', value: '3', address: '0x7ffd0048' },
                  { name: 'data[3]', type: 'int', value: '4', address: '0x7ffd004c' },
                  { name: 'data[4]', type: 'int', value: '5', address: '0x7ffd0050' },
                ],
              },
            ],
          },
          {
            line: 6,
            caption:
              '반복문 종료 직전 — total은 1+2+3+4+5=15. main의 data는 그대로(읽기만 했음).',
            frames: [
              {
                name: 'sum',
                vars: [
                  { name: 'arr', type: 'int *', value: '0x7ffd0040', address: '0x7ffd0020' },
                  { name: 'n', type: 'int', value: '5', address: '0x7ffd0028' },
                  { name: 'total', type: 'int', value: '15', address: '0x7ffd002c' },
                  { name: 'i', type: 'int', value: '5', address: '0x7ffd0030' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'data[0]', type: 'int', value: '1', address: '0x7ffd0040' },
                  { name: 'data[4]', type: 'int', value: '5', address: '0x7ffd0050' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '문자열 — 끝을 0으로 표시한 char 배열',
      body: [
        'C에는 전용 문자열 타입이 없습니다. 문자열은 그냥 `char` 배열이고, 끝을 알리는 표시로 `\\0`(널 문자, 값 0)을 둡니다.',
        '`"hello"`라고 쓰면 컴파일러가 자동으로 끝에 `\\0`을 붙여 6바이트짜리 char 배열을 만들어줍니다.',
        '`%s`로 출력할 때는 `\\0`을 만날 때까지 한 글자씩 찍습니다. 만약 `\\0`이 없다면 어디까지 갈지 알 수 없는 위험한 상황이 됩니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    char greeting[] = "hello";
    printf("문자열: %s\\n", greeting);
    printf("길이를 직접 세기:\\n");
    int len = 0;
    while (greeting[len] != '\\0') {
        len++;
    }
    printf("len = %d\\n", len);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '문자열: hello\n길이를 직접 세기:\nlen = 5\n',
    },
  ],
};
