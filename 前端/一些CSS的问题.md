# CSS相关

## 单行、多行打点

```css
.single-line-dot {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.multi-line-dot {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```

## 实现高度为宽度的一半

```html
<div class="a">
    <div class="b"></div>
</div>
```

```css
div.a {
    width: 200px;
}
div.b {
    padding: 25% 0;
    background: green;
}
```
