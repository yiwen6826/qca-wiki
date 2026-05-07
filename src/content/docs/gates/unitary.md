---
title: The Normalization Condition
description: Why valid quantum gates must be unitary.
---

Quantum states must stay normalized: the total probability of all measurement outcomes has to remain `1`. This requirement strongly restricts which matrices can count as physical gates.

## Unitary Matrices

A valid closed-system quantum gate is represented by a **unitary** matrix $U$:

$$
U^\dagger U = I.
$$

Here $U^\dagger$ is the adjoint of $U$: transpose the matrix, then take the complex conjugate of each entry.

For example, if

$$
M =
\begin{pmatrix}
M_{11} & M_{12} \\
M_{21} & M_{22}
\end{pmatrix},
$$

then

$$
M^\dagger =
\begin{pmatrix}
M_{11}^* & M_{21}^* \\
M_{12}^* & M_{22}^*
\end{pmatrix}.
$$

## Physical Meaning

Unitarity means gates preserve the length of the state vector. On the Bloch sphere, this looks like rotating the state without pushing it inside or outside the sphere.

That is why single-qubit gates can be understood in two equivalent ways:

- algebraically, as matrices acting on amplitudes
- geometrically, as rotations of the Bloch sphere

The Pauli matrices give the most common rotation axes:

$$
X =
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix},
\qquad
Y =
\begin{pmatrix}
0 & -i \\
i & 0
\end{pmatrix},
\qquad
Z =
\begin{pmatrix}
1 & 0 \\
0 & -1
\end{pmatrix}.
$$

## Why This Matters

Unitarity is the mathematical reason ideal quantum gates are reversible. If $U^\dagger U = I$, then $U^\dagger$ undoes $U$.

Measurement is different: it is not a unitary gate, because it collapses amplitudes into a classical outcome.

## Continue

- [Useful Single-Qubit Gates](/gates/useful/)
- [The Bloch Sphere](/qubits/basic-info-theory/bloch-sphere/)
- [Intro to Quantum Circuits](/circuits/intro/)
