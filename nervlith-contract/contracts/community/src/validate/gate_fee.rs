use crate::error::Error;

// 200 CKB, in shannons. The same floor the launch wizard enforces.
const MIN_GATE_FEE: u64 = 200 * 100_000_000;

// gate_fee is the Uint64 in the community output data. A shorter field or a
// fee under 200 CKB rejects the cell.
pub fn validate_gate_fee(raw: &[u8]) -> Result<(), Error> {
    let bytes: [u8; 8] = raw.try_into().map_err(|_| Error::Encoding)?;
    if u64::from_le_bytes(bytes) < MIN_GATE_FEE {
        return Err(Error::GateFeeTooLow);
    }
    Ok(())
}
