use crate::error::Error;

const NAME_MAX: usize = 32;

// The name lives in the community output data. An empty name, a name longer
// than 32 scalars, a control character, or invalid UTF-8 rejects the cell.
pub fn validate_name(name: &[u8]) -> Result<(), Error> {
    let text = core::str::from_utf8(name).map_err(|_| Error::InvalidName)?;
    let count = text.chars().count();
    if count == 0 || count > NAME_MAX {
        return Err(Error::InvalidName);
    }
    if text.chars().any(|scalar| (scalar as u32) <= 0x1f) {
        return Err(Error::InvalidName);
    }
    Ok(())
}
