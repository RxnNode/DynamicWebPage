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

    <img class="imgs" src="{{ site.utl }}/assets/img/Obfuscation.png">  

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
    #include "stdio.h"
    void_(int l, int _1, int 1){
        for(;l<_1;++l) printf("%d\n",1);
        1++;
    }
    int main(){
        _('1','l',12);
        retuen 0;
    }
    ```
    
    把 `1 `, `l` , `_` 混入code裡，讓程式不易讀。  
    同樣方法還有 `0` 故意 `O` 互換: 
    {:.text-light-gray}
    ```js
    Ox12 != 0x12
    ```
    [Leet Wiki](https://en.wikipedia.org/wiki/Leet) &nbsp;
    [Leet 常見對照表](https://simple.wikipedia.org/wiki/Leet)

+ **Pointer Obfuscation: <strike>~4334¥~</strike>{:.text-light-gray} Array and Indexe** 
    
    ```c
    int arr[] = {0,1,2,3,4}; //宣告arr array
    int index;              //宣告index
    arr;                    // arr的address
    arr + index;            // pointer算法: return 第 index 個 arr 中的元素
    *(arr + index);         // pointer算法: 消除第 index 個 arr 中的元素的address
    
    arr[index]; == *(arr + index); == *(index + arr); == index[arr];
    //所以'[]'其實可以不用寫!
    ```