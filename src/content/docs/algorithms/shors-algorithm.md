---
title: Shor's Algorithm
description: A long-form walkthrough of factoring via order finding and the quantum Fourier transform.
sidebar:
  order: 5
---

Shor's algorithm is the most famous quantum algorithm because it gives a major speedup for integer factorization, a problem that sits underneath classical public-key cryptography.

Its significance is partly practical and partly conceptual:

- practical, because efficient factoring threatens RSA-like systems
- conceptual, because it showed that quantum computation could dramatically change the boundary between feasible and infeasible problems

## The Factoring Problem

Given a composite integer $N$, the goal is to find its non-trivial prime factors.

For small numbers, this is easy. For large semiprimes, it is hard. That hardness is what RSA relies on.

The QCA material uses this as the motivating example: if factoring becomes efficient, then a large family of cryptographic systems becomes vulnerable.

## The Big Idea

Shor's algorithm does not attack factoring directly. It reduces factoring to a different problem:

**find the period of a modular exponential function.**

That reduction is classical number theory. The quantum computer is then used only for the period-finding step.

## The Order-Finding Setup

Pick an integer $a$ such that

$$
1 < a < N
$$

and

$$
\gcd(a, N) = 1.
$$

Now define

$$
f(x) = a^x \bmod N.
$$

This function is periodic. Its period $r$ is the smallest positive integer such that

$$
a^r \equiv 1 \pmod{N}.
$$

This $r$ is called the **order** of $a$ modulo $N$.

## Why the Order Gives Factors

If $r$ is even, then

$$
a^r \equiv 1 \pmod{N}
$$

implies

$$
(a^{r/2})^2 \equiv 1 \pmod{N}.
$$

So

$$
(a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 \pmod{N}.
$$

If

$$
a^{r/2} \not\equiv -1 \pmod{N},
$$

then at least one of

$$
\gcd(a^{r/2} - 1, N)
\qquad \text{or} \qquad
\gcd(a^{r/2} + 1, N)
$$

gives a non-trivial factor of $N$.

That is the number-theoretic reason the algorithm works.

## Worked Example: Factoring 15

Take

$$
N = 15, \qquad a = 7.
$$

Now compute powers of $7$ modulo $15$:

$$
7^1 \bmod 15 = 7
$$

$$
7^2 \bmod 15 = 4
$$

$$
7^3 \bmod 15 = 13
$$

$$
7^4 \bmod 15 = 1.
$$

So the order is

$$
r = 4.
$$

Since $r$ is even, compute

$$
7^{r/2} = 7^2 = 4.
$$

Then:

$$
\gcd(4 - 1, 15) = \gcd(3, 15) = 3
$$

$$
\gcd(4 + 1, 15) = \gcd(5, 15) = 5.
$$

So the factors are `3` and `5`.

The hard part, for large $N$, is finding the order efficiently. That is exactly what the quantum subroutine is designed to do.

## The Quantum Period-Finding Subroutine

The quantum circuit uses two registers.

### First register

This register stores a superposition of many exponents $x$.

### Second register

This register stores the modular exponential value

$$
a^x \bmod N.
$$

The high-level steps are:

1. initialize both registers
2. apply Hadamards to the first register to create a superposition over many $x$ values
3. compute $a^x \bmod N$ into the second register
4. apply the inverse quantum Fourier transform to the first register
5. measure the first register

The measurement gives information concentrated near rational values of the form

$$
\frac{s}{r},
$$

from which classical post-processing can recover the period $r$.

## Why the Quantum Fourier Transform Appears

The QCA slide deck presents the QFT as the key period detector. The idea is:

- modular exponentiation creates a periodic structure in amplitudes
- the QFT turns periodicity into sharp frequency-space peaks
- measuring those peaks gives enough information to reconstruct the hidden period

This is the same broad idea that appears in many Fourier-based methods: periodic structure becomes easier to detect after the right transform.

## The Full Hybrid Algorithm

The archived workshop slides summarize the full flow cleanly.

1. Classically rule out easy cases such as even numbers.
2. Choose a random $a$ with $1 < a < N$.
3. Compute $\gcd(a, N)$.
4. If the gcd is already greater than `1`, you got a factor for free.
5. Otherwise run the quantum order-finding subroutine to get $r$.
6. If $r$ is odd, choose a new $a$ and try again.
7. If $a^{r/2} \equiv -1 \pmod{N}$, choose a new $a$ and try again.
8. Otherwise compute $\gcd(a^{r/2} \pm 1, N)$.

Only step 5 needs the quantum computer.

## Resource Reality

Asymptotically, Shor's algorithm is polynomial-time, while the best known classical factoring algorithms are much less favorable.

But the QCA materials also stress the practical caveat:

- current devices are noisy
- large cryptographic instances need thousands of logical qubits
- with error correction, the physical qubit count becomes enormous

So Shor is foundational and strategically important, but not yet a routine real-world factoring tool at present hardware scale.

## Why Shor Changed the Conversation

Before Shor, it was easier to imagine quantum computing as an elegant but speculative branch of theory. After Shor, there was a concrete, famous, high-impact problem with a major quantum advantage.

That had three major effects:

### It legitimized the field

Quantum computing was no longer just about strange physics. It had a landmark algorithm with consequences.

### It pushed cryptography forward

The threat to RSA accelerated work on post-quantum cryptography.

### It revealed the power of quantum Fourier methods

Shor made period finding, phase structure, and interference central themes in the field.

## How to Study It as a Tutorial

A good order for self-study is:

1. factor 15 by hand using the order-finding reduction
2. compute small modular sequences and identify their periods
3. understand why $r$ must be even and why the $\pm 1$ gcd step works
4. study the role of the QFT
5. inspect a small compiled Qiskit implementation

Trying to understand the full large-scale modular exponentiation circuit immediately is usually the wrong place to start. The algebraic reduction is the real backbone.

## Downloads

- [Shor module slides](/resources/archive/spring-2025/algoworkshop/shor-module.pdf)
- [Quantum algorithms lecture slides](/resources/algorithms/quantum-algorithms-lecture.pdf)
- [Workshop Shor slides](/resources/workshops/qiskit-fall-2025/shor-slides.pdf)
- [Shor notebook](/resources/workshops/qiskit-fall-2025/more-notebooks/shor-algorithm.ipynb)

## One-Sentence Takeaway

Shor's algorithm factors integers by reducing factoring to order finding, using the quantum Fourier transform to recover that order efficiently, and then converting the order back into classical factors.
