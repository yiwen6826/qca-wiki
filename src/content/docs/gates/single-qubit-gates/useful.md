---
title: Useful Single-Qubit Gates
---
So far, we have seen the quantum $X$ gate and its physical implications on a single qubit. Now we will introduce several other useful single-qubit gates.

## Pauli Gates
The Pauli gates are a trio of fundamental, single-qubit unitary operations that are crucial for algorithms like quantum error correction. Each corresponds to a Pauli matrix $\sigma_x$, $\sigma_y$, or $\sigma_z$ with the property that their square is the identity matrix ($X^2 = Y^2 = Z^2 = I$). We have already seen one of them: the X gate. The other two — the Y and Z gates — are introduced below.

### The Z Gate
The Z gate can be represented as the matrix
$
\begin{pmatrix}
1 & 0 \\
0 & -1 \\
\end{pmatrix}.
$
On the Bloch sphere, it performs a 180° rotation around the Z-axis, effectively introducing a phase to the $\ket{1}$ component. Importantly, this does not change the measurement probabilities of the qubit.

### The Y Gate
The matrix for the Y gate is
$
\begin{pmatrix}
0 & -i \\
i & 0 \\
\end{pmatrix}.
$
It similarly performs a 180° rotation around its namesake Y-axis, acting as both a bit-flip (X gate) and a phase-flip (Z gate) simultaneously.

## The H Gate
The **Hadamard gate**, also known as the H gate, is a special gate in quantum computing that puts classical states into superposition. On the Bloch sphere, it is a 180° rotation around an axis halfway between the x- and z-axes. 

It is represented in matrix form as 
$H = \frac{1}{\sqrt2}
\begin{pmatrix}
1 & 1 \\
1 & -1 \\
\end{pmatrix}.$
Applying the H gate to the $\ket{0}$ state results in the $\ket{+}$ state $\frac{1}{\sqrt2}(\ket{0} + \ket{1})$, while applying the H gate to the $\ket{1}$ state results in the $\ket{-}$ state $\frac{1}{\sqrt2}(\ket{0} - \ket{1})$. 

Try to convince yourself that this is true!