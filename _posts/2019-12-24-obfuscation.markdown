---
layout: post
title:  "Obfuscation!!"
date:   2019-12-24 11:07:45 +0800
categories: Obfuscation
---

# <i class="fa fa-book fa-fw"></i>簡易抗反編譯( I ) - Obfuscation

##  0. 前言

<img class="imgs" src="{{ site.utl }}/assets/img/Obfuscation.png">

> 讓你看不懂！！
{:.bq}
+ **Obfuscation 程式碼混淆**

  簡單來說，將被編譯過得程式，逆向編譯回原始碼。  
  這讓我們在沒有原始碼的情況下可以重新獲得資訊。
  {:.text-light-gray}

  這樣很好不是嗎？

  是的，如果是在特殊狀況(比如：資料誤刪或是研究用途)下，這是一個很方便的手段.  
  但如果換個角度想，反編譯也可被攻擊者利用，竄改與抄襲。
  {:.text-light-gray}

## 1. 人工 Obfuscation

