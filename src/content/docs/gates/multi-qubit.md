---
title: Multi-Qubit Gates
description: Gates that connect qubits and create entanglement.
---

Single-qubit gates rotate individual qubits. Multi-qubit gates create relationships between qubits, which is where entanglement and conditional quantum logic enter the circuit model.

A two-qubit state has four computational basis states:

$$
\ket{00}, \ket{01}, \ket{10}, \ket{11}.
$$

So a general two-qubit state is

$$
\ket{\psi}
=
\alpha\ket{00}
+ \beta\ket{01}
+ \gamma\ket{10}
+ \delta\ket{11},
$$

with

$$
|\alpha|^2 + |\beta|^2 + |\gamma|^2 + |\delta|^2 = 1.
$$

## Tensor Products

Joint states are written with the tensor product $\otimes$. For example,

$$
\ket{0} \otimes \ket{1} = \ket{01}.
$$

In the basis ordering used here,

$$
\ket{01}
=
\begin{pmatrix}
0 \\
1 \\
0 \\
0
\end{pmatrix}.
$$

:::note
Software libraries sometimes use different qubit-ordering conventions. The circuit can be the same while the printed vector or matrix looks reordered.
:::

If an $X$ gate acts on the second qubit while the first is left alone, the full operation is $I \otimes X$. This flips

$$
\ket{00} \leftrightarrow \ket{01},
\qquad
\ket{10} \leftrightarrow \ket{11}.
$$

## CNOT

The controlled-NOT gate, written `CNOT` or `CX`, has a control qubit and a target qubit.

- if the control is $\ket{0}$, do nothing
- if the control is $\ket{1}$, apply $X$ to the target

With the first qubit as control,

$$
CNOT\ket{00} = \ket{00},
\qquad
CNOT\ket{01} = \ket{01},
$$

$$
CNOT\ket{10} = \ket{11},
\qquad
CNOT\ket{11} = \ket{10}.
$$

This is the basic two-qubit gate used to spread information from one qubit into another.

## Creating Entanglement

A Hadamard followed by CNOT creates a Bell state:

$$
\ket{00}
\xrightarrow{H \otimes I}
\frac{\ket{00} + \ket{10}}{\sqrt{2}}
\xrightarrow{CNOT}
\frac{\ket{00} + \ket{11}}{\sqrt{2}}.
$$

The final state cannot be separated into one state for the first qubit and one state for the second. The information is stored in the pair.

## Other Common Multi-Qubit Gates

Controlled gates generalize the CNOT idea. If $U$ is a one-qubit gate, controlled-$U$ applies $U$ to the target only when the control is $\ket{1}$:

$$
\ket{0}\ket{\psi} \mapsto \ket{0}\ket{\psi},
\qquad
\ket{1}\ket{\psi} \mapsto \ket{1}U\ket{\psi}.
$$

The controlled-Z gate, or `CZ`, changes only the phase of $\ket{11}$:

$$
CZ\ket{11} = -\ket{11},
$$

while leaving $\ket{00}$, $\ket{01}$, and $\ket{10}$ unchanged.

The `SWAP` gate exchanges two qubits:

$$
SWAP\ket{a}\ket{b} = \ket{b}\ket{a}.
$$

On real hardware, SWAPs matter because not every physical qubit can directly interact with every other one.

## Why Multi-Qubit Gates Matter

Without multi-qubit gates, a quantum computer would be a collection of independent qubits. With them, circuits can create entanglement, express conditional logic, and route information through hardware layouts.

That is why gates such as `CNOT`, `CZ`, and `SWAP` show up throughout algorithms, teleportation, and NISQ compilation.

## Continue

- [Intro to Quantum Circuits](/circuits/intro/)
- [Entanglement](/fundamentals/entanglement/)
- [Quantum Teleportation](/algorithms/quantum-teleportation/)
