#include<stdio.h>
int main() {
    int a,b,c;
    a = (a = 0, b = 1, c = 2, a < b) ? (b += 1, b + 1) : (c += b);
    printf("%d %d %d", a, b, c);
}