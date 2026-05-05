---
title: Multi-Qubit Gates
---

Single-qubit gates can rotate one qubit around the Bloch sphere, but they cannot create entanglement by themselves. To build genuinely quantum circuits, we need gates that act on more than one qubit at a time.

Multi-qubit gates are represented by larger unitary matrices. A two-qubit gate acts on a four-dimensional state vector because the computational basis has four states:

$$
\ket{00}, \ket{01}, \ket{10}, \ket{11}.
$$

So a general two-qubit state looks like

$$
\ket{\psi} = \alpha\ket{00} + \beta\ket{01} + \gamma\ket{10} + \delta\ket{11},
$$

where

$$
|\alpha|^2 + |\beta|^2 + |\gamma|^2 + |\delta|^2 = 1.
$$

## Tensor Products

When two independent qubits are put together, their joint state is written with the tensor product $\otimes$.

For example, if the first qubit is $\ket{0}$ and the second qubit is $\ket{1}$, then the combined state is

$$
\ket{0} \otimes \ket{1} = \ket{01}.
$$

In vector form,

$$
\ket{01}
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
\end{pmatrix}.
$$

The standard ordering used here is

$$
\ket{00} =
\begin{pmatrix}
1 \\
0 \\
0 \\
0
\end{pmatrix},
\quad
\ket{01} =
\begin{pmatrix}
0 \\
1 \\
0 \\
0
\end{pmatrix},
\quad
\ket{10} =
\begin{pmatrix}
0 \\
0 \\
1 \\
0
\end{pmatrix},
\quad
\ket{11} =
\begin{pmatrix}
0 \\
0 \\
0 \\
1
\end{pmatrix}.
$$

:::note
Different software libraries sometimes use different qubit-ordering conventions. The physics is the same, but the matrix representation may look transposed or reordered if the basis order changes.
:::

## Applying a Single-Qubit Gate Inside a Larger System

If we want to apply an $X$ gate to the second qubit while leaving the first qubit alone, we use

$$
I \otimes X.
$$

Since

$$
I =
\begin{pmatrix}
1 & 0 \\
0 & 1
\end{pmatrix},
\qquad
X =
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix},
$$

we get

$$
I \otimes X =
\begin{pmatrix}
0 & 1 & 0 & 0 \\
1 & 0 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{pmatrix}.
$$

This flips the second bit of each basis state:

$$
\ket{00} \leftrightarrow \ket{01},
\qquad
\ket{10} \leftrightarrow \ket{11}.
$$

## The CNOT Gate

The **controlled-NOT gate**, usually written `CNOT` or `CX`, is one of the most important two-qubit gates. It has a **control** qubit and a **target** qubit.

The rule is simple:

- if the control qubit is $\ket{0}$, do nothing
- if the control qubit is $\ket{1}$, apply $X$ to the target qubit

With the first qubit as control and the second qubit as target,

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

Its matrix is

$$
CNOT =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{pmatrix}.
$$

The CNOT gate is reversible. Applying it twice gives the identity:

$$
CNOT^2 = I.
$$

## Creating Entanglement

CNOT is especially important because it can turn a product state into an entangled state.

Start with two qubits in $\ket{00}$. Apply a Hadamard gate to the first qubit:

$$
\ket{00}
\xrightarrow{H \otimes I}
\frac{1}{\sqrt{2}}(\ket{00} + \ket{10}).
$$

Now apply CNOT with the first qubit as control:

$$
\frac{1}{\sqrt{2}}(\ket{00} + \ket{10})
\xrightarrow{CNOT}
\frac{1}{\sqrt{2}}(\ket{00} + \ket{11}).
$$

The final state is a Bell state. It cannot be separated into "the state of the first qubit" and "the state of the second qubit." The information is stored in the pair.

## Controlled Gates

CNOT is one example of a broader idea: a **controlled gate** applies some operation only when the control qubit is $\ket{1}$.

If $U$ is a single-qubit gate, then the controlled-$U$ gate acts like this:

$$
\ket{0}\ket{\psi} \mapsto \ket{0}\ket{\psi},
\qquad
\ket{1}\ket{\psi} \mapsto \ket{1}U\ket{\psi}.
$$

In matrix form,

$$
C(U) =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & u_{00} & u_{01} \\
0 & 0 & u_{10} & u_{11}
\end{pmatrix}.
$$

Setting $U = X$ gives CNOT.

## The CZ Gate

Another useful controlled gate is the **controlled-Z gate**, or `CZ`.

The $Z$ gate changes the sign of $\ket{1}$, so `CZ` changes the sign only when both qubits are $\ket{1}$:

$$
CZ\ket{00} = \ket{00},
\qquad
CZ\ket{01} = \ket{01},
$$

$$
CZ\ket{10} = \ket{10},
\qquad
CZ\ket{11} = -\ket{11}.
$$

Its matrix is

$$
CZ =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & -1
\end{pmatrix}.
$$

This gate does not flip either qubit. Instead, it introduces a relative phase, which can later change measurement probabilities through interference.

## The SWAP Gate

The **SWAP gate** exchanges the states of two qubits:

$$
SWAP\ket{a}\ket{b} = \ket{b}\ket{a}.
$$

On basis states,

$$
SWAP\ket{00} = \ket{00},
\qquad
SWAP\ket{01} = \ket{10},
$$

$$
SWAP\ket{10} = \ket{01},
\qquad
SWAP\ket{11} = \ket{11}.
$$

Its matrix is

$$
SWAP =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}.
$$

SWAP is useful when two qubits need to trade places in a circuit. On real hardware, this often matters because not every physical qubit can directly interact with every other physical qubit.

## Why Multi-Qubit Gates Matter

Single-qubit gates change individual states. Multi-qubit gates create relationships between qubits.

This is what makes them central to quantum computing:

- CNOT and CZ can create entanglement
- controlled gates let one qubit condition the evolution of another
- SWAP gates move quantum information through hardware layouts
- many quantum algorithms rely on interference between multi-qubit branches

Without multi-qubit gates, a quantum computer would just be a collection of independent qubits. With them, circuits can build entangled states, perform conditional logic, and express computations that have no direct classical analogue.

## Continue

- [Entanglement](/fundamentals/entanglement/)
- [Intro to Quantum Circuits](/circuits/intro/)
- [Quantum Teleportation](/algorithms/quantum-teleportation/)
