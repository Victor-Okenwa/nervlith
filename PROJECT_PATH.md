# Nervlith project path

Tagline: Build · Govern · Belong.

Nervlith is a CKB-native DAO launcher. A person sets a gate fee and a governance model, members pay that fee, and each member receives a membership card rendered in the browser from on-chain metadata. It replaces a centralized forum such as Metaforo with cells the chain can verify.

Identity is DID:CKB through `@ckb-ccc/did-ckb`. Democracy and Legislative voting follow AnihDev’s CKB Voting pattern: each vote is its own intent cell, and the app aggregates those cells. Contracts are `no_std` Rust on `ckb-std`. The app is Next.js, TypeScript, and Tailwind. Transactions go through CCC.

## MVP

Phases 1–3. Ship identity, community creation, and a gate that checks membership. The owner keeps control. Do not build voting.

### Phase 1 — Identity and shell

A person can create a DID and move through an empty product shell.

- Integrate `@ckb-ccc/did-ckb`.
- Create DID, resolve DID, edit the profile (`services.profile`), rotate keys, deactivate, and migrate from `did:plc`.
- Pages: landing, dashboard, browse communities, and My Identity.
- The DID is the passport used by later phases. Do not invent a second account system.

### Phase 2 — Community creation and membership

A person with a DID can launch a community and define its membership card.

- Type script: enforce creation rules for name, gate fee, and governance model.
- Store the chosen model on the community cell so Phase 4 does not need a new schema.
- MVP behavior is Autocracy only. The owner decides. Democracy and Legislative are recorded, not executed.
- Frontend: a four-step launch wizard. Step 3 is a live membership-card designer (pattern, art, holographic treatment).
- Membership is an owner-mode xUDT plus the visual metadata the client uses to draw the card. The card image is not stored on a server.

### Phase 3 — Token-gated access

Paying the fee is what makes someone a member.

- Lock script: the action unlocks only when the transaction inputs include that community’s membership xUDT.
- Join flow: pay the gate fee, mint the card, show the card.
- Every transaction declares `cellDeps` for the scripts it uses. The witness slot in Rust and TypeScript is the same slot (for this lock, `input_type`).

## Later

Not part of the MVP. Do not start these until Phases 1–3 are in place.

### Phase 4 — Governance

Voting and elections. This phase was removed from the MVP.

- Models, once this phase starts:
  - Autocracy: already live. The owner keeps control.
  - Democracy: one membership, one vote. Any member may propose. All members vote. The owner can be voted out.
  - Legislative: members elect a council. The council votes on laws between elections.
- Contracts: type scripts for proposal cells and vote cells.
- Votes are independent intent cells. The app builds the transaction that creates a vote cell. A separate aggregation flow reads those cells and updates community state. Aggregating must not require the voter’s signature again. Do not store every vote in one mutable cell.
- Frontend: proposal lists, vote casting, and the Legislative election flow.
- Integration: AnihDev’s CKB Voting protocol, implemented in Nervlith’s own transactions and tally.

### Reputation

After governance. Vellum can attach claims to a DID: small cells issued by someone else, such as a verified GitHub handle or a completed CKB task.

- Nervlith may later use claims to weight votes or to open a gate.
- Do not add claim cells, vote weights, or claim-based access before this phase.
