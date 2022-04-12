---
title: EqRatioImg 等比缩放图片
nav:
  title: Pocket 组件
  path: /component
group:
  title: 基础组件
  path: /base
---

# EqRatioImg 等比缩放图片

等比缩放图片，在基础图片组件的基础上，增加了等比缩放和拉伸切换的能力。

你可以使用该组件在绝大多数场景下替换基础图片组件。

该组件增加了一个 `mode` 配置，允许你配置组件的拉伸模式。具体情况下面示例

## 示例

### 基础用法

<code src="./demo/Demo1.tsx" ></code>

## API

| 属性       | 说明                                                                                                                                                                                                                                                                                  | 类型                                             | 默认值     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- |
| src        | 与`img`的事件相同                                                                                                                                                                                                                                                                     | `string`                                         | -          |
| onLoad     | 与`img`的事件相同                                                                                                                                                                                                                                                                     | `function`                                       | -          |
| onError    | 与`img`的事件相同                                                                                                                                                                                                                                                                     | `function`                                       | -          |
| imgRef     | 用于传递到组件中`img`元素的`ref`                                                                                                                                                                                                                                                      | `RefObject`                                      | -          |
| stretch    | 是否设置图片大小为容器尺寸？设置为`true`时，需要为组件显示地设置宽高。设置为`false`时，则和普通`img`的特性一致                                                                                                                                                                        | `boolean`                                        | `true`     |
| loadingSrc | 图片加载过程中的占位图/占位组件                                                                                                                                                                                                                                                       | `ReactElement` / `string`                        | -          |
| errSrc     | 图片加载失败的占位图/占位组件                                                                                                                                                                                                                                                         | `ReactElement` / `string`                        | -          |
| mode       | 缩放模式 <br/> `'normal'`: 普通缩放模式，图片会尽可能沾满宽度 <br/> `'scale'`: 拉伸模式，图片会变形填充满容器 <br/> `'cover'`: 覆盖模式，图片会等比缩放，覆盖满整个容器（可能会出现图片超界） <br/> `'contain'`: 包含模式，图片会等比缩放，但确保全部在容器内显示（可能无法铺满容器） | `'normal'` / `'scale'` / `'cover'` / `'contain'` | `'normal'` |