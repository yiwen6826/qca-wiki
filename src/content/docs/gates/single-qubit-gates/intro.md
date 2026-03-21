---
title: Introduction
---
### Classical Computing
In classical computing, the only gate we can nontrivially apply to a single bit is the NOT gate. This changes the bit from 0 to 1 and 1 to 0. Similarly, we can apply a NOT gate (also referred to as the $X$ gate) to a single qubit, changing the quantum state from $\ket{0}$ to $\ket{1}$ and vice versa. 

### The Quantum NOT
What if a qubit is in some superposition of $\ket{0}$ and $\ket{1}$? This is where the $X$ gate differs from its classical twin. The quantum $X$ gate — and in fact any single-qubit quantum gate — can be represented by a 2x2 matrix. Specifically, the matrix 
$ X \equiv
\begin{pmatrix}
0 & 1 \\
1 & 0 \\
\end{pmatrix}
$
. 

So, if we were to write a qubit in vector notation as 
$
\ket{q} =
\begin{pmatrix}
\alpha \\
\beta \\
\end{pmatrix}
$
, the resulting qubit state would be
$
\ket{q'} = 
\ket{q} \cdot 
\begin{pmatrix}
0 & 1 \\
1 & 0 \\
\end{pmatrix} = 
\begin{pmatrix}
\alpha \\
\beta \\
\end{pmatrix} \cdot
\begin{pmatrix}
0 & 1 \\
1 & 0 \\
\end{pmatrix} = 
\begin{pmatrix}
\beta \\
\alpha \\
\end{pmatrix}
$.

:::note
When writing out the matrix multiplication, we must put the gate before the qubit to obey the proper matrix dimensions.
:::

As you can see, the $X$ gate flips $\alpha$ and $\beta$ such that the probabilities of measuring $\ket{0}$ and $\ket{1}$ are flipped.