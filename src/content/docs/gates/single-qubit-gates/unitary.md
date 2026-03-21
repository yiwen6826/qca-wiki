---
title: Unitarianism
---

### The Normalization Condition
Notice that the normalization condition holds after the gate is applied to the qubit. This turns out to be the criterion for any single-qubit gate: it must be a unitary matrix $U$ such that $U^{\dagger}U = I$, where $U^{\dagger}$ (read: U dagger) is the adjoint of $U$ ($U$ transposed then complex conjugated) and $I$ is the 2x2 identity matrix. 
:::note
The adjoint (or adjugate) of a matrix first transposes it, then takes its complex conjugate. For example, the adjoint of the matrix 
$
M = 
\begin{pmatrix}
M_{11} & M_{12} \\
M_{21} & M_{22}
\end{pmatrix}
$
is 
$
M^{\dagger} = 
\begin{pmatrix}
M_{11}^* & M_{21}^* \\
M_{12}^* & M_{22}^*
\end{pmatrix}
$
, where $*$ represents the complex conjugate.
:::

Physically, what does this mean? Recall the Bloch sphere, on which qubits are vectors of radius 1 on the unit sphere. A single-qubit gate, therefore, can rotate a vector to any other position on the Bloch sphere. We can also write $U$ out mathematically with the equation
$$
U(\hat{n}, \chi) = I \cos{\frac{\chi}{2} - i \sin{\frac{\chi}{2}(\hat{n}_x \sigma_x+\hat{n}_y \sigma_y+\hat{n}_z \sigma_z)}}
$$
, where $\hat{n}$ is the axis around which the qubit is rotated, $\chi$ is the angle of rotation, and $\sigma _x$, $\sigma _y$, and $\sigma _z$ are the Pauli matrices
$
\begin{pmatrix}
0 & 1 \\
1 & 0
\end{pmatrix}
$, 
$
\begin{pmatrix}
0 & -i \\
i & 0
\end{pmatrix}
$, and
$
\begin{pmatrix}
1 & 0 \\
0 & -1
\end{pmatrix}
$, respectively.