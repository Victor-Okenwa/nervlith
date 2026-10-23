use super::Loader;
use ckb_testtool::builtin::ALWAYS_SUCCESS;
use ckb_testtool::ckb_error::Error;
use ckb_testtool::ckb_hash::new_blake2b;
use ckb_testtool::ckb_types::{
    bytes::Bytes,
    core::TransactionBuilder,
    packed::{CellInput, CellOutput, Script},
    prelude::*,
};
use ckb_testtool::context::Context;

const MAX_CYCLES: u64 = 20_000_000;
const CAPACITY: u64 = 1000 * 100_000_000;
const MIN_FEE: u64 = 200 * 100_000_000;

const ENCODING: i8 = 4;
const INVALID_NAME: i8 = 5;
const GATE_FEE_TOO_LOW: i8 = 6;
const INVALID_MODEL: i8 = 7;
const INVALID_PATTERN: i8 = 8;
const INVALID_ART: i8 = 9;
const INVALID_HOLOGRAPHIC: i8 = 10;
const INVALID_TYPE_ID: i8 = 11;

const SIGNAL_HALL: &str = "370000001c0000002b000000330000003400000035000000360000000b0000005369676e616c2048616c6c00c817a80400000000000000";

fn encode(name: &[u8], fee: u64, model: u8, pattern: u8, art: u8, holographic: u8) -> Bytes {
    let fields = [
        mol_bytes(name),
        fee.to_le_bytes().to_vec(),
        vec![model],
        vec![pattern],
        vec![art],
        vec![holographic],
    ];
    mol_table(&fields).into()
}

fn mol_bytes(raw: &[u8]) -> Vec<u8> {
    let mut out = (raw.len() as u32).to_le_bytes().to_vec();
    out.extend_from_slice(raw);
    out
}

fn mol_table(fields: &[Vec<u8>]) -> Vec<u8> {
    let header = 4 + fields.len() * 4;
    let mut cursor = header;
    let mut offsets = Vec::new();
    for field in fields {
        offsets.extend_from_slice(&(cursor as u32).to_le_bytes());
        cursor += field.len();
    }
    let mut out = (cursor as u32).to_le_bytes().to_vec();
    out.extend(offsets);
    for field in fields {
        out.extend_from_slice(field);
    }
    out
}

fn hex(data: &Bytes) -> String {
    data.iter().map(|byte| format!("{byte:02x}")).collect()
}

fn unhex(text: &str) -> Bytes {
    let bytes = (0..text.len())
        .step_by(2)
        .map(|index| u8::from_str_radix(&text[index..index + 2], 16).expect("hex"))
        .collect::<Vec<_>>();
    Bytes::from(bytes)
}

fn type_id(input: &CellInput, index: u64) -> Bytes {
    let mut hasher = new_blake2b();
    hasher.update(input.as_slice());
    hasher.update(&index.to_le_bytes());
    let mut out = [0u8; 32];
    hasher.finalize(&mut out);
    Bytes::from(out.to_vec())
}

fn deploy(context: &mut Context) -> (Script, ckb_testtool::ckb_types::packed::OutPoint) {
    let lock_code = context.deploy_cell(ALWAYS_SUCCESS.clone());
    let lock = context
        .build_script(&lock_code, Bytes::new())
        .expect("always-success lock");
    let code = context.deploy_cell(Loader::default().load_binary("community"));
    (lock, code)
}

fn output(lock: &Script, type_script: Option<Script>) -> CellOutput {
    let builder = CellOutput::new_builder()
        .capacity(CAPACITY)
        .lock(lock.clone());
    match type_script {
        Some(type_script) => builder.type_(Some(type_script).pack()).build(),
        None => builder.build(),
    }
}

fn finish(
    context: &mut Context,
    tx: ckb_testtool::ckb_types::core::TransactionView,
) -> Result<u64, Error> {
    let tx = context.complete_tx(tx);
    context.verify_tx(&tx, MAX_CYCLES)
}

fn assert_code(result: Result<u64, Error>, code: i8) {
    let message = result.expect_err("script should fail").to_string();
    assert!(
        message.contains(&format!("error code {code} on page")),
        "{message}",
    );
}

// Creation: input 0 is a plain capacity cell. Its out point and output index
// 0 are what the type id is hashed from. The community binary is only the type.
fn create(data: Bytes, args: Bytes) -> Result<u64, Error> {
    let mut context = Context::default();
    let (lock, code) = deploy(&mut context);
    let previous = context.create_cell(output(&lock, None), Bytes::new());
    let input = CellInput::new_builder().previous_output(previous).build();
    let type_script = context.build_script(&code, args).expect("community type");
    let tx = TransactionBuilder::default()
        .input(input)
        .output(output(&lock, Some(type_script)))
        .outputs_data(vec![data].pack())
        .build();
    finish(&mut context, tx)
}

fn create_with_id(data: Bytes) -> Result<u64, Error> {
    let mut context = Context::default();
    let (lock, code) = deploy(&mut context);
    let previous = context.create_cell(output(&lock, None), Bytes::new());
    let input = CellInput::new_builder().previous_output(previous).build();
    let type_script = context
        .build_script(&code, type_id(&input, 0))
        .expect("community type");
    let tx = TransactionBuilder::default()
        .input(input)
        .output(output(&lock, Some(type_script)))
        .outputs_data(vec![data].pack())
        .build();
    finish(&mut context, tx)
}

fn update(input_data: Bytes, output_data: Bytes) -> Result<u64, Error> {
    let mut context = Context::default();
    let (lock, code) = deploy(&mut context);
    let args = Bytes::from(vec![7u8; 32]);
    let type_script = context.build_script(&code, args).expect("community type");
    let previous = context.create_cell(output(&lock, Some(type_script.clone())), input_data);
    let input = CellInput::new_builder().previous_output(previous).build();
    let tx = TransactionBuilder::default()
        .input(input)
        .output(output(&lock, Some(type_script)))
        .outputs_data(vec![output_data].pack())
        .build();
    finish(&mut context, tx)
}

#[test]
fn signal_hall_matches_the_wizard_bytes() {
    let data = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    assert_eq!(hex(&data), SIGNAL_HALL);
}

#[test]
fn create_accepts_the_wizard_fixture() {
    let data = unhex(SIGNAL_HALL);
    create_with_id(data).expect("signal hall");
}

#[test]
fn create_accepts_a_32_scalar_name() {
    let name = "社".repeat(32);
    create_with_id(encode(name.as_bytes(), MIN_FEE, 0, 0, 0, 0)).expect("32 scalars");
}

#[test]
fn create_stores_democracy() {
    create_with_id(encode(b"Assembly", MIN_FEE, 1, 3, 1, 1)).expect("democracy");
}

#[test]
fn create_stores_legislative_and_edge_card() {
    create_with_id(encode(b"Council", MIN_FEE, 2, 7, 2, 2)).expect("legislative");
}

#[test]
fn rejects_fee_under_200_ckb() {
    let data = encode(b"Signal Hall", MIN_FEE - 1, 0, 0, 0, 0);
    assert_code(create_with_id(data), GATE_FEE_TOO_LOW);
}

#[test]
fn rejects_empty_name() {
    assert_code(
        create_with_id(encode(b"", MIN_FEE, 0, 0, 0, 0)),
        INVALID_NAME,
    );
}

#[test]
fn rejects_33_scalar_name() {
    let name = "社".repeat(33);
    assert_code(
        create_with_id(encode(name.as_bytes(), MIN_FEE, 0, 0, 0, 0)),
        INVALID_NAME,
    );
}

#[test]
fn rejects_control_character() {
    assert_code(
        create_with_id(encode(b"bad\nname", MIN_FEE, 0, 0, 0, 0)),
        INVALID_NAME,
    );
}

#[test]
fn rejects_invalid_utf8() {
    assert_code(
        create_with_id(encode(&[0xff], MIN_FEE, 0, 0, 0, 0)),
        INVALID_NAME,
    );
}

#[test]
fn rejects_unknown_model() {
    assert_code(
        create_with_id(encode(b"Signal Hall", MIN_FEE, 3, 0, 0, 0)),
        INVALID_MODEL,
    );
}

#[test]
fn rejects_unknown_pattern() {
    assert_code(
        create_with_id(encode(b"Signal Hall", MIN_FEE, 0, 8, 0, 0)),
        INVALID_PATTERN,
    );
}

#[test]
fn rejects_unknown_art() {
    assert_code(
        create_with_id(encode(b"Signal Hall", MIN_FEE, 0, 0, 3, 0)),
        INVALID_ART,
    );
}

#[test]
fn rejects_unknown_holographic() {
    assert_code(
        create_with_id(encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 3)),
        INVALID_HOLOGRAPHIC,
    );
}

#[test]
fn rejects_malformed_data() {
    assert_code(create_with_id(Bytes::from(vec![1, 2, 3, 4])), ENCODING);
}

#[test]
fn rejects_wrong_type_id() {
    let data = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    assert_code(create(data, Bytes::from(vec![0u8; 32])), INVALID_TYPE_ID);
}

#[test]
fn rejects_args_longer_than_32() {
    let mut context = Context::default();
    let (lock, code) = deploy(&mut context);
    let previous = context.create_cell(output(&lock, None), Bytes::new());
    let input = CellInput::new_builder().previous_output(previous).build();
    let mut args = type_id(&input, 0).to_vec();
    args.push(0);
    let type_script = context
        .build_script(&code, Bytes::from(args))
        .expect("community type");
    let data = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    let tx = TransactionBuilder::default()
        .input(input)
        .output(output(&lock, Some(type_script)))
        .outputs_data(vec![data].pack())
        .build();
    assert_code(finish(&mut context, tx), INVALID_TYPE_ID);
}

#[test]
fn rejects_two_community_outputs() {
    let mut context = Context::default();
    let (lock, code) = deploy(&mut context);
    let previous = context.create_cell(output(&lock, None), Bytes::new());
    let input = CellInput::new_builder().previous_output(previous).build();
    let type_script = context
        .build_script(&code, type_id(&input, 0))
        .expect("community type");
    let data = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    let tx = TransactionBuilder::default()
        .input(input)
        .outputs(vec![
            output(&lock, Some(type_script.clone())),
            output(&lock, Some(type_script)),
        ])
        .outputs_data(vec![data.clone(), data].pack())
        .build();
    assert_code(finish(&mut context, tx), INVALID_TYPE_ID);
}

#[test]
fn update_rejects_a_lower_fee() {
    let before = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    let after = encode(b"Signal Hall", MIN_FEE - 1, 0, 0, 0, 0);
    assert_code(update(before, after), GATE_FEE_TOO_LOW);
}

#[test]
fn update_accepts_a_new_name() {
    let before = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    let after = encode(b"Signal Yard", MIN_FEE, 0, 4, 0, 0);
    update(before, after).expect("rename");
}

#[test]
fn burn_accepts_the_one_community_cell() {
    let mut context = Context::default();
    let (lock, code) = deploy(&mut context);
    let args = Bytes::from(vec![9u8; 32]);
    let type_script = context.build_script(&code, args).expect("community type");
    let data = encode(b"Signal Hall", MIN_FEE, 0, 0, 0, 0);
    let previous = context.create_cell(output(&lock, Some(type_script)), data);
    let input = CellInput::new_builder().previous_output(previous).build();
    let tx = TransactionBuilder::default()
        .input(input)
        .output(output(&lock, None))
        .outputs_data(vec![Bytes::new()].pack())
        .build();
    finish(&mut context, tx).expect("burn");
}
