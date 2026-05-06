import type { Tutorial } from '../types';

export const OPERATORS_TUTORIAL: Tutorial = {
  slug: 'operators',
  title: '연산자와 표현식',
  summary: '값을 계산하고, 비교하고, 조합하는 도구들을 익힙니다.',
  steps: [
    {
      title: '산술 연산자',
      body: [
        '`+`, `-`, `*`, `/`, `%` 다섯 가지가 기본입니다. `/`와 `%`만 두 가지 함정이 있습니다.',
        '첫째, `int / int`는 **정수 나눗셈**이라 소수점 이하가 잘립니다. `7 / 2`는 `3.5`가 아니라 `3`입니다.',
        '둘째, `%`는 정수에서만 동작하는 나머지 연산자입니다. 실수에는 쓸 수 없습니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    printf("7 / 2 = %d\\n", 7 / 2);
    printf("7 %% 2 = %d\\n", 7 % 2);
    printf("7.0 / 2.0 = %f\\n", 7.0 / 2.0);
    return 0;
}
`,
      language: 'c',
      expectedStdout: '7 / 2 = 3\n7 % 2 = 1\n7.0 / 2.0 = 3.500000\n',
    },
    {
      title: '비교 연산자와 진릿값',
      body: [
        '`==`, `!=`, `<`, `<=`, `>`, `>=`로 두 값을 비교할 수 있고, 결과는 1(참) 또는 0(거짓)입니다.',
        'C에는 전용 `bool` 타입이 오랫동안 없었습니다. `<stdbool.h>`를 포함하면 `bool`을 쓸 수 있지만, 정수 0/1로도 자유롭게 동작합니다.',
        '대입(`=`)과 비교(`==`)를 헷갈리는 것은 C의 대표적인 버그 원인입니다. `if (x = 1)`은 항상 참이 됩니다(대입의 결과가 1이므로).',
      ],
      code: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = 7;

    printf("a == b ? %d\\n", a == b);
    printf("a <  b ? %d\\n", a < b);
    printf("a != b ? %d\\n", a != b);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'a == b ? 0\na <  b ? 1\na != b ? 1\n',
    },
    {
      title: '논리 연산자와 단축 평가',
      body: [
        '`&&`(그리고), `||`(또는), `!`(아니다) 세 가지입니다. 모두 0/1로 결과가 나옵니다.',
        '중요한 성질은 **단축 평가**입니다. `A && B`에서 `A`가 거짓이면 `B`는 평가되지 않습니다. `A || B`에서 `A`가 참이면 `B`는 평가되지 않습니다.',
        '이 성질은 단순한 최적화가 아니라, 안전한 코드를 쓰는 도구입니다. 예: `p != NULL && *p == 0`처럼 포인터를 검사하고 나서야 역참조하도록 안전하게 묶을 수 있습니다.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int x = 4;
    int y = 0;

    if (y != 0 && x / y > 1) {
        printf("나눗셈 결과가 1보다 큽니다\\n");
    } else {
        printf("y가 0이라 나눗셈을 건너뜁니다\\n");
    }
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'y가 0이라 나눗셈을 건너뜁니다\n',
    },
    {
      title: '복합 대입과 증감',
      body: [
        '`x += 3`은 `x = x + 3`의 줄임이고, `-=`, `*=`, `/=`, `%=`도 같은 방식입니다.',
        '`++x`(전위)와 `x++`(후위)는 `x`를 1 늘린다는 점은 같지만, 표현식의 결과가 다릅니다. 전위는 "늘린 뒤 값", 후위는 "늘리기 전 값"입니다.',
        '한 줄에 같은 변수에 부수효과를 두 번 거는 코드(`a = a++ + ++a;`)는 결과가 정의되지 않습니다. 의도가 모호한 코드는 피하세요.',
      ],
      code: `#include <stdio.h>

int main(void) {
    int x = 10;
    printf("x++ = %d\\n", x++);
    printf("x   = %d\\n", x);
    printf("++x = %d\\n", ++x);
    printf("x   = %d\\n", x);
    return 0;
}
`,
      language: 'c',
      expectedStdout: 'x++ = 10\nx   = 11\n++x = 12\nx   = 12\n',
    },
  ],
};
