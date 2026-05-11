import type { Tutorial } from './types';

export const STRUCTS_TUTORIAL: Tutorial = {
  slug: 'structs',
  title: '구조체 — 다른 자료형을 한 묶음으로',
  summary:
    '서로 다른 자료형 여러 개를 하나의 이름으로 묶어 다루는 법, 그리고 그것이 메모리에 어떻게 놓이는지를 익힙니다.',
  steps: [
    {
      title: '`struct` — "관련 있는 칸"을 묶기',
      body: [
        '지금까지 변수는 한 자료형씩만 다뤘고, 배열은 같은 자료형을 여러 개 다뤘습니다. 하지만 현실의 데이터는 보통 여러 자료형이 한 묶음입니다 — 학생 한 명에게는 이름, 점수, 학번이 함께 있습니다.',
        '`struct`는 그 묶음을 새 자료형으로 정의합니다. 정의된 후에는 `int`처럼 변수로 선언해 쓸 수 있습니다.',
        '구조체 변수의 멤버에 접근할 때는 점 연산자 `.`를 씁니다 — `s.score`처럼요.',
      ],
      code: `#include <stdio.h>

struct Student {
    int id;
    int score;
};

int main(void) {
    struct Student s;
    s.id = 1001;
    s.score = 87;

    printf("학번 %d, 점수 %d\\n", s.id, s.score);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '학번 1001, 점수 87\n',
      memoryTrace: {
        scenario: '구조체 변수가 메모리에 한 덩어리로 자리잡는 모습',
        snapshots: [
          {
            line: 9,
            caption:
              '`struct Student s;` — id(4)와 score(4) 두 멤버가 한 덩어리로 main에 자리잡습니다. 두 멤버의 주소는 4바이트 차이로 나란합니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 's.id', type: 'int', value: '?', address: '0x7ffd0040' },
                  { name: 's.score', type: 'int', value: '?', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 11,
            caption: '`s.id = 1001; s.score = 87;` — 같은 칸의 값이 채워집니다. 주소는 그대로.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 's.id', type: 'int', value: '1001', address: '0x7ffd0040' },
                  { name: 's.score', type: 'int', value: '87', address: '0x7ffd0044' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '구조체 초기화와 `typedef`',
      body: [
        '선언과 동시에 멤버를 채울 수 있습니다 — `struct Student s = {1001, 87};` 또는 더 명확하게 `{.id = 1001, .score = 87}` (지정 초기화).',
        '`struct Student`라고 매번 쓰는 게 번거롭다면 `typedef`로 별칭을 만듭니다. `typedef struct { ... } Student;`라고 쓰면 그다음부터는 `Student s;`처럼 깔끔하게 쓸 수 있습니다.',
        'C++에서는 `struct` 키워드를 생략하고도 `Student s;`라고 쓸 수 있어, `typedef`가 따로 필요하지 않습니다.',
      ],
      code: `#include <stdio.h>

typedef struct {
    int id;
    int score;
} Student;

int main(void) {
    Student a = {1001, 87};
    Student b = {.id = 1002, .score = 92};

    printf("a: 학번 %d, 점수 %d\\n", a.id, a.score);
    printf("b: 학번 %d, 점수 %d\\n", b.id, b.score);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'a: 학번 1001, 점수 87\nb: 학번 1002, 점수 92\n',
    },
    {
      title: '구조체 포인터와 `->` 연산자',
      body: [
        '구조체도 변수이므로 주소를 가질 수 있고, 포인터로 가리킬 수 있습니다 — `Student *p = &a;`.',
        '`p`로 멤버에 접근할 때 `(*p).id`라고 써도 되지만, 너무 자주 쓰는 패턴이라 전용 단축 문법 `p->id`가 있습니다. 의미는 똑같습니다.',
        '함수에 구조체를 그대로 넘기면 전체가 복사됩니다(큰 구조체에선 비용 큼). 포인터로 넘기면 주소만 복사되고, 함수 안에서 원본을 직접 수정할 수도 있습니다 — 포인터 단원에서 본 패턴 그대로입니다.',
      ],
      code: `#include <stdio.h>

typedef struct {
    int id;
    int score;
} Student;

void grade_up(Student *p) {
    p->score += 5;
}

int main(void) {
    Student a = {1001, 87};
    grade_up(&a);
    printf("학번 %d, 점수 %d\\n", a.id, a.score);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '학번 1001, 점수 92\n',
      memoryTrace: {
        scenario: '함수에 구조체 포인터를 넘겨 원본을 수정',
        snapshots: [
          {
            line: 13,
            caption: 'main 진입 — Student a가 한 덩어리로 자리잡습니다.',
            frames: [
              {
                name: 'main',
                vars: [
                  { name: 'a.id', type: 'int', value: '1001', address: '0x7ffd0040' },
                  { name: 'a.score', type: 'int', value: '87', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 14,
            caption:
              '`grade_up(&a)` — 새 프레임의 p에는 a의 시작 주소가 들어갑니다. 구조체 전체를 복사하지 않습니다.',
            frames: [
              {
                name: 'grade_up',
                vars: [
                  {
                    name: 'p',
                    type: 'Student *',
                    value: '0x7ffd0040',
                    address: '0x7ffd0020',
                    note: '→ main의 a',
                  },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'a.id', type: 'int', value: '1001', address: '0x7ffd0040' },
                  { name: 'a.score', type: 'int', value: '87', address: '0x7ffd0044' },
                ],
              },
            ],
          },
          {
            line: 9,
            caption:
              '`p->score += 5;` — p가 가리키는 구조체의 score 멤버가 87→92로 바뀝니다. main의 a가 직접 수정됨.',
            frames: [
              {
                name: 'grade_up',
                vars: [
                  { name: 'p', type: 'Student *', value: '0x7ffd0040', address: '0x7ffd0020' },
                ],
              },
              {
                name: 'main',
                vars: [
                  { name: 'a.id', type: 'int', value: '1001', address: '0x7ffd0040' },
                  { name: 'a.score', type: 'int', value: '92', address: '0x7ffd0044' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      title: '직접 만들어보기 — 2D 점',
      body: [
        '2차원 좌표를 표현하는 `Point` 구조체를 정의하고, 두 점의 거리를 출력해 보세요.',
        '거리 공식은 √((x₁-x₂)² + (y₁-y₂)²) 입니다. `<math.h>`의 `sqrt`를 쓰면 됩니다.',
      ],
      code: `#include <stdio.h>
#include <math.h>

typedef struct {
    double x;
    double y;
} Point;

double distance(Point a, Point b) {
    // TODO: a와 b 사이의 거리를 구해 반환하세요
    return 0.0;
}

int main(void) {
    Point p = {0.0, 0.0};
    Point q = {3.0, 4.0};
    printf("거리 = %.1f\\n", distance(p, q));
    return 0;
}
`,
      language: 'c',
      hint: '`double dx = a.x - b.x; double dy = a.y - b.y; return sqrt(dx*dx + dy*dy);`',
    },
  ],
};
