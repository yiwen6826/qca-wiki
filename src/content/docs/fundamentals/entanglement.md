---
title: Entanglement
description: Why multi-qubit quantum states can have correlations stronger than classical ones.
sidebar:
  order: 4
---

Entanglement is the point where quantum information starts to feel genuinely non-classical. It is not just "very strong correlation." It is a kind of joint state that cannot be decomposed into one state for the first system and another for the second.

## Product States Versus Entangled States

A two-qubit product state looks like

$$
(\alpha\ket{0} + \beta\ket{1}) \otimes (\gamma\ket{0} + \delta\ket{1}).
$$

In that case, each qubit has its own state description and the full system is just the tensor product of the two.

An entangled state cannot be written that way. The simplest famous example is the Bell state

$$
\ket{\Phi^+} = \frac{1}{\sqrt{2}}(\ket{00} + \ket{11}).
$$

This state is not just a compact notation trick. It is a genuine joint state with properties no pair of independent one-qubit states can reproduce.

## Building a Bell State

The QCA workshop material builds entanglement with a very short circuit:

1. start in $\ket{00}$
2. apply a Hadamard to the first qubit
3. apply `CNOT` with the first qubit as control and the second as target

The state evolution is:

$$
\ket{00}
\xrightarrow{H \otimes I}
\frac{1}{\sqrt{2}}(\ket{00} + \ket{10})
\xrightarrow{CNOT}
\frac{1}{\sqrt{2}}(\ket{00} + \ket{11}).
$$

That last state is entangled.

## What Makes It Strange

If both qubits in $\ket{\Phi^+}$ are measured in the computational basis, the outcomes are perfectly correlated:

- `00`
- `11`

each with probability $\frac{1}{2}$.

But perfect correlation by itself is not enough to prove entanglement. A classical mixed state could also produce matching `00` and `11` outcomes.

The deeper fact is that Bell states show strong correlations across multiple measurement bases, not just one.

## The Single-Qubit View Tells You Almost Nothing

One of the nicest points in the older entanglement notebook is this:

- if you measure only the first qubit, the outcome looks random
- if you measure only the second qubit, the outcome also looks random
- but if you compare the two together, structured correlations appear

So the information is stored in the **joint state**, not in either subsystem by itself.

That is exactly why entanglement is not the same thing as "two qubits secretly sharing a classical value."

## Computational Basis and Superposition Basis

The archived notebook stresses another important feature. Bell-state correlations are not confined to one basis.

If both qubits are measured in the computational basis, the outcomes are correlated.

If both are measured in the superposition basis, the outcomes are still correlated.

That is much harder to explain with a naive classical hidden-variable picture and is one reason Bell inequalities become relevant.

## CHSH and the Classical Limit

The Fall 2025 quantum experiments notebook uses the CHSH game as an operational way to see why entanglement matters.

Classically, two distant players who cannot communicate during the game can win at most `75%` of the time.

With an entangled Bell pair and carefully chosen measurement bases, quantum mechanics allows a win rate of about

$$
85.4\%.
$$

This does not let the players send faster-than-light messages. But it does show that quantum correlations exceed what local classical strategies can explain.

## What Entanglement Is Not

It helps to be explicit about two common misconceptions.

### Not ordinary correlation

Classical systems can be correlated. Entangled systems are correlated in a stronger and basis-dependent way that cannot be reduced to one shared hidden classical value.

### Not faster-than-light signaling

Entanglement produces unusual correlations, but it does not let one party choose a measurement outcome and send a controllable message instantly.

## Why Entanglement Matters

Entanglement is not just a curiosity. It is a resource that appears everywhere:

- Bell tests and foundations of quantum mechanics
- quantum teleportation
- quantum error correction
- many-body physics
- some quantum algorithms and communication protocols

Teleportation in particular makes the resource interpretation very concrete: one Bell pair can be consumed to move an unknown quantum state from Alice to Bob.

## How to Study It as a Tutorial

If you want to learn entanglement actively rather than passively:

1. Build a Bell pair with `H` and `CNOT`.
2. Measure each qubit individually and note the randomness.
3. Measure both together and observe the correlations.
4. Repeat in the superposition basis.
5. Compare the Bell state to a classical mixture of `00` and `11`.
6. If you want a stronger challenge, work through the CHSH game and compute the win rate.

That last comparison is especially important because it prevents "entanglement = perfect correlation" from becoming the wrong mental model.

## Continue

- [Quantum Teleportation](/algorithms/quantum-teleportation/)
- [Deutsch's Algorithm](/algorithms/deutsch-algorithm/)

## Downloads

- [Entanglement introduction notebook](/resources/workshops/qiskit-fall-2025/more-notebooks/entanglement-introduction.ipynb)
- [Quantum experiments notebook](/resources/workshops/qiskit-fall-2025/tutorial-2-quantum-experiments.ipynb)
- [Entanglement in action slides](/resources/archive/spring-2025/algoworkshop/04-entanglement-in-action.pdf)
