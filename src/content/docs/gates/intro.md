---
title: Introduction
description: Gates as linear operations on qubit amplitudes.
---

Quantum gates are the operations that change qubit states. In the vector model, a gate is a matrix and applying the gate means multiplying that matrix into the state vector.

For one qubit,

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}
=
\begin{pmatrix}
\alpha \\
\beta
\end{pmatrix}.
$$

## From Classical NOT to Quantum X

Classically, the simplest single-bit gate is `NOT`: it sends `0` to `1` and `1` to `0`.

The quantum version is the $X$ gate:

$$
X =
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix}.
$$

It swaps the two amplitudes:

$$
X\ket{\psi}
=
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix}
\begin{pmatrix}
\alpha \\
\beta
\end{pmatrix}
=
\begin{pmatrix}
\beta \\
\alpha
\end{pmatrix}.
$$

So $X$ flips the probabilities of measuring $\ket{0}$ and $\ket{1}$.

:::note
Gates multiply state vectors from the left. If a circuit applies $A$ and then $B$, the algebra is written $BA\ket{\psi}$.
:::

## Why Gates Are Different

Quantum gates act on amplitudes, not just measured bits. This means they can change phases and create interference effects that have no direct classical analogue.

The rest of this chapter builds the basic gate vocabulary:

- unitary matrices
- Pauli gates
- Hadamard gates
- multi-qubit gates such as `CNOT`

## Continue

- [The Normalization Condition](/gates/unitary/)
- [Useful Single-Qubit Gates](/gates/useful/)
- [Multi-Qubit Gates](/gates/multi-qubit/)
