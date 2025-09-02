// Macroquad plugin for tracing-wasm
// This replaces the wasm-bindgen functionality with direct JS/WASM FFI

let wasm_memory = null;
let wasm_exports = null;

function getString(ptr, len) {
    if (!wasm_memory) {
        console.warn('tracing_wasm: WASM memory not initialized yet');
        return '';
    }
    const bytes = new Uint8Array(wasm_memory.buffer, ptr, len);
    return new TextDecoder().decode(bytes);
}

function register_plugin(importObject) {
    importObject.env = importObject.env || {};
    
    // Performance API functions
    importObject.env.performance_mark = function(name_ptr, name_len) {
        const name = getString(name_ptr, name_len);
        performance.mark(name);
    };
    
    importObject.env.performance_measure = function(name_ptr, name_len, start_mark_ptr, start_mark_len) {
        try {
            const name = getString(name_ptr, name_len);
            const startMark = getString(start_mark_ptr, start_mark_len);
            performance.measure(name, startMark);
            return 0; // success
        } catch (e) {
            console.error('Performance measure failed:', e);
            return 1; // error
        }
    };
    
    // Console API functions
    importObject.env.console_log1 = function(message_ptr, message_len) {
        const message = getString(message_ptr, message_len);
        console.log(message);
    };
    
    importObject.env.console_log4 = function(
        message1_ptr, message1_len,
        message2_ptr, message2_len,
        message3_ptr, message3_len,
        message4_ptr, message4_len
    ) {
        const message1 = getString(message1_ptr, message1_len);
        const message2 = getString(message2_ptr, message2_len);
        const message3 = getString(message3_ptr, message3_len);
        const message4 = getString(message4_ptr, message4_len);
        console.log(message1, message2, message3, message4);
    };
}

function set_wasm_refs(exports, memory) {
    wasm_exports = exports;
    wasm_memory = memory;
}

// Export for use with miniquad
if (typeof miniquad_add_plugin !== 'undefined') {
    miniquad_add_plugin({
        register_plugin,
        set_wasm_refs,
        name: "tracing_wasm"
    });
}