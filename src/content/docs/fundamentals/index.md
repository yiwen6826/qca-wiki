---
title: Foundations
description: A textbook-style path through the core ideas of introductory quantum computing.
sidebar:
  order: 1
---

This section is the main conceptual starting point for the wiki. It is meant to feel like the opening chapters of a textbook: each page introduces a small set of ideas that later pages build on.

## Suggested Reading Order

If you want a clean path, read the pages in this order:

1. [Bits, Qubits, and Measurement](/fundamentals/week-1/)
2. [Superposition and Quantum Gates](/fundamentals/week-2/)
3. [Qubit Mathematics](/qubits/basic-info-theory/qubit-math/)
4. [The Bloch Sphere](/qubits/basic-info-theory/bloch-sphere/)
5. [Deutsch's Algorithm](/algorithms/deutsch-algorithm/)
6. [Quantum Teleportation](/algorithms/quantum-teleportation/)
7. [Grover's Search](/algorithms/grovers-search/)
8. [Shor's Algorithm](/algorithms/shors-algorithm/)

## How the Path Fits Together

The foundations pages are organized around a simple progression.

### First: what a qubit is

You need to become comfortable with basis states, amplitudes, and measurement before anything else in the subject starts making sense.

### Second: how a qubit changes

Once states are vectors, gates become matrices acting on those vectors. That is the gate model of quantum computation.

### Third: why phase matters

Relative phase is what makes interference possible, and interference is what lets many algorithms extract global properties efficiently.

### Fourth: how many-qubit systems differ

Tensor products and entanglement take you from single-qubit intuition to genuinely quantum multi-qubit behavior.

### Fifth: what all of that is for

The protocol and algorithm pages show why the mathematical language matters. Teleportation, Deutsch, Grover, and Shor are not detached applications. They are where the foundational ideas become visible.

## If You Get Stuck

If the notation feels unfamiliar, jump directly to [Qubit Mathematics](/qubits/basic-info-theory/qubit-math/).

If the notation is fine but the geometry feels abstract, use [The Bloch Sphere](/qubits/basic-info-theory/bloch-sphere/).

If you want a motivational preview, skim [Grover's Search](/algorithms/grovers-search/) or [Shor's Algorithm](/algorithms/shors-algorithm/) and then come back to the earlier pages.

## Source Material

These pages are adapted from the QCA lecture notes, workshop decks, notebooks, and archived handouts in the repo, but rewritten so they read as standalone explanations rather than class materials.
