---
title: Qubit Mathematics
description: A long-form introduction to the mathematical language of qubits.
sidebar:
  order: 1
---

Quantum computing stops feeling mystical once the mathematical model becomes familiar. This page introduces the core language that the rest of the wiki uses: basis states, amplitudes, measurement, tensor products, and gates as matrices.

## Bits and Basis States

A classical bit is always either `0` or `1`. In the vector language of quantum computing, we write those two states as

$$
\ket{0} =
\begin{pmatrix}
1 \\
0
\end{pmatrix},
\qquad
\ket{1} =
\begin{pmatrix}
0 \\
1
\end{pmatrix}.
$$

These are called the **computational basis states**.

A qubit can be in either basis state, but it can also be in a linear combination of both:

$$
\ket{\psi} = \alpha \ket{0} + \beta \ket{1}.
$$

Written as a column vector,

$$
\ket{\psi} =
\begin{pmatrix}
\alpha \\
\beta
\end{pmatrix}.
$$

The numbers $\alpha$ and $\beta$ are called **probability amplitudes**. They are usually complex numbers, not just real numbers.

## Normalization

Physical qubit states must satisfy

$$
|\alpha|^2 + |\beta|^2 = 1.
$$

This is the **normalization condition**. It guarantees that the probabilities produced by measurement add up to one.

For example:

- $\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}$ is valid
- $\frac{1}{2}\ket{0} + \frac{1}{2}\ket{1}$ is not normalized

The QCA fundamentals notes lean on this repeatedly, because it is the first place where qubits stop looking like ordinary bits and start looking like quantum states.

## Measurement and the Born Rule

If a qubit is in the state

$$
\ket{\psi} = \alpha \ket{0} + \beta \ket{1},
$$

then measuring in the computational basis gives

- $\ket{0}$ with probability $|\alpha|^2$
- $\ket{1}$ with probability $|\beta|^2$

This rule is the **Born rule**.

So if

$$
\ket{\psi} = \frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1},
$$

then the two outcomes each appear with probability $\frac{1}{2}$.

But amplitudes carry more information than probabilities alone. The state

$$
\frac{1}{\sqrt{2}}\left(\ket{0} + \ket{1}\right)
$$

and the state

$$
\frac{1}{\sqrt{2}}\left(\ket{0} - \ket{1}\right)
$$

have the same immediate measurement probabilities in the computational basis, but they behave differently when later gates are applied. The minus sign is a **relative phase**, and relative phase is what makes interference possible.

## Gates as Matrices

Quantum gates act linearly on state vectors. If a gate is represented by a matrix $U$, then applying it to a state gives

$$
\ket{\psi'} = U\ket{\psi}.
$$

### Pauli-X

The simplest example is the quantum NOT gate:

$$
X =
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix}.
$$

It swaps the amplitudes:

$$
X
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

In particular,

$$
X\ket{0} = \ket{1}, \qquad X\ket{1} = \ket{0}.
$$

### Hadamard

The Hadamard gate is one of the most important gates in the entire subject:

$$
H = \frac{1}{\sqrt{2}}
\begin{pmatrix}
1 & 1 \\
1 & -1
\end{pmatrix}.
$$

Its action on basis states is

$$
H\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}) = \ket{+},
$$

$$
H\ket{1} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1}) = \ket{-}.
$$

So Hadamard gates turn definite computational states into superpositions.

### Pauli-Z

The Pauli-$Z$ gate is

$$
Z =
\begin{pmatrix}
1 & 0 \\
0 & -1
\end{pmatrix}.
$$

It leaves $\ket{0}$ alone and flips the sign of $\ket{1}$:

$$
Z(\alpha\ket{0} + \beta\ket{1}) = \alpha\ket{0} - \beta\ket{1}.
$$

That often looks harmless because measurement probabilities do not change immediately. But in quantum computing, changing a relative sign can completely alter what later interference produces.

## A Worked Identity

Start in $\ket{0}$ and apply

$$
H \to Z \to H.
$$

First:

$$
\ket{0} \xrightarrow{H}
\frac{1}{\sqrt{2}}(\ket{0} + \ket{1}).
$$

Then:

$$
\frac{1}{\sqrt{2}}(\ket{0} + \ket{1}) \xrightarrow{Z}
\frac{1}{\sqrt{2}}(\ket{0} - \ket{1}).
$$

Then:

$$
\frac{1}{\sqrt{2}}(\ket{0} - \ket{1}) \xrightarrow{H} \ket{1}.
$$

So the whole sequence acts like

$$
HZH = X.
$$

This is a good example of why the matrix viewpoint matters: it lets you prove circuit identities rather than just memorizing them.

## Multiple Qubits and Tensor Products

A single qubit lives in a 2-dimensional complex vector space. Two qubits live in a 4-dimensional one. In general, $n$ qubits live in a space of dimension $2^n$.

The basis states of two qubits are:

- $\ket{00}$
- $\ket{01}$
- $\ket{10}$
- $\ket{11}$

These are built with the **tensor product**. For example,

$$
\ket{0}\otimes\ket{1}
=
\begin{pmatrix}
1 \\
0
\end{pmatrix}
\otimes
\begin{pmatrix}
0 \\
1
\end{pmatrix}
=
\begin{pmatrix}
0 \\
1 \\
0 \\
0
\end{pmatrix}
= \ket{01}.
$$

This exponential state-space growth is why quantum systems become hard to simulate classically and why quantum algorithms can be expressive at all.

## Product States and Entanglement

Some multi-qubit states factor cleanly. For example,

$$
(\alpha\ket{0} + \beta\ket{1}) \otimes (\gamma\ket{0} + \delta\ket{1})
$$

is just two independent single-qubit states written together.

But not every two-qubit state can be written that way. A famous counterexample is

$$
\frac{1}{\sqrt{2}}(\ket{00} + \ket{11}),
$$

which is a Bell state. It is **entangled**, meaning the whole system cannot be described as one state for the first qubit and another for the second.

That distinction becomes crucial once you study Bell inequalities, teleportation, and many algorithms.

## Why This Page Matters

Nearly every later topic in the wiki depends on the same short list of ideas:

- amplitudes rather than just probabilities
- normalization
- measurement by the Born rule
- gates as linear transformations
- tensor products for many-qubit states
- phase and interference

Once these ideas are comfortable, the rest of introductory quantum computing reads much more like mathematics and much less like magic.

## Continue

- [The Bloch Sphere](/qubits/basic-info-theory/bloch-sphere/)
- [Introduction to Single-Qubit Gates](/gates/single-qubit-gates/intro/)
- [Deutsch's Algorithm](/algorithms/deutsch-algorithm/)
