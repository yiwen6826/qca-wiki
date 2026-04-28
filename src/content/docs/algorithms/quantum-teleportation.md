---
title: Quantum Teleportation
description: A full walkthrough of the teleportation protocol and why it works.
sidebar:
  order: 3
---

Quantum teleportation is one of the best examples of how quantum information differs from classical information. It shows that an unknown quantum state can be transferred from one place to another without physically sending the original particle, provided that entanglement and classical communication are both available.

## What Gets Teleported

Suppose Alice has a qubit in an unknown state

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}.
$$

The coefficients $\alpha$ and $\beta$ are not known to Alice, and she cannot simply measure the qubit to learn them. A direct measurement would collapse the state.

The goal of teleportation is to make Bob end up with exactly this state.

## What Resources Are Needed

The QCA teleportation material always emphasizes the same three resources:

1. the unknown state $\ket{\psi}$
2. a shared Bell pair between Alice and Bob
3. two classical bits sent from Alice to Bob

Without all three, the protocol does not work.

## The Shared Bell Pair

Before the protocol begins, Alice and Bob share the entangled state

$$
\ket{\Phi^+} = \frac{1}{\sqrt{2}}(\ket{00} + \ket{11}).
$$

Alice holds one qubit of that Bell pair and Bob holds the other.

So the total three-qubit system is

$$
\ket{\psi} \otimes \ket{\Phi^+}.
$$

The first qubit is Alice's unknown state. The second qubit is Alice's half of the entangled pair. The third is Bob's half.

## Why Alice Cannot Just Send the State Classically

Teleportation is interesting because two classical strategies fail immediately.

### Strategy 1: Measure and report the result

If Alice measures the state directly, she only gets one classical outcome, not the amplitudes $\alpha$ and $\beta$.

### Strategy 2: Copy the state first

That also fails. The no-cloning theorem says there is no universal operation that takes

$$
\ket{\psi}\ket{0} \mapsto \ket{\psi}\ket{\psi}
$$

for every unknown $\ket{\psi}$.

So the protocol cannot preserve Alice's original while also creating Bob's copy. The original must be consumed.

## The Four-Step Protocol

The QCA quick reference sheet breaks teleportation into a clean four-step procedure.

### Step 1: Alice applies CNOT

Alice uses the unknown qubit as the control and her Bell-pair qubit as the target.

This entangles the unknown state with her half of the shared pair.

### Step 2: Alice applies Hadamard

Alice applies a Hadamard to the original unknown qubit.

This converts the two qubits on her side into a form where a computational-basis measurement will reveal which correction Bob must later apply.

### Step 3: Alice measures both of her qubits

Alice now gets two classical bits.

These bits do not reveal the full state $\ket{\psi}$. They only specify which one of four related states Bob currently holds.

### Step 4: Bob applies the correction

Alice sends the two classical bits to Bob, and Bob applies a gate depending on the measurement result:

| Alice's result | Bob's correction |
| --- | --- |
| `00` | $I$ |
| `01` | $X$ |
| `10` | $Z$ |
| `11` | $ZX$ |

After this correction, Bob's qubit is exactly

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1}.
$$

## Seeing the Algebra

Start with

$$
\left(\alpha\ket{0} + \beta\ket{1}\right)
\otimes
\frac{1}{\sqrt{2}}(\ket{00} + \ket{11}).
$$

After Alice's `CNOT` and `H`, the state can be regrouped into four branches:

$$
\frac{1}{2}\Big(
\ket{00}\,(\alpha\ket{0} + \beta\ket{1})
+
\ket{01}\,(\alpha\ket{1} + \beta\ket{0})
+
\ket{10}\,(\alpha\ket{0} - \beta\ket{1})
+
\ket{11}\,(\beta\ket{0} - \alpha\ket{1})
\Big),
$$

up to qubit-order conventions.

The important point is not the exact line-by-line expansion. It is the pattern:

- Alice's two measurement bits select one branch
- Bob's state in that branch is always a simple Pauli-transformed version of $\ket{\psi}$
- a matching correction recovers the original state

## Why This Does Not Violate Relativity

Teleportation does **not** let Alice send information faster than light.

The entangled pair alone is not enough. Bob still needs the two classical bits from Alice to know which correction to apply. Those bits travel through an ordinary classical channel.

So the protocol uses entanglement, but it does not bypass relativity.

## Why This Does Not Violate No-Cloning

The original state disappears when Alice measures. Teleportation transfers the state; it does not duplicate it.

That is why the protocol is compatible with the no-cloning theorem even though Bob ends up with a perfect copy of Alice's original state.

## What the Protocol Teaches

Teleportation is a compact demonstration of several central ideas in quantum information:

- entanglement is a usable resource
- measurement can be destructive and informative at the same time
- classical communication and quantum resources complement each other
- quantum information can be transferred without transmitting a full classical description of the state

It is one of the best examples of how "information" in quantum mechanics is not reducible to plain classical bits.

## How to Study It as a Tutorial

A good way to learn teleportation is to build it in stages:

1. Create a Bell pair with `H` and `CNOT`.
2. Choose a test input such as $\ket{+}$ or a rotated qubit.
3. Apply Alice's `CNOT`.
4. Apply Alice's Hadamard.
5. Measure Alice's two qubits.
6. Conditionally apply Bob's correction.
7. Compare Bob's final state with the original test state.

If you want to go one step further, repeat the exercise with dynamic circuits or noisy hardware and compare the real outcomes to the ideal simulator.

## Downloads

- [Teleportation module slides](/resources/archive/spring-2025/algoworkshop/teleportation-module.pdf)
- [Teleportation reference sheet](/resources/archive/spring-2025/week4/teleportation-reference.pdf)
- [Quantum experiments notebook](/resources/workshops/qiskit-fall-2025/tutorial-2-quantum-experiments.ipynb)
- [Teleportation and superdense coding notebook](/resources/workshops/qiskit-fall-2025/more-notebooks/teleportation-superdensecoding.ipynb)

## One-Sentence Takeaway

Quantum teleportation uses one shared entangled pair and two classical bits to transfer an unknown qubit state from Alice to Bob while destroying the original in the process.
