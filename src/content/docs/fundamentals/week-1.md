---
title: Bits, Qubits, and Measurement
description: The first conceptual step in understanding how qubits differ from classical bits.
sidebar:
  order: 2
---

Quantum computing begins by changing the model of information itself. A classical bit is always definitely `0` or `1`. A qubit is not.

## Classical Bits

A classical bit stores one definite value at a time. Even if we do not know what the value is, the system itself is still either `0` or `1`.

This point matters because it highlights what is genuinely new about qubits. Quantum states are not just hidden classical values waiting to be revealed.

## Qubits as States

A qubit is described by a state of the form

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}.
$$

The symbols $\ket{0}$ and $\ket{1}$ are the computational basis states, and $\alpha,\beta$ are amplitudes.

These basis states are written in vector form as

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

This is the first mathematical shift in the subject: states are vectors, not just labels.

## Measurement

If a qubit is in the state

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1},
$$

then measuring in the computational basis gives

- $\ket{0}$ with probability $|\alpha|^2$
- $\ket{1}$ with probability $|\beta|^2$

and therefore

$$
|\alpha|^2 + |\beta|^2 = 1.
$$

This is the Born rule together with normalization.

## Why This Is Different from Ordinary Uncertainty

It is tempting to think a qubit in superposition is just a classical bit that we do not know yet. That is not how the theory behaves.

The QCA introductory notes use the contrast between a settled classical coin and a genuinely quantum state to make this point. A classical system with unknown value cannot later interfere with itself. A quantum state can.

That distinction is what eventually makes algorithms and protocols interesting.

## State Spaces Grow Fast

A single qubit already differs from a bit because its description involves amplitudes. With multiple qubits, the difference becomes larger:

- 1 qubit -> 2 basis states
- 2 qubits -> 4 basis states
- 3 qubits -> 8 basis states
- $n$ qubits -> $2^n$ basis states

A classical $n$-bit register occupies one bit string at a time. A quantum $n$-qubit state can assign amplitudes across all $2^n$ basis states at once.

That does not mean measurement reveals all of them at once. It means the internal state space scales exponentially.

## First Gate Example

The usual first gate is the Pauli-$X$ gate:

$$
X =
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix}.
$$

It behaves like a quantum NOT:

$$
X\ket{0} = \ket{1},
\qquad
X\ket{1} = \ket{0}.
$$

This is often the first moment where the gate model becomes tangible: if states are vectors, then gates are matrices acting on those vectors.

## What This Page Was Trying to Establish

At this stage, the essential facts are:

- qubits are described by amplitudes, not hidden classical values
- measurement gives probabilities derived from squared amplitudes
- basis states are vectors
- gates will act linearly on those vectors
- many-qubit systems grow exponentially in state-space size

That is enough to move from "what is a qubit?" to "how do quantum states evolve?"

## Continue

- [Superposition and Quantum Gates](/fundamentals/week-2/)
- [Qubit Mathematics](/qubits/basic-info-theory/qubit-math/)
- [The Bloch Sphere](/qubits/basic-info-theory/bloch-sphere/)

## Downloads

- [Lecture notes](/resources/fundamentals/week1/lecture-notes.pdf)
- [Slides](/resources/fundamentals/week1/slides.pdf)
- [Worksheet](/resources/fundamentals/week1/worksheet.pdf)
- [Worksheet key](/resources/fundamentals/week1/worksheet-key.pdf)
