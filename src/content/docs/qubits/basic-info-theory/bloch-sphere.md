---
title: "The Bloch Sphere"
description: A geometric picture of single-qubit states and gates.
sidebar:
  order: 2
---

The Bloch sphere is the standard geometric picture for a **single qubit**. It turns the algebra of amplitudes into a picture of points on a sphere and gates as rotations.

## Interactive Bloch Sphere

<iframe
  src="/bloch-sphere/index.html"
  title="Interactive Bloch sphere"
  style="width: 100%; height: 720px; border: 1px solid var(--sl-color-gray-5); border-radius: 12px;"
></iframe>

If the embedded version does not load correctly, open it directly at [bloch-sphere.arnabg.me](https://blochsphere.arnabg.me).

## From State Vector to Sphere

A general one-qubit state can be written as

$$
\ket{\psi} = \alpha\ket{0} + \beta\ket{1},
$$

with

$$
|\alpha|^2 + |\beta|^2 = 1.
$$

After removing an irrelevant global phase, every pure one-qubit state can be rewritten as

$$
\ket{\psi}
=
\cos\left(\frac{\theta}{2}\right)\ket{0}
+
e^{i\phi}\sin\left(\frac{\theta}{2}\right)\ket{1}.
$$

That means the state is determined by two angles:

- $\theta$, the polar angle
- $\phi$, the azimuthal angle

Those are exactly the coordinates of a point on the unit sphere.

## Important Points on the Sphere

### North pole

$$
\ket{0}
$$

This is the computational basis state `0`.

### South pole

$$
\ket{1}
$$

This is the computational basis state `1`.

### Equator

Balanced superpositions lie on the equator. Two key examples are

$$
\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}),
\qquad
\ket{-} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1}).
$$

They give the same immediate measurement probabilities in the computational basis, but they occupy different points around the equator because their relative phases differ.

## What the Angles Tell You

The polar angle $\theta$ determines how likely the qubit is to be measured as `0` or `1`:

$$
P(0) = \cos^2\left(\frac{\theta}{2}\right),
\qquad
P(1) = \sin^2\left(\frac{\theta}{2}\right).
$$

The azimuthal angle $\phi$ carries relative phase information. Two states with the same height on the sphere can have the same computational-basis probabilities while still behaving differently after later gates.

That is why the Bloch sphere is useful: it keeps probability and phase in the same picture.

## Gates as Rotations

Single-qubit unitary gates act like rotations of the Bloch sphere.

### Pauli-X

The $X$ gate is a $\pi$ rotation about the $x$-axis.

- $\ket{0} \leftrightarrow \ket{1}$
- north pole swaps with south pole

### Pauli-Y

The $Y$ gate is a $\pi$ rotation about the $y$-axis.

It also swaps the poles, but with a phase change.

### Pauli-Z

The $Z$ gate is a $\pi$ rotation about the $z$-axis.

- the poles stay fixed
- equatorial states rotate around the vertical axis

### Hadamard

The Hadamard gate sends

$$
\ket{0} \mapsto \ket{+},
\qquad
\ket{1} \mapsto \ket{-}.
$$

Geometrically, it rotates the qubit from the computational basis toward the $X$ basis. This is why it appears so often in superposition-building circuits.

## Why the Bloch Sphere Helps

The Bloch sphere is especially useful for three reasons.

### It visualizes measurement bias

States near the north pole strongly favor measurement outcome `0`. States near the south pole favor `1`.

### It visualizes phase

Movement around the equator corresponds to changing relative phase.

### It visualizes gates

Many gates that look abstract in matrix form become rigid geometric rotations on the sphere.

## What It Cannot Show

The Bloch sphere only works cleanly for **one qubit**.

As soon as you move to two or more qubits, the state space becomes much larger:

- 1 qubit: dimension 2
- 2 qubits: dimension 4
- 3 qubits: dimension 8
- $n$ qubits: dimension $2^n$

There is no equally simple 3D picture for general multi-qubit states, especially entangled ones.

So the Bloch sphere is a powerful intuition-building tool, but it is not a complete visualization of quantum computing.

## A Good Way to Use This Page

1. Read [Qubit Mathematics](/qubits/basic-info-theory/qubit-math/) first if the notation still feels unfamiliar.
2. Use the interactive sphere above to move between $\ket{0}$, $\ket{1}$, $\ket{+}$, and $\ket{-}$.
3. Apply familiar gates and watch the rotations.
4. Compare the geometric motion to the matrix formulas from the foundations pages.
