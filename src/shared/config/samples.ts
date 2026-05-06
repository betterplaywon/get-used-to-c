export const SAMPLE_C_HELLO = `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}
`;

export const SAMPLE_C_POINTER = `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;

    printf("x = %d\\n", x);
    printf("&x = %p\\n", (void *)&x);
    printf("p  = %p\\n", (void *)p);
    printf("*p = %d\\n", *p);
    return 0;
}
`;
