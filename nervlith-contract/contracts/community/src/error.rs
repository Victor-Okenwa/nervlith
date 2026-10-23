use ckb_std::error::SysError;

#[repr(i8)]
pub enum Error {
    IndexOutOfBound = 1,
    ItemMissing = 2,
    LengthNotEnough = 3,
    Encoding = 4,
    // The name must be 1–32 Unicode scalars, with no ASCII control character.
    InvalidName = 5,
    // The gate fee is below 200 CKB.
    GateFeeTooLow = 6,
    // The governance model byte is not autocracy, democracy, or legislative.
    InvalidModel = 7,
    // The card pattern byte is outside the known set.
    InvalidPattern = 8,
    // The card art byte is outside the known set.
    InvalidArt = 9,
    // The holographic treatment byte is outside the known set.
    InvalidHolographic = 10,
    // The type args are not this cell's type id, or the group is not one cell.
    InvalidTypeId = 11,
    // The description is longer than 160 scalars, or it is not plain text.
    InvalidDescription = 12,
}

impl From<SysError> for Error {
    fn from(err: SysError) -> Self {
        match err {
            SysError::IndexOutOfBound => Error::IndexOutOfBound,
            SysError::ItemMissing => Error::ItemMissing,
            SysError::LengthNotEnough(_) => Error::LengthNotEnough,
            SysError::TypeIDError => Error::InvalidTypeId,
            _ => Error::Encoding,
        }
    }
}
