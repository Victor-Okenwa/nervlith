use crate::error::Error;
use crate::generated::Community;
use crate::validate::card::validate_card;
use crate::validate::gate_fee::validate_gate_fee;
use crate::validate::governance::validate_model;
use crate::validate::name::validate_name;
use molecule::prelude::Entity;

// Community output data. The molecule layout is the same one the launch
// wizard writes. A layout the schema rejects fails the cell. Each field
// check reports its own error. This script does not read a witness.
pub fn validate_data(data: &[u8]) -> Result<(), Error> {
    let community = Community::from_slice(data).map_err(|_| Error::Encoding)?;
    let name = community.name().raw_data();
    validate_name(name.as_ref())?;
    validate_gate_fee(community.gate_fee().as_slice())?;
    validate_model(community.model().as_slice())?;
    validate_card(
        community.pattern().as_slice(),
        community.art().as_slice(),
        community.holographic().as_slice(),
    )?;
    Ok(())
}
