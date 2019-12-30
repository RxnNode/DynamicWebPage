---
layout: post
title:  "Obfuscation!!"
date:   2019-12-24 11:07:45 +0800
categories: Obfuscation
---

# <i class="fa fa-book fa-fw"></i>簡易抗反編譯( I ) - Obfuscation

##  0. 前言


> 讓你看不懂！！ 
{:.bq}
+ **什麼是Obfuscation 程式碼混淆?**

    <img class="imgs" src="{{ site.baseurl  }}assets/img/Obfuscation.png">  

    將程式碼經過 **`混淆`** 的用意是讓讀者難以理解原始碼邏輯，模糊所有保留字，甚至無法認別。  
    這麼做當然是有他的用意的:  
        不易閱讀 => 不易逆向工程 => 降低逆向意願 + 提升成本 => 提升程式安全性 
    {:.text-light-gray}

    <div class="alert alert-danger" role="alert">
        Alert!! 這樣的行為可是完全違背了clean code的目標!!
    </div>
> 以下將簡單表示如何手改code混淆!!!

## 1. 人工 Obfuscation



+ **Are you l33t? 火星文**   

    >(4^/ &nbsp; ¥0u &nbsp; u^/|)3|?574^/|) &nbsp; AA3 &nbsp; n00b?  
    {:.bq}
      

    要讓人讀的痛到骨裡，最直接了當的方式就是 **`1337`**。  
    宣告命名時，除了C中的特殊保留字，我們可以利用52個英文字母 + 10個數字再加一個底線符號(_)，
    這一共63個符號組成不以數字開頭的名字，比如說:
    {:.text-light-gray}
    ```c
   #include<stdio.h>
    void _(int l, int _1, int i){
        for (; l < _1; ++l) printf("%d ", i);
        i++;
    }
    int main() {
        _('1', 'l', 1);
        return 0;
    }
    ```
    ```c
    Output: 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    ```
    
    把 `1 `, `l` , `_` 混入code裡，讓程式不易讀。  
    同樣方法還有 `0` 故意 `O` 互換: 
    {:.text-light-gray}
    ```js
    Ox12 != 0x12
    ```
    [Leet Wiki](https://en.wikipedia.org/wiki/Leet) &nbsp;
    [Leet 常見對照表](https://simple.wikipedia.org/wiki/Leet)

+ **Pointer Obfuscation(指標混淆): <strike>~4334¥~</strike>{:.text-light-gray} Array and Index**   

    C語言中，array是以pointer(指標)運作的，所以利用pointer運算機制開始混淆!
    {:.text-light-gray}
    ```c
    int arr[] = {0,1,2,3,4}; //宣告arr array
    int index;              //宣告index interger
    arr;                    // arr的address
    arr + index;            // pointer算法: return 第 index 個 arr 中的元素的address
    *(arr + index);         // pointer算法: return 第 index 個 arr 中的元素
    
    arr[index]; == *(arr + index); == *(index + arr); == index[arr];
    //所以'[]'其實可以不用寫!
    ```
    Pointer Array 混淆範例:
    {:.text-light-gray}

    ```c
    #include<stdio.h>
    void _(int in) {
        for (int i=0; i < 9; i++) printf("%c", *((int*)in + i));
    }
    int main() {
        int arr[] = {83, 117, 114, 112, 114, 105, 115, 101, 33};
        _((int)arr);
    }
    ```
    ```c
    Output:
    Surprise!
    ```
+ **Operator Obfuscation(運算子混淆): ^ ?**
    + **`^`** XOR 位元運算子混淆  

        首先來了解XOR的運算邏輯:  
        {:.text-light-gray}  
        ```c
        XOR運算        結果
        0 XOR 0         0
        0 XOR 1         1
        1 XOR 0         1
        1 XOR 1         0
        ```
        發現其實 **`XOR`** 的運算其實就是判斷式中的 **`!=`** !
        {:.text-light-gray}  
        XOR 位元運算子混淆範例:
        {:.text-light-gray}
        Before
        ```c
        #include<stdio.h>
        int main(){
            int a = 0, b = 1;
            if(a != b) printf("Different!");
        }
        ```
        ```c
        Output:
        Different!
        ```
        After
        ```c
        #include<stdio.h>
        int main() {
            int a = 0, b = 1;
            (a ^ b)&&printf("Different!");
        }
        ```
        ```c
        Output:
        Different!
        ```
     + **`?`** 條件運算子混淆    

        **?** 條件運算子提供了一個精簡快速的方法來撰寫if條件式，用來取代if-else。  
        首先來了解 **?** 的使用方式:  
        {:.text-light-gray}

        ```c
        int a = 0, b = 1;
        if (a != b) printf("Different!"); else printf("Same!");
        //上下兩具意思一樣喔!!         
        (a != b) ? printf("Different!") : printf("Same!");
        //[條件] ? [true] : [false]
        ```
        ? 條件運算子混淆範例:
        {:.text-light-gray}
        Before
        ```c
        #include<stdio.h>
        int main(){
            int a = 0, b = 1, c = 2;
            if(a < b){
              b+=1;
              a=b+1;  
            } else {
                c+=b;
            }
            printf("%d %d %d",a,b,c);
        }
        ```
        ```c
        Output:
        3 2 2
        ```
        After
        ```c
        #include<stdio.h>
        int main() {
            int a,b,c;
            a = (a = 0, b = 1, c = 2, a < b) ? (b += 1, b + 1) : (c += b);
            printf("%d %d %d", a, b, c);
        }
        ```
        ```c
        Output:
        3 2 2
        ```
+ **Recursion Obfuscation(遞迴混淆)**

    用recursion取代for。    
    混淆範例:
    {:.text-light-gray}
    Before
    ```c
    #include<stdio.h>
    int main(){
        int arr[] = { 0,1,2,3,4,5};
        for(int i = 0; i < 6; i++) printf("%d ",arr[i]);
    }
    ```
    ```c
    Output:
    0 1 2 3 4 5 
    ```
    After
    ```c
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
    ```
    ```c
    Output:
    0 1 2 3 4 5 
    ```


## 2. 綜合大混淆
0. 程式範例 Hello World!
    ```c
    #include<stdio.h>
    int main(){
        printf("Hello World!");
    }
    ```
1. "Hello World!" 轉 int array  
    ```c
    #include<stdio.h>
    int main(){
        int arr[] = {72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33}
        //printf("Hello World!");
    }
    ```
    [ASCII 轉換網站](https://www.rapidtables.com/convert/number/ascii-hex-bin-dec-converter.html)
2. 遞迴輸出array
    ```c
    #include<stdio.h>
    void pf(int in, int start, int stop) {
        printf("%c", *((int*)in + start));
        start++;
        if (start < stop)   pf(in, start, stop);
    }
    int main() {
        int arr[] = { 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33 };
        pf((int)arr, 0, 12);
    }
    ```
3. 運算子混淆
    ```c
    #include<stdio.h>
    void pf(int in, int start, int stop) {
        (start < stop) ? (printf("%c", *((int*)in + start)), start++, pf(in, start, stop)) : 0;
    }
    int main() {
        int arr[] = { 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33 };
        pf((int)arr, 0, 12);
    }
    ```
4. 到目前為止，已經很不易看出source code，但是如果分析者對ASCII很熟的話，arr字串一定會漏餡  
    我們可以:
    + 加密字串(凱薩)
    + 減少重複字

5. 凱撒加密，全部加2
     ```c
    #include<stdio.h>
    void pf(int in, int start, int stop) {
        (start < stop) ? (printf("%c", (*((int*)in + start)) - 2), start++, pf(in, start, stop)) : 0;
    }
    int main() {
        int arr[] = { 74, 103, 110, 110, 113, 34, 89, 113, 116, 110, 102, 35 };
        pf((int)arr, 0, 12);
    }
    ```
6. 竄改重複字(110)，藏到運算子中修正回(108)
    ```c
    #include<stdio.h>
    void pf(int in, int start, int stop) {
        (start < stop) ? 
            ((start == 2)|| (start == 3) || (start == 9)) ? printf("%c",108),start++, pf(in, start, stop) : (printf("%c", (*((int*)in + start)) - 2), start++, pf(in, start, stop))
            : 0;
    }
    int main() {
        int arr[] = { 74, 103, 2, 130, 113, 34, 89, 113, 116, 120, 102, 35 };
        pf((int)arr, 0, 12);
    }
    ```
7. 合併108判斷式
    ```c
    #include<stdio.h>
    void pf(int in, int start, int stop) {
        (start < stop) ? printf("%c", ((start == 2) || (start == 3) || (start == 9)) ? 108 : (*((int*)in + start)) - 2), start++, pf(in, start, stop) : 0;
    }
    int main() {
        int arr[] = { 74, 103, 2, 130, 113, 34, 89, 113, 116, 120, 102, 35 };
        pf((int)arr, 0, 12);
    }
    ```
8. 變數火星文混淆
    ```c
    #include<stdio.h>
    void pf(int l1, int _i, int ___) {
        (_i < ___) ? printf("%c", ((_i == 2) || (_i == 3) || (_i == 9)) ? 108 : (*((int*)l1 + _i)) - 2), _i++, pf(l1, _i, ___) : 0;
    }
    int main() {
        int arr[] = { 74, 103, 2, 130, 113, 34, 89, 113, 116, 120, 102, 35 };
        pf((int)arr, 0, 12);
    }
    ```
9. function名混淆，刪除資料型態
    ```c
    #include<stdio.h>
    __l_(l1,_i,___) {
        (_i < ___) ? printf("%c", ((_i == 2) || (_i == 3) || (_i == 9)) ? 108 : (*((int*)l1 + _i)) - 2), _i++, __l_(l1, _i, ___) : 0;
    }
    main() {
        int arr[] = { 74, 103, 2, 130, 113, 34, 89, 113, 116, 120, 102, 35 };
        __l_((int)arr, 0, 12);
    }
    ```
10. ASCII 進制混淆
    ```c
    #include<stdio.h>
    __l_(l1,_i,___) {
        (_i < ___) ? printf("%c", ((_i == 2) || (_i == 3) || (_i == 9)) ? 108 : (*((int*)l1 + _i)) - 2), _i++, __l_(l1, _i, ___) : 0;
    }
    main() {
        int _0[] = { 74, 103, 2, 0x82, 0b01110001, 34, 0x59, 0x71, 0x74, 120, 0b01100110, 0x23 };
        __l_((int)_0, 0, 12);
    }
    ```
11. 不縮排
    ```c
    #include<stdio.h>
    __l_(l1,_i,___){(_i<___)?printf("%c",((_i==2)||(_i==3)||(_i==9))
    ?108:(*((int*)l1+_i))-2),_i++,__l_(l1,_i,___):0;}main(){int _0[]={74,103,2,0x82,
    0b01110001,34,0x59,0x71,0x74,120,0b01100110,0x23};__l_((int)_0,0
    ,12);}
    ```
    DONE!!

