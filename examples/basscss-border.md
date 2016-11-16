# Basscss

This example is based on the [`border` module from basscss][origin].

[origin]: https://github.com/basscss/basscss/tree/master/modules/border


## Borders

Add borders with these border utilities.

```html
<div class="p1 m1 border">.border</div>
<div class="p1 m1 border-top">.border-top</div>
<div class="p1 m1 border-right">.border-right</div>
<div class="p1 m1 border-bottom">.border-bottom</div>
<div class="p1 m1 border-left">.border-left</div>
```

```css
.border {
  border-style: solid;
  border-width: var(--border-width);
}

.border-top {
  border-top-style: solid;
  border-top-width: var(--border-width);
}

.border-right {
  border-right-style: solid;
  border-right-width: var(--border-width);
}

.border-bottom {
  border-bottom-style: solid;
  border-bottom-width: var(--border-width);
}

.border-left {
  border-left-style: solid;
  border-left-width: var(--border-width);
}
```

Remove borders with the `.border-none` utility.

```html
<input type="text" class="border-none" placeholder=".border-none" />
```

```css
.border-none { border: 0 }
```


## Border Radii

Utility styles for border radii can be used to style images and other elements.

```html
<img class="rounded" src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="64" height="64" />
<img class="circle" src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="64" height="64" />
<img class="rounded-top" src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="64" height="64" />
<img class="rounded-right" src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="64" height="64" />
<img class="rounded-bottom" src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="64" height="64" />
<img class="rounded-left" src="http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg" width="64" height="64" />
```

```css
.rounded { border-radius: var(--border-radius) }
.circle  { border-radius: 50% }

.rounded-top    { border-radius: var(--border-radius) var(--border-radius) 0 0 }
.rounded-right  { border-radius: 0 var(--border-radius) var(--border-radius) 0 }
.rounded-bottom { border-radius: 0 0 var(--border-radius) var(--border-radius) }
.rounded-left   { border-radius: var(--border-radius) 0 0 var(--border-radius) }
```

The `.not-rounded` utility can be used to override default radii.
This is useful for things like input and button groups.

```html
<button class="btn not-rounded">Not Rounded</button>
```

```css
.not-rounded { border-radius: 0 }
```


## Border Variables

The `--border-width` & `--border-radius` CSS variables control the width &
radii of all borders.

```css
:root {
  --border-width: 1px;
  --border-radius: 3px;
}
```
