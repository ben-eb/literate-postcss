# Jumbotron

This example is based on the [`Jumbotron` component from Bootstrap][origin].

[origin]: https://github.com/twbs/bootstrap/blob/v4-dev/docs/components/jumbotron.md


## Usage

A lightweight, flexible component that can optionally extend the entire
viewport to showcase key marketing messages on your site.

```html
<div class="jumbotron">
  <h1 class="display-3">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr class="my-2">
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </p>
</div>
```

To make the jumbotron full width, and without rounded corners, add the
`.jumbotron-fluid` modifier class and add a `.container`
or `.container-fluid` within.

```html
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-3">Fluid jumbotron</h1>
    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
  </div>
</div>
```


## Code

```css
.jumbotron {
  padding: $jumbotron-padding ($jumbotron-padding / 2);
  margin-bottom: $jumbotron-padding;
  background-color: $jumbotron-bg;
  @include border-radius($border-radius-lg);

  @include media-breakpoint-up(sm) {
    padding: ($jumbotron-padding * 2) $jumbotron-padding;
  }
}

.jumbotron-hr {
  border-top-color: darken($jumbotron-bg, 10%);
}

.jumbotron-fluid {
  padding-right: 0;
  padding-left: 0;
  @include border-radius(0);
}
```
