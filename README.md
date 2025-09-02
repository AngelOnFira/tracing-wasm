# `tracing-wasm`

Leverage performance profiling with your browser tools with the [tracing crate](https://crates.io/crates/tracing).

[![Crates.io][crates-badge]][crates-url]
[![Documentation][docs-badge]][docs-url]
[![MIT licensed][mit-badge]][mit-url]
[![APACHE licensed][apache-2-badge]][apache-2-url]

[crates-badge]: https://img.shields.io/crates/v/tracing-wasm.svg
[crates-url]: https://crates.io/crates/tracing-wasm
[docs-badge]: https://docs.rs/tracing-wasm/badge.svg
[docs-url]: https://docs.rs/tracing-wasm
[mit-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[mit-url]: LICENSE-MIT
[apache-2-badge]: https://img.shields.io/badge/license-APACHE%202.0-blue.svg
[apache-2-url]: LICENSE-APACHE

![Screenshot of performance reported using the `tracing-wasm` Subscriber](./2020-07-10-devtools-demo-screenshot.png)

Note: `tracing_wasm` uses the global JavaScript `console` and `performance` objects. It will not work in environments where one or both of these are not available, such as Node.js or Cloudflare Workers.

## Usage

### With Macroquad

This crate now works with macroquad without requiring wasm-bindgen. To use it:

1. Include the JavaScript plugin in your HTML:
```html
<script src="tracing_wasm_plugin.js"></script>
```

2. Set up tracing in your Rust code:
```rust
fn main() {
    // Set tracing_wasm as the global default subscriber
    tracing_wasm::set_as_global_default();
    
    // Your macroquad app code here
    macroquad::prelude::Window::new("My App", async {
        loop {
            // Your game loop
            macroquad::prelude::next_frame().await;
        }
    });
}
```

### Legacy wasm-bindgen Usage

For projects still using wasm-bindgen, you can use an older version of this crate (v0.2.0 and earlier):

```rust
#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
    tracing_wasm::set_as_global_default();
    Ok(())
}
```
