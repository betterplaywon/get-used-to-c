import type { Tutorial } from './types';

export const POINTERS_TUTORIAL: Tutorial = {
  slug: 'pointers',
  title: '포인터',
  summary: '변수의 "주소"를 다루는 법, 그리고 그 주소를 통해 다시 값에 닿는 법을 익힙니다.',
  steps: [
    {
      title: '주소 연산자 `&` — 변수가 사는 곳',
      body: [
        '모든 변수는 메모리 어딘가에 살고 있고, 그 위치를 **주소**라 부릅니다. 변수 이름 앞에 `&`를 붙이면 그 주소를 얻을 수 있습니다.',
        '주소는 환경마다 다르게 찍힙니다. 같은 코드라도 실행할 때마다 다를 수 있으니, 값 자체보다 "두 변수가 가까이 있는가, 멀리 있는가"를 살피는 게 더 의미가 있습니다.',
        '`%p`는 포인터/주소를 출력할 때 쓰는 형식 지정자이고, 이때 값은 보통 `(void *)`로 캐스팅합니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int x = 42;
    int y = 7;

    printf("x는 %d, &x = %p\\n", x, (void *)&x);
    printf("y는 %d, &y = %p\\n", y, (void *)&y);
    return 0;
}
`,
      language: 'c',
    },
    {
      title: '포인터 변수 — 주소를 담는 칸',
      body: [
        '포인터 변수는 "다른 변수의 주소"를 담는 또 하나의 변수입니다. 자료형 옆에 `*`를 붙여 선언합니다. `int *p;`은 "정수의 주소를 담는 칸"이라는 뜻입니다.',
        '`p = &x;`로 `p`에 `x`의 주소를 적어 넣으면, 그때부터 `p`는 `x`를 가리킵니다.',
        '핵심은 "주소도 값이라서 변수에 담을 수 있다"는 것입니다. 이 아이디어 위에 배열, 동적 할당, 함수 인자 전달이 모두 얹혀 있습니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;

    printf("x  = %d\\n", x);
    printf("&x = %p\\n", (void *)&x);
    printf("p  = %p\\n", (void *)p);
    return 0;
}
`,
      language: 'c',
    },
    {
      title: '역참조 `*p` — 주소를 따라 값에 닿기',
      body: [
        '포인터 앞에 `*`를 붙이면 "그 주소가 가리키는 값"에 접근합니다. 이를 **역참조(dereference)** 라 합니다.',
        '`*p`는 단순히 값을 읽는 데서 끝나지 않습니다. `*p = 100;`처럼 좌변에 두면 가리키는 변수의 값을 직접 바꿉니다. 이것이 포인터의 진짜 힘입니다.',
        '이름표(`x`)를 통하지 않고도, 주소만 알고 있으면 그 칸의 값을 읽고 쓸 수 있습니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;

    printf("*p = %d (변경 전)\\n", *p);
    *p = 100;
    printf("x  = %d (변경 후)\\n", x);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '*p = 42 (변경 전)\nx  = 100 (변경 후)\n',
      memoryTrace: {
        scenario: 'p가 x를 가리키고 *p로 값을 바꾸기',
        snapshots: [
          {
            line: 4,
            caption: '`int x = 42;` — x 칸이 생기고 42가 들어갑니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '42', address: '0x7ffd0040' },
                ],
              },
            ],
          },
          {
            line: 5,
            caption:
              '`int *p = &x;` — p 칸이 생기고, 그 안에 x의 주소(0x7ffd0040)가 들어갑니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '42', address: '0x7ffd0040' },
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x7ffd0040',
                    address: '0x7ffd0048',
                    note: '→ x를 가리킴',
                  },
                ],
              },
            ],
          },
          {
            line: 7,
            caption: '`printf("*p = %d", *p)` — p가 가리키는 칸의 값(42)을 읽습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '42', address: '0x7ffd0040' },
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x7ffd0040',
                    address: '0x7ffd0048',
                    note: '→ x',
                  },
                ],
              },
            ],
          },
          {
            line: 8,
            caption:
              '`*p = 100;` — p가 가리키는 칸(=x)의 값을 100으로 바꿉니다. p 자체는 그대로.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '100', address: '0x7ffd0040' },
                  {
                    name: 'p',
                    type: 'int *',
                    value: '0x7ffd0040',
                    address: '0x7ffd0048',
                    note: '→ x',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '함수에 포인터를 넘기면 원본이 바뀐다',
      body: [
        '앞 단원에서 본 "값 복사"의 한계를 포인터로 넘는 순간입니다. 변수의 주소를 함수에 전달하면, 함수는 그 주소를 통해 원본을 직접 수정할 수 있습니다.',
        '대표 예가 두 변수의 값을 맞바꾸는 `swap`입니다. 매개변수를 그냥 받으면 절대 못 하는 일이지만, 포인터로 받으면 한 줄짜리 코드로 가능합니다.',
      ],
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 1;
    int y = 9;
    swap(&x, &y);
    printf("x = %d, y = %d\\n", x, y);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'x = 9, y = 1\n',
      memoryTrace: {
        scenario: 'swap 호출 시 스택 프레임 변화',
        snapshots: [
          {
            line: 11,
            caption: 'main 진입 — x=1, y=9가 main 프레임에 자리 잡습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '1', address: '0x7ffd0040' },
                  { name: 'y', type: 'int', value: '9', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 12,
            caption:
              '`swap(&x, &y)` 호출 — swap 프레임이 main 위에 쌓이고, a/b는 각각 x/y의 주소를 받습니다.',
            frames: [
              {
                name: 'swap',
                vars: [
                  {
                    name: 'a',
                    type: 'int *',
                    value: '0x7ffd0040',
                    address: '0x7ffd0020',
                    note: '→ main의 x',
                  },
                  {
                    name: 'b',
                    type: 'int *',
                    value: '0x7ffd0044',
                    address: '0x7ffd0028',
                    note: '→ main의 y',
                  },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '1', address: '0x7ffd0040' },
                  { name: 'y', type: 'int', value: '9', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 4,
            caption: '`int tmp = *a;` — a가 가리키는 값(1)을 tmp에 복사.',
            frames: [
              {
                name: 'swap',
                vars: [
                  { name: 'a', type: 'int *', value: '0x7ffd0040', address: '0x7ffd0020' },
                  { name: 'b', type: 'int *', value: '0x7ffd0044', address: '0x7ffd0028' },
                  { name: 'tmp', type: 'int', value: '1', address: '0x7ffd0030' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '1', address: '0x7ffd0040' },
                  { name: 'y', type: 'int', value: '9', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 5,
            caption: '`*a = *b;` — main의 x가 9로 바뀝니다 (포인터를 통해 원본 변경).',
            frames: [
              {
                name: 'swap',
                vars: [
                  { name: 'a', type: 'int *', value: '0x7ffd0040', address: '0x7ffd0020' },
                  { name: 'b', type: 'int *', value: '0x7ffd0044', address: '0x7ffd0028' },
                  { name: 'tmp', type: 'int', value: '1', address: '0x7ffd0030' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '9', address: '0x7ffd0040' },
                  { name: 'y', type: 'int', value: '9', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 6,
            caption: '`*b = tmp;` — main의 y가 1로 바뀝니다.',
            frames: [
              {
                name: 'swap',
                vars: [
                  { name: 'a', type: 'int *', value: '0x7ffd0040', address: '0x7ffd0020' },
                  { name: 'b', type: 'int *', value: '0x7ffd0044', address: '0x7ffd0028' },
                  { name: 'tmp', type: 'int', value: '1', address: '0x7ffd0030' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '9', address: '0x7ffd0040' },
                  { name: 'y', type: 'int', value: '1', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 13,
            caption: 'swap 반환 — swap 프레임이 사라지고 main만 남습니다. x와 y가 교환됨.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'x', type: 'int', value: '9', address: '0x7ffd0040' },
                  { name: 'y', type: 'int', value: '1', address: '0x7ffd0044' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: 'NULL과 잘못된 포인터',
      body: [
        '포인터가 "아무것도 가리키지 않는다"는 상태를 표현할 때 `NULL`을 씁니다. `int *p = NULL;`처럼 초기화해두면, 나중에 "아직 가리킬 데 없음"을 분명히 표시할 수 있습니다.',
        '`NULL`을 역참조하면 프로그램이 비정상 종료됩니다(세그멘테이션 폴트). 그래서 역참조 전에 `if (p != NULL)`로 검사하는 패턴이 흔합니다.',
        '초기화하지 않은 포인터는 어디를 가리킬지 모르는 더 위험한 상태입니다. 포인터를 만들면 즉시 `NULL` 또는 유효한 주소로 초기화하는 습관을 들이세요.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int *p = NULL;

    if (p != NULL) {
        printf("p가 가리키는 값: %d\\n", *p);
    } else {
        printf("p는 아직 아무것도 가리키지 않습니다\\n");
    }
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'p는 아직 아무것도 가리키지 않습니다\n',
    },
  ],
};
