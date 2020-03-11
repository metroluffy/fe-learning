### 单行、多行打点
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