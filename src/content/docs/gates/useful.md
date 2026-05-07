---
title: Useful Single-Qubit Gates
description: The basic one-qubit gate vocabulary.
---

Single-qubit gates rotate one qubit around the Bloch sphere. A small set appears constantly in circuits, algorithms, and error correction.

## Pauli Gates

The Pauli gates are $X$, $Y$, and $Z$. Each is unitary, and each squares to the identity:

$$
X^2 = Y^2 = Z^2 = I.
$$

The $X$ gate flips computational basis states:

$$
X\ket{0} = \ket{1},
\qquad
X\ket{1} = \ket{0}.
$$

The $Z$ gate leaves $\ket{0}$ alone and changes the sign of $\ket{1}$:

$$
Z\ket{0} = \ket{0},
\qquad
Z\ket{1} = -\ket{1}.
$$

This changes relative phase without changing immediate computational-basis measurement probabilities.

The $Y$ gate combines a bit flip with a phase change:

$$
Y =
\begin{pmatrix}
0 & -i \\
i & 0
\end{pmatrix}.
$$

## Hadamard Gate

The Hadamard gate, written $H$, is the standard way to create balanced superpositions from basis states:

$$
H\ket{0} = \frac{\ket{0} + \ket{1}}{\sqrt{2}},
\qquad
H\ket{1} = \frac{\ket{0} - \ket{1}}{\sqrt{2}}.
$$

Its matrix is

$$
H = \frac{1}{\sqrt{2}}
\begin{pmatrix}
1 & 1 \\
1 & -1
\end{pmatrix}.
$$

Hadamards are common because they move information between the computational basis and the superposition basis. Many algorithms begin by applying $H$ gates so later operations can create interference.

## Phase Gates

Two other common single-qubit gates are $S$ and $T$:

$$
S =
\begin{pmatrix}
1 & 0 \\
0 & i
\end{pmatrix},
\qquad
T =
\begin{pmatrix}
1 & 0 \\
0 & e^{i\pi/4}
\end{pmatrix}.
$$

Like $Z$, they change phase rather than directly flipping measurement probabilities.

## Continue

- [Multi-Qubit Gates](/gates/multi-qubit/)
- [Intro to Quantum Circuits](/circuits/intro/)
- [Superposition and Quantum Gates](/fundamentals/superposition-and-gates/)
