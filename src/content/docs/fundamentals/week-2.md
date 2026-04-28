---
title: Superposition and Quantum Gates
description: The gate model of one-qubit quantum computation.
sidebar:
  order: 3
---

Once a qubit is understood as a state vector, the next question is how that state changes. This page introduces the gate model: quantum states evolve through linear transformations, and those transformations manipulate not only probabilities but phases.

## Superposition as a Computational Resource

We again begin from

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1},
$$

but now the emphasis is different. Instead of asking only what measurement outcomes are possible, we ask how gates transform the amplitudes in useful ways.

That is what turns qubits into computational objects.

## Relative Phase

One of the most important new facts is that two states can have the same computational-basis measurement probabilities and still be different states.

For example,

$$
\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}),
\qquad
\ket{-} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1}).
$$

If you measure immediately, both return `0` and `1` with equal probability. But the minus sign changes how later gates interfere with the state.

This is why amplitudes matter more than raw probabilities.

## The Bloch Sphere View

The Bloch sphere gives a geometric way to think about single-qubit states:

- $\ket{0}$ at the north pole
- $\ket{1}$ at the south pole
- balanced superpositions on the equator
- relative phase as motion around the sphere

That geometric picture is often the point where the algebra starts to become intuitive. Gates become rotations instead of just matrices to memorize.

## The Standard Single-Qubit Gates

The QCA notes build a basic gate vocabulary:

- Pauli-$X$
- Pauli-$Y$
- Pauli-$Z$
- Hadamard
- phase gates such as $S$ and $T$

Each one can be read in two ways:

- algebraically, as a matrix acting on amplitudes
- geometrically, as a rotation or basis change on the Bloch sphere

Learning to switch between those two viewpoints is one of the most useful skills in introductory quantum computing.

## Hadamard as the Superposition Gate

The Hadamard gate is especially important because it sends

$$
\ket{0} \mapsto \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}),
\qquad
\ket{1} \mapsto \frac{1}{\sqrt{2}}(\ket{0} - \ket{1}).
$$

So it turns definite computational basis states into superpositions. This is why Hadamards appear at the front of so many protocols and algorithms.

## Circuit Language

Once gates exist, it becomes natural to describe a quantum computation as a sequence of transformations. This is the role of circuit notation.

The foundations notes introduce:

- left-to-right reading of circuits
- initialization conventions
- measurement as the quantum-to-classical interface
- reversibility of unitary gates
- composition identities such as $HZH = X$

That last identity is a good reminder that gates are not isolated gadgets. Their meaning depends on composition.

## Moving to Multiple Qubits

The last step on this page is from one qubit to several. With multiple qubits, you have to distinguish:

- product states, which split cleanly into one state per qubit
- entangled states, which do not

This is the point where the gate model starts preparing you for Bell states, teleportation, and quantum algorithms. A single Hadamard is already enough to create superposition. A small circuit with a Hadamard and a `CNOT` is enough to create entanglement.

## Why This Page Matters

This is where introductory quantum computing becomes less about definitions and more about transformation.

After this page, you should be able to:

- recognize why phase matters
- understand why Hadamards appear so often
- read short circuits at a basic level
- see how one-qubit reasoning extends into multi-qubit phenomena

## Continue

- [Qubit Mathematics](/qubits/basic-info-theory/qubit-math/)
- [The Bloch Sphere](/qubits/basic-info-theory/bloch-sphere/)
- [Deutsch's Algorithm](/algorithms/deutsch-algorithm/)

## Downloads

- [Lecture notes](/resources/fundamentals/week2/lecture-notes.pdf)
- [Slides](/resources/fundamentals/week2/slides.pdf)
- [Worksheet](/resources/fundamentals/week2/worksheet.pdf)
- [Worksheet key](/resources/fundamentals/week2/worksheet-key.pdf)
