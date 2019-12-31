#include<stdio.h>
void _(int in) {
    for (int i=0; i < 9; i++) printf("%c", *((int*)in + i));
}
int main() {
    int arr[] = {83, 117, 114, 112, 114, 105, 115, 101, 33};
    _((int)arr);
}