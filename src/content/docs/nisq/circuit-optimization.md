---
title: Circuit Optimization and Transpilation
description: How quantum circuits are transformed, compiled, and optimized for noisy quantum hardware.
---

In the NISQ regime, a quantum algorithm is not finished when the ideal circuit has been written down. Before the circuit can run on real hardware, it must be transformed into a form that respects the hardware's instruction set, connectivity, and timing constraints. That compiler-side process is usually called **transpilation**.[^ibm-transpile]

## Why this topic matters

Circuit optimization and transpilation are especially important on noisy devices for a simple reason: every extra gate, especially every extra two-qubit gate, creates another opportunity for error.

IBM's circuit optimization lesson makes this concrete by showing that different transpilation settings can produce noticeably different circuit lengths, and shorter circuits generally perform better because they accumulate less noise.[^ibm-circuit-opt] IBM's transpiler documentation states the same point more formally: transpilation rewrites a circuit to match a specific device and optimizes the instructions for execution on noisy quantum computers.[^ibm-transpile]

## Transformation versus transpilation

It is useful to distinguish two closely related ideas:

1. A **circuit transformation** is any rewrite of a quantum circuit that preserves the intended computation.
2. **Transpilation** is the structured process of applying such transformations so that the circuit becomes executable on a specific backend and, ideally, more hardware-efficient.[^ibm-transpile][^ibm-pass-manager]

For example:

1. Merging a chain of single-qubit rotations is a transformation.
2. Replacing an unsupported gate with an equivalent sequence of supported basis gates is a transformation.
3. Choosing physical qubits, inserting SWAP gates, translating into the device basis, and optimizing the result together constitute transpilation.

## The hardware target: ISA compliance

IBM's transpiler documentation emphasizes that circuits submitted to a backend must obey that backend's **instruction set architecture (ISA)**.[^ibm-transpile]

In practice, ISA compliance means the transpiled circuit must use only operations that the target backend supports, such as:

1. Its basis gates.
2. Its measurement and reset instructions.
3. Its control-flow features, if any.
4. Its connectivity constraints, captured by the coupling map.[^ibm-transpile]

This is why a mathematically correct circuit can still be non-runnable on a real device until it has been transpiled.

## The six standard transpiler stages

IBM's current documentation describes a six-stage prebuilt transpilation pipeline in Qiskit:[^ibm-transpile][^ibm-stages]

1. `init`
2. `layout`
3. `routing`
4. `translation`
5. `optimization`
6. `scheduling`

These stages are conceptually useful even if you never customize the compiler yourself.

### 1. Init

The `init` stage prepares the circuit for the rest of the pipeline, often by validating instructions and rewriting multi-qubit operations into one- and two-qubit operations.[^ibm-transpile][^ibm-stages]

### 2. Layout

The `layout` stage assigns the circuit's virtual qubits to physical qubits on the target device.[^ibm-transpile][^ibm-stages] This choice matters because some physical qubits are better calibrated than others, and some qubit placements require fewer routing operations.

### 3. Routing

The `routing` stage inserts extra gates, usually SWAPs, so that two-qubit interactions respect the device connectivity graph.[^ibm-transpile][^ibm-stages]

This is one of the most important compiler stages in NISQ computing because:

1. SWAP gates are expensive.
2. SWAP insertion increases depth.
3. Increased depth typically worsens noise sensitivity.

IBM's transpiler stages documentation notes that finding the optimal SWAP mapping is computationally hard, so heuristic methods are used in practice.[^ibm-stages]

## SABRE and heuristic routing

IBM's transpilation tutorial highlights SABRE as a major heuristic for layout and routing. The tutorial states that SABRE minimizes the number of SWAP gates and reduces circuit depth, making it particularly useful for large and complex circuits.[^ibm-sabre]

This is a good example of a broader principle: in NISQ compilation, the compiler does not merely make a circuit legal. It tries to make it *less noisy in practice* by reducing routing overhead.

## Translation to basis gates

The `translation` stage converts the circuit into the backend's native or supported gate basis.[^ibm-transpile][^ibm-stages]

An ideal textbook circuit might use gates such as `CX`, `H`, or a custom unitary block. After translation, the hardware-facing circuit may instead be written in terms of a different native basis, such as single-qubit rotations plus a device-native entangling gate.

This is why the transpiled circuit can look very different from the original circuit even when it computes the same ideal unitary.

## Optimization

The `optimization` stage attempts to reduce circuit cost after layout, routing, and translation.[^ibm-transpile][^ibm-stages] Typical goals include:

1. Reducing two-qubit gate count.
2. Merging or canceling adjacent single-qubit gates.
3. Exploiting commutation relationships.
4. Resynthesizing blocks into more efficient decompositions.

IBM's optimization-level documentation explains that higher `optimization_level` values generally produce more optimized circuits at the expense of longer compile times.[^ibm-opt-level]

At a high level:

1. `optimization_level=0` does the minimum needed to make the circuit runnable.[^ibm-opt-level]
2. Levels `1` and `2` apply progressively stronger cleanup and simplification routines.[^ibm-opt-level][^ibm-stages]
3. Level `3` applies the most aggressive built-in optimizations, including more expensive resynthesis strategies.[^ibm-opt-level]

IBM also shows a concrete case in which moving from level 0 to level 3 reduces the number of two-qubit gates substantially.[^ibm-opt-level]

## Scheduling and idle time

The `scheduling` stage is the most hardware-aware part of the default pipeline. IBM describes it as the stage that accounts for idle time when a scheduling method is requested.[^ibm-transpile]

This matters because idle periods are not inert in practice. Idling qubits can decohere or accumulate coherent errors, which is one reason scheduling and later suppression techniques such as dynamical decoupling fit naturally together.

## Pass managers and customization

IBM recommends transpiling with a **staged pass manager** created by `generate_preset_pass_manager`.[^ibm-pass-manager] This is the clearest modern mental model of the compiler stack:

1. A **pass** performs one transformation or analysis.
2. A **PassManager** groups passes.
3. A **StagedPassManager** groups pass managers into larger compiler stages.[^ibm-transpile][^ibm-pass-manager]

This layered structure is pedagogically important because it shows that transpilation is not one opaque magic step. It is a sequence of targeted compiler decisions.

## A useful NISQ perspective

In fault-tolerant settings, one can often reason about an ideal logical circuit first and defer hardware compilation details. In the NISQ setting, that separation is much weaker.

The real question is not only:

$$
\text{What circuit implements the algorithm?}
$$

but also:

$$
\text{What compiled circuit can this device execute with acceptable error?}
$$

That is why circuit optimization, transformation, and transpilation should be regarded as part of the algorithmic workflow rather than as mere implementation details.

## Practical takeaway

When learning or designing NISQ workflows, it helps to remember:

1. The ideal circuit is only the starting point.
2. Transpilation makes the circuit hardware-valid.
3. Optimization makes the circuit more hardware-efficient.
4. Better layout and routing often mean fewer SWAPs and shallower depth.
5. Compiler choices can materially change experimental quality.

For that reason, circuit optimization sits conceptually between [Mapping Quantum Problems](./mapping) and [Error Mitigation Techniques](./error-mitigation): once a problem has been mapped to a circuit, the next question is how to compile that circuit into the least damaging form the hardware can actually run.

[^ibm-transpile]: IBM Quantum Documentation, ["Introduction to transpilation"](https://quantum.cloud.ibm.com/docs/en/guides/transpile).
[^ibm-stages]: IBM Quantum Documentation, ["Transpiler stages"](https://quantum.cloud.ibm.com/docs/en/guides/transpiler-stages).
[^ibm-pass-manager]: IBM Quantum Documentation, ["Transpile with pass managers"](https://quantum.cloud.ibm.com/docs/en/guides/transpile-with-pass-managers).
[^ibm-opt-level]: IBM Quantum Documentation, ["Set transpiler optimization level"](https://quantum.cloud.ibm.com/docs/en/guides/set-optimization).
[^ibm-sabre]: IBM Quantum Documentation, ["Transpilation optimizations with SABRE"](https://quantum.cloud.ibm.com/docs/en/tutorials/transpilation-optimizations-with-sabre).
[^ibm-circuit-opt]: IBM Quantum Learning, ["Quantum circuit optimization"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-circuit-optimization).
