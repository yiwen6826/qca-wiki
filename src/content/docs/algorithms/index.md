---
title: Quantum Algorithms
description: Long-form explanations and source material for QCA's algorithms sequence.
sidebar:
  order: 1
---

This section is meant to read like a small textbook track rather than a workshop handout. The source material still comes from QCA lectures, notebooks, and slide decks, but the goal here is to turn that material into pages that can be read straight through.

The backbone of the section comes from:

- the QCA quantum algorithms lecture deck
- Spring 2025 workshop modules
- Fall 2025 Qiskit notebooks
- the teleportation and fundamentals notes

## Suggested Reading Order

If you want a clear progression, read the section in this order:

1. [Deutsch's Algorithm](/algorithms/deutsch-algorithm/)
2. [Quantum Teleportation](/algorithms/quantum-teleportation/)
3. [Grover's Search](/algorithms/grovers-search/)
4. [Shor's Algorithm](/algorithms/shors-algorithm/)

## Lecture Roadmap

The lecture is organized into three parts.

### Part I: Foundations

- Why quantum computing matters
- Bits vs. qubits
- Superposition and measurement
- Quantum gates
- Entanglement
- Deutsch-Jozsa as a first algorithmic example

### Part II: The Big Algorithms

- Grover's search and amplitude amplification
- Shor's factoring algorithm
- Quantum Fourier Transform intuition
- Comparative discussion of speedup types

### Part III: The NISQ Era

- What makes present-day hardware noisy
- Hamiltonians as the bridge from physics to computation
- Variational methods such as VQE and QAOA
- Error mitigation as a practical survival strategy

## What These Pages Are Trying to Teach

Taken together, these articles are meant to build a few durable habits of thought:

- quantum advantage is usually about extracting a global property efficiently, not reading out every hidden value
- phase and interference matter just as much as superposition
- many algorithms are hybrid, with quantum and classical pieces doing different jobs
- different quantum speedups have different strengths: query, quadratic, exponential, and near-term heuristic

## Downloads

- [Lecture slides](/resources/algorithms/quantum-algorithms-lecture.pdf)
- [Speaker notes](/resources/algorithms/speaker-notes.pdf)

## Relationship to the Rest of the Wiki

This algorithms material complements, rather than replaces, the concept reference pages:

- Use the [Foundations](/fundamentals/) pages for the linear algebra and gate model underneath the circuits.
- Use [Qubit Mathematics](/qubits/basic-info-theory/qubit-math/) if the notation feels too fast.
- Use the [Workshops](/workshops/) pages for hands-on notebook-based practice.
- Use the topical sidebar sections for concept-by-concept review.
