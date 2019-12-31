#include<stdio.h>
void _(int in, int start, int stop) {
    printf("%d ", *((int*)in + start));
    start++;
    if (start < stop)   _(in, start, stop);
}

int main() {
    int arr[] = { 0,1,2,3,4,5 };
    _((int)arr, 0, 6);
}