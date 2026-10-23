use crate::error::Error;

const DESCRIPTION_MAX: usize = 160;

// The description lives in the community output data. Empty is allowed.
// More than 160 scalars, a control character, or invalid UTF-8 rejects the cell.
pub fn validate_description(description: &[u8]) -> Result<(), Error> {
    let text = core::str::from_utf8(description).map_err(|_| Error::InvalidDescription)?;
    if text.chars().count() > DESCRIPTION_MAX {
        return Err(Error::InvalidDescription);
    }
    if text.chars().any(|scalar| (scalar as u32) <= 0x1f) {
        return Err(Error::InvalidDescription);
    }
    Ok(())
}
