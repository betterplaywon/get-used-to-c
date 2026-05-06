import type { Tutorial } from '../types';

export const VARIABLES_TUTORIAL: Tutorial = {
  slug: 'variables',
  title: '변수와 자료형',
  summary: '값을 담는 칸을 만들고, 그 칸의 크기와 종류를 정하는 법을 익힙니다.',
  steps: [
    {
      title: '변수는 메모리 위에 만든 "이름표 붙은 칸"이다',
      body: [
        'C에서 변수를 선언하면, 컴파일러는 메모리에서 그 자료형 크기만큼의 공간을 잡아두고 거기에 이름을 붙여줍니다. `int x = 42;`는 정수 한 칸을 마련하고, 그 칸에 42를 적은 뒤 `x`라는 이름표를 붙이는 일입니다.',
        '이름은 우리가 부르려는 편의일 뿐이고, 컴퓨터에게 중요한 건 "어디(주소)에 몇 바이트짜리 칸이 있는가"입니다. 이 사실은 포인터 단원에서 다시 만나게 됩니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int x = 42;
    printf("x = %d\\n", x);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'x = 42\n',
    },
    {
      title: '기본 자료형 — 칸의 크기와 종류',
      body: [
        'C는 칸의 크기와 해석 방법을 자료형으로 구분합니다. 자주 쓰이는 것은 다음과 같습니다.',
        '- `int`: 정수, 보통 4바이트',
        '- `char`: 1바이트, 문자 한 글자나 작은 정수',
        '- `double`: 8바이트, 실수',
        '`sizeof` 연산자로 자료형이 차지하는 바이트 수를 직접 확인할 수 있습니다. 환경마다 결과가 다를 수 있다는 점도 같이 기억해 두세요.',
      ],
      code: `#include <stdio.h>

int main(void) {
    printf("int    = %zu bytes\\n", sizeof(int));
    printf("char   = %zu bytes\\n", sizeof(char));
    printf("double = %zu bytes\\n", sizeof(double));
    return 0;
}
`,
      language: 'c',
    },
    {
      title: '선언, 초기화, 대입',
      body: [
        '`int x;`은 칸만 만들고 값은 정하지 않는 **선언**입니다. 초기화하지 않은 지역 변수의 값은 정해져 있지 않으니, 항상 초기화하는 습관을 들이는 것이 안전합니다.',
        '`int y = 10;`은 칸을 만들면서 동시에 값을 적는 **선언+초기화**입니다.',
        '`y = 20;`은 이미 만들어진 칸의 값을 바꾸는 **대입**입니다. 같은 `=` 기호지만 의미가 다르다는 점에 주의하세요.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int y = 10;
    printf("처음 y = %d\\n", y);

    y = 20;
    printf("바꾼 y = %d\\n", y);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '처음 y = 10\n바꾼 y = 20\n',
    },
    {
      title: '직접 고쳐보기',
      body: [
        '아래 코드의 `score`와 `grade`를 자유롭게 바꿔서 실행해 보세요.',
        '`char`는 1바이트지만 `\'A\'`, `\'B\'` 같은 문자 리터럴을 담을 수 있다는 점, 그리고 `printf`의 형식 지정자(`%d`, `%c`)를 자료형에 맞게 골라야 한다는 점을 확인해 보세요.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int score = 87;
    char grade = 'B';

    printf("점수: %d, 학점: %c\\n", score, grade);
    return 0;
}
`,
      language: 'c',
    },
  ],
};
