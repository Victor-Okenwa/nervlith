use crate::error::Error;

// pattern 0–7, art 0–2, holographic 0–2. These are the card fields the
// browser reads. Any other byte rejects the community cell.
pub fn validate_card(pattern: &[u8], art: &[u8], holographic: &[u8]) -> Result<(), Error> {
    match pattern {
        [0..=7] => {}
        [_] => return Err(Error::InvalidPattern),
        _ => return Err(Error::Encoding),
    }
    match art {
        [0..=2] => {}
        [_] => return Err(Error::InvalidArt),
        _ => return Err(Error::Encoding),
    }
    match holographic {
        [0..=2] => {}
        [_] => return Err(Error::InvalidHolographic),
        _ => return Err(Error::Encoding),
    }
    Ok(())
}
