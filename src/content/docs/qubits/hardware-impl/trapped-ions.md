---
title: Trapped Ion Qubits
---
### How They Work
Trapped ion qubits, true to their name, are charged ions held in three-dimensional space by linear ion traps. These ion traps are specialized chips holding a number of electrodes, each of which produces a precise electromagnetic field. Quantum states are emulated with the specific vibrations of each ion, and lasers are shone at different wavelengths to apply quantum gates to the trapped ions. When measuring, a resonant beam will be shone so that only one state reacts to the laser. Whether or not the ion emits a glow upon measurement indicates its state (either 0 or 1).

### Pros
Most modern trapped ion qubits are ytterbium atoms, a silvery rare-earth metal chosen due to its unique property of being almost perfectly identical to every other ytterbium atom in the universe (facilitating manipulation using a standard beam). They are also highly stable, with coherence times so long that ytterbium is used in some of the world’s most accurate atomic clocks. Its reconfigurability allows for the possibility of building hundreds of qubits without needing new chips.
### Cons
Trapped ions are slower than superconducting qubits because they rely on laser beams (which are slower than microwave pulses) and require time to reset after manipulation. Scaling also becomes difficult as the number of ions grows. The current max for IONQ (one of the leading trapped ion companies) is a 79-ion chain for single-qubit gates, and 35 ions for multi-qubit algorithms.
