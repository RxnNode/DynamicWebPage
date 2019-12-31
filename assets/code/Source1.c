#include<stdio.h>
void _(int l, int _1, int i) {
	for (; l < _1; ++l) printf("%d ", i);
	i++;
}
int main() {
	_('1', 'l', 1);
	return 0;
}
