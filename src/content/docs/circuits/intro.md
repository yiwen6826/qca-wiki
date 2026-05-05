---
title: Intro to Quantum Circuits
---

Quantum circuits are the standard way to draw and organize quantum computations. They let us describe a computation as a sequence of gates, measurements, and classical outputs without writing out the full state vector at every step.

The basic idea is the same as in classical circuit diagrams:

- wires carry information
- gates represent operations
- information flows through the diagram in time order

For the circuits used in this wiki, time usually flows from left to right.

## Quantum Circuit Notation

In a quantum circuit, each horizontal wire represents a qubit. A gate placed on a wire represents an operation applied to that qubit.

For example, this circuit starts in $\ket{0}$ and applies a Hadamard gate:

$$
\ket{0} \xrightarrow{H} \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}).
$$

The circuit diagram is shorthand for matrix multiplication. If a circuit applies gates $H$, then $S$, then $T$, the final state is

$$
T S H \ket{\psi}.
$$

The rightmost gate in the algebra acts first because matrices multiply state vectors from the left.

:::note
Circuit diagrams are read in the direction of time, but matrix products are written with the last visual gate on the left. This is a common source of confusion when first moving between diagrams and algebra.
:::

## Wires and Qubit Ordering

For multiple qubits, each wire corresponds to one part of the joint state. A two-qubit circuit acts on basis states such as

$$
\ket{00}, \ket{01}, \ket{10}, \ket{11}.
$$

The ordering convention matters when translating a circuit into a vector or matrix. In practice, you should always check the convention used by the tool or textbook you are reading. The circuit may be the same, but the printed matrix can look different if the basis order changes.

To recap, below are some of the most important circuit-reading rules:

- time flows left to right
- each horizontal line is one qubit
- gates are boxes or symbols on those lines
- qubits usually start in $\ket{0}$ unless specified
- measurement is drawn at the point where quantum information becomes classical information

## Single-Qubit Gates in Circuits

A one-qubit gate sits on one wire. Common examples include

- $X$, $Y$, and $Z$
- $H$
- $S$
- $T$

The Hadamard gate is especially common because it creates a balanced superposition from $\ket{0}$:

$$
H\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}).
$$

## Multi-Qubit Gates in Circuits

Multi-qubit gates connect two or more wires. The most important first example is `CNOT`, also written `CX`.

In circuit notation, a CNOT has

- a control qubit, usually drawn with a filled dot
- a target qubit, usually drawn with an $\oplus$ symbol

The target flips only when the control is $\ket{1}$.

## Building a Bell State

A short circuit with one Hadamard and one CNOT creates a Bell state. Start with two qubits in $\ket{00}$, apply $H$ to the first qubit, then apply CNOT with the first qubit as control and the second as target.

The state evolution is

$$
\ket{00}
\xrightarrow{H \otimes I}
\frac{1}{\sqrt{2}}(\ket{00} + \ket{10})
\xrightarrow{CNOT}
\frac{1}{\sqrt{2}}(\ket{00} + \ket{11}).
$$

The final state is

$$
\frac{\ket{00} + \ket{11}}{\sqrt{2}}.
$$

This small circuit captures a central pattern in quantum computing:

1. create superposition with $H$
2. spread that structure across multiple qubits with `CNOT`
3. measure only after the useful interference or correlation has been created

## Measurement

Measurement is the point where a quantum circuit produces classical information.

If a qubit is measured in the computational basis, the result is either `0` or `1`, with probabilities determined by the state's amplitudes. For multiple qubits, measurement returns a bit string such as `00`, `101`, or `111`.

If a Bell-state circuit is sampled many times on an ideal device, the dominant outcomes should be `00` and `11`, each appearing about half the time.

## Building a GHZ State

The Bell-state idea extends naturally to three qubits using a GHZ state:

$$
\ket{GHZ} = \frac{\ket{000} + \ket{111}}{\sqrt{2}}.
$$

One common circuit applies $H$ to qubit 0, CNOT from qubit 0 to qubit 1, and then CNOT from qubit 1 to qubit 2. The first gate puts qubit 0 into superposition. The first CNOT entangles qubits 0 and 1. The second CNOT extends the correlation to qubit 2.

So the circuit maps

$$
\ket{000}
\mapsto
\frac{\ket{000} + \ket{111}}{\sqrt{2}}.
$$

If all three qubits are measured, the ideal outcomes are only `000` and `111`, each with probability $\frac{1}{2}$.

## Circuit Design Principles

- **No cloning:** an arbitrary unknown quantum state cannot be copied perfectly
- **Reversibility:** unitary quantum gates are reversible
- **Unitarity:** gate matrices preserve normalization
- **Measurement:** measurement destroys superposition and produces classical information

Quantum circuit design is mostly about engineering interference. The goal is to amplify the amplitudes of useful answers and suppress the amplitudes of wrong answers before measurement happens.

## How to Read a Circuit

When reading a new circuit, work through it in this order:

1. Identify the starting state.
2. Read gates from left to right.
3. Track which gates are single-qubit and which are controlled.
4. Notice where entanglement can be created.
5. Check where measurement happens.
6. Interpret the final output as probabilities or expectation values.

For short circuits, it is worth writing out the state evolution by hand. For larger circuits, the diagram becomes a map of structure: which qubits interact, where superposition is created, and where information is finally extracted.

## Continue

- [Qiskit Circuit Examples](/circuits/qiskit-examples/)
- [Multi-Qubit Gates](/gates/multi-qubit/)
- [Entanglement](/fundamentals/entanglement/)
- [Deutsch's Algorithm](/algorithms/deutsch-algorithm/)

## Downloads

- [Slides](/resources/fundamentals/week2/slides.pdf)
