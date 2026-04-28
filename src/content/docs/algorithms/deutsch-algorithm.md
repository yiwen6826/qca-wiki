---
title: Deutsch's Algorithm
description: The first famous example of quantum advantage in the query model.
sidebar:
  order: 2
---

Deutsch's algorithm is one of the first quantum algorithms that people study because it is small, clean, and conceptually revealing. It is not important because the underlying problem is useful. It is important because it shows, in miniature, how quantum advantage can arise from superposition, phase, and interference.

## The Problem

Suppose you are given a black-box function

$$
f : \{0,1\} \to \{0,1\}.
$$

There are exactly four such functions:

| Input | $f_1(x)$ | $f_2(x)$ | $f_3(x)$ | $f_4(x)$ |
| --- | --- | --- | --- | --- |
| $0$ | $0$ | $0$ | $1$ | $1$ |
| $1$ | $0$ | $1$ | $0$ | $1$ |

These fall into two classes:

- **constant**: both outputs are the same
- **balanced**: the two outputs differ

So:

- $f_1$ and $f_4$ are constant
- $f_2$ and $f_3$ are balanced

The task is to determine which class the hidden function belongs to.

## The Classical Cost

Classically, if the function is a genuine black box, you need two evaluations in the worst case:

1. ask for $f(0)$
2. ask for $f(1)$

Only then can you tell whether the outputs are equal or different.

That makes the quantum version interesting because it succeeds with just **one** oracle query.

## The Oracle

Quantum algorithms usually represent black-box access with a reversible oracle

$$
U_f\ket{x}\ket{y} = \ket{x}\ket{y \oplus f(x)},
$$

where $\oplus$ is XOR.

This matters because quantum operations must be unitary. A direct irreversible "write out $f(x)$ and discard the input" map would not be a legal quantum gate.

## Why Quantum Parallelism Alone Does Not Solve It

One of the QCA notebooks makes a very good pedagogical move: it first shows that naive "parallel evaluation" is not enough.

If you prepare

$$
\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})\ket{0}
$$

and apply the oracle, you get a state containing information about both $f(0)$ and $f(1)$. But when you measure, you only see one classical outcome per shot. So simple quantum parallelism does not automatically outperform the classical method.

That is the lesson to keep in mind:

quantum computing is not just classical parallelism with more branches. The trick is to arrange amplitudes so that measurement reveals exactly the global property you want.

## The Key Trick: Prepare the Second Qubit as $\ket{-}$

Deutsch's algorithm changes the second input from $\ket{0}$ to

$$
\ket{-} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1}).
$$

Then the oracle acts as

$$
U_f\ket{x}\ket{-} = (-1)^{f(x)}\ket{x}\ket{-}.
$$

This is the famous **phase kickback** step.

Instead of storing the function value in a way we need to read directly, the oracle turns the value into a relative sign on the first register. That is exactly the kind of information that later interference can detect.

## The Circuit

The algorithm begins in

$$
\ket{0}\ket{1}.
$$

Then:

1. apply a Hadamard to both qubits
2. apply the oracle once
3. apply a Hadamard to the first qubit
4. measure the first qubit

After the first pair of Hadamards:

$$
\ket{0}\ket{1}
\xrightarrow{H \otimes H}
\ket{+}\ket{-}.
$$

Now the first qubit is in superposition and the second qubit has been prepared to produce phase kickback.

## The State After the Oracle

Since

$$
\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}),
$$

the input to the oracle is

$$
\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})\ket{-}.
$$

Applying the oracle gives

$$
\frac{1}{\sqrt{2}}
\left(
(-1)^{f(0)}\ket{0}
+
(-1)^{f(1)}\ket{1}
\right)\ket{-}.
$$

At this point the function values have become relative signs.

## The Final Hadamard and Interference

Now apply a Hadamard to the first qubit.

### Constant case

If the function is constant, then

$$
(-1)^{f(0)} = (-1)^{f(1)}.
$$

The two amplitudes have the same sign, and after the final Hadamard the first qubit becomes

$$
\pm \ket{0}.
$$

So the measurement is definitely `0`.

### Balanced case

If the function is balanced, then

$$
(-1)^{f(0)} = -(-1)^{f(1)}.
$$

The amplitudes have opposite signs, and after the final Hadamard the first qubit becomes

$$
\pm \ket{1}.
$$

So the measurement is definitely `1`.

That gives the full decision rule:

- measure `0` -> constant
- measure `1` -> balanced

with only one query.

## Why This Counts as Quantum Advantage

The quantum algorithm does **not** tell you which function you had. It only tells you whether the function was constant or balanced.

That is the point.

The algorithm is tailored to the global property you care about. It uses interference to convert that property into a measurable basis-state distinction. This is a standard pattern in quantum algorithms: you often learn a structural property of a function more efficiently than you could learn the whole function table.

## Three Ideas to Remember

Deutsch's algorithm is small enough that its structure can be summarized by three ideas.

### Superposition

The first qubit lets the oracle act on both inputs at once.

### Phase kickback

The second qubit turns function values into phases.

### Interference

The last Hadamard turns "same phase" versus "opposite phase" into different deterministic measurement outcomes.

## The Historical Extension: Deutsch-Jozsa

Deutsch's algorithm handles a one-bit function. Its more famous extension, **Deutsch-Jozsa**, considers

$$
f : \{0,1\}^n \to \{0,1\}
$$

under the promise that the function is either constant or balanced.

Then:

- classical worst case: up to $2^{n-1} + 1$ queries
- quantum: one query

So the two-qubit algorithm is really the prototype of a broader query-model phenomenon.

## How to Study It as a Tutorial

A good self-study sequence is:

1. build the four possible one-bit oracles
2. run the naive superposition-only circuit and verify that measurement does not fully solve the problem
3. replace the second qubit with $\ket{-}$
4. watch phase kickback appear
5. apply the final Hadamard and verify the deterministic constant-versus-balanced distinction

That order matters because it shows not just that the algorithm works, but why the naive explanation is incomplete.

## Downloads

- [Deutsch module slides](/resources/archive/spring-2025/algoworkshop/deutsch-module.pdf)
- [Fall 2025 tutorial notebook](/resources/workshops/qiskit-fall-2025/tutorial-3-deutsch-algorithm.ipynb)
- [Additional Deutsch-Jozsa notebook](/resources/workshops/qiskit-fall-2025/more-notebooks/deutsch-jozsa.ipynb)

## One-Sentence Takeaway

Deutsch's algorithm uses a single oracle query, phase kickback, and interference to decide whether a one-bit Boolean function is constant or balanced.
