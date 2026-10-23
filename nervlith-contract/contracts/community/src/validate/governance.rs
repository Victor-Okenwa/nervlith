use crate::error::Error;

// 0 autocracy, 1 democracy, 2 legislative. All three may be stored.
// Only autocracy is executed by the app during the MVP.
pub fn validate_model(raw: &[u8]) -> Result<(), Error> {
    match raw {
        [0] | [1] | [2] => Ok(()),
        [_] => Err(Error::InvalidModel),
        _ => Err(Error::Encoding),
    }
}
