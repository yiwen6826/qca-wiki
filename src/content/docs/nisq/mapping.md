---
title: Mapping Quantum Problems
description: How computational problems are translated into qubits, Hamiltonians, and circuits.
---

Mapping is the process of translating a problem into a form that a quantum computer can represent and process. In pedagogical discussions it is sometimes treated as an introductory pre-processing step; in practice, it is one of the most consequential stages of the entire workflow.[^ibm-mapping]

## The three core questions

IBM's mapping lesson proposes three questions that are broadly useful across applications:[^ibm-mapping]

1. What will the qubits represent?
2. If the problem is continuous, how should it be discretized?
3. Does the topology of the problem align with the topology of the hardware?

These questions are simple to state, but they determine the entire structure of the algorithm.

## From problem statement to quantum object

The objective of mapping is usually to rewrite a classical or physical problem as one of the following:

1. A **cost function** to be minimized or maximized.
2. A **Hamiltonian** whose ground state or time evolution encodes the answer.
3. A **parameterized circuit** whose measurement statistics reveal useful information about the problem.[^ibm-mapping][^ibm-qaoa]

In many applications, all three appear in sequence.

## Example 1: combinatorial optimization

For Max-Cut, the problem begins as a graph partitioning task. IBM's utility-scale QAOA lesson then reformulates it into a QUBO problem and finally into a cost Hamiltonian written in terms of Pauli operators.[^ibm-qaoa]

At a high level, the transition is:

$$
\text{graph}
\;\longrightarrow\;
\text{binary objective}
\;\longrightarrow\;
\text{QUBO}
\;\longrightarrow\;
\text{Ising / Pauli Hamiltonian}.
$$

This is a good example of a recurring NISQ pattern: the quantum computer does not solve the original problem statement directly. It solves a carefully encoded representation of that problem.

## Example 2: quantum simulation

For simulation, mapping usually begins with the system Hamiltonian itself. IBM's "Simulating nature" workflow starts with identifying the system Hamiltonian and then choosing a suitable encoding, state preparation method, and time-evolution strategy.[^ibm-sim-nature]

In this case, the central object is already quantum-mechanical. The mapping challenge is therefore not primarily combinatorial. It is representational:

1. Which degrees of freedom are retained?
2. Which basis is used?
3. Which terms in the Hamiltonian are important enough to keep?
4. How can the encoded Hamiltonian be compiled into gates?

## Example 3: chemistry and fermions

Mapping becomes more subtle in quantum chemistry and related many-body problems. The hardware natively supports qubits and Pauli operators, but chemistry is often written in terms of fermionic creation and annihilation operators.

IBM's mapping lesson uses the Jordan-Wigner transformation as a representative encoding.[^ibm-mapping] The core idea is to convert fermionic operators into Pauli-operator expressions that preserve the correct antisymmetry and occupation-number structure.

This is why chemistry pages often refer to "encoding the Hamiltonian" rather than simply "building the circuit."

## What qubits can mean

One reason mapping feels difficult to beginners is that qubits do not have a single universal interpretation. Depending on the application, a qubit may represent:

1. A node in a graph.
2. An orbital occupation number.
3. A discretized degree of freedom in a field theory.
4. One component of a more structured register describing geometry, spin, or particle content.[^ibm-mapping]

This flexibility is powerful, but it also means the semantics of the register must be learned problem by problem.

## Mapping and hardware topology

A mathematically elegant encoding can still be a poor NISQ encoding if it clashes with hardware connectivity. IBM's mapping and execution lessons both emphasize topology: if the logical problem graph is denser than the physical connectivity graph, extra SWAP operations may be required.[^ibm-mapping][^ibm-running]

Those extra gates increase depth and therefore noise. In the NISQ regime, that makes mapping a hardware-sensitive task rather than a purely abstract one.

## A practical checklist

When studying a new quantum application, it helps to ask:

1. What is the target cost function or Hamiltonian?
2. What does each qubit or register represent?
3. Which encoding is being used?
4. How is the encoded object rewritten in Pauli terms?
5. How well does the logical connectivity fit the hardware?

If those questions are clear, the rest of the algorithm usually becomes much easier to understand.

[^ibm-mapping]: IBM Quantum Learning, ["Mapping"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/mapping).
[^ibm-running]: IBM Quantum Learning, ["Running quantum circuits"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/running-quantum-circuits).
[^ibm-qaoa]: IBM Quantum Learning, ["Utility-scale QAOA"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/utility-scale-qaoa).
[^ibm-sim-nature]: IBM Quantum Learning, ["Simulating nature"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/simulating-nature).
