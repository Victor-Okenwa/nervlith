#![cfg_attr(not(any(feature = "library", test)), no_std)]
#![cfg_attr(not(test), no_main)]

#[cfg(any(feature = "library", test))]
extern crate alloc;

mod error;
mod generated;
mod validate;

use ckb_std::ckb_constants::Source;
use ckb_std::error::SysError;
use ckb_std::high_level::load_cell_data;
use ckb_std::type_id::check_type_id;
use error::Error;
use validate::data::validate_data;

#[cfg(not(any(feature = "library", test)))]
ckb_std::entry!(program_entry);
#[cfg(not(any(feature = "library", test)))]
ckb_std::default_alloc!(16384, 1258306, 64);

pub fn program_entry() -> i8 {
    match execute() {
        Ok(()) => 0,
        Err(err) => err as i8,
    }
}

fn execute() -> Result<(), Error> {
    // Script args are the 32-byte type id of this community cell. Creation
    // checks that id against input 0 and this output's index. An update keeps
    // the same script, so the same args. Burning the one community cell is
    // allowed. No witness is read; the rules live in the output data.
    check_type_id(0, 32)?;
    if load_script_args_len()? != 32 {
        return Err(Error::InvalidTypeId);
    }

    // GroupOutput is the community cell being created or kept. A burn has
    // no output in the group, so there is no data to check.
    match load_cell_data(0, Source::GroupOutput) {
        Ok(data) => validate_data(&data),
        Err(SysError::IndexOutOfBound) => Ok(()),
        Err(err) => Err(err.into()),
    }
}

fn load_script_args_len() -> Result<usize, Error> {
    let script = ckb_std::high_level::load_script()?;
    Ok(script.args().raw_data().len())
}
