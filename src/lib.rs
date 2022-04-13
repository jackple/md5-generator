extern crate wasm_bindgen;

use md5::{Digest, Md5};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn md5(data: Vec<u8>) -> String {
    let mut hasher = Md5::new();
    hasher.update(data);
    let result: String = format!("{:X}", hasher.finalize());

    return result.to_lowercase();
}
