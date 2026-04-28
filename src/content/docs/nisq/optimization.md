---
title: Quantum Optimization
description: Optimization problems and hybrid variational methods in the NISQ setting.
---

Optimization in the NISQ regime usually refers to hybrid quantum-classical strategies for minimizing or maximizing a cost function. IBM's utility-scale QAOA lesson identifies optimization as one of the most promising use cases for near-term quantum hardware.[^ibm-qaoa]

## What an optimization problem looks like

An optimization problem asks for the largest or smallest possible value of some objective function. The mathematical form varies across applications, but the recurring idea is:

$$
x^\star = \arg\min_x f(x)
\qquad \text{or} \qquad
x^\star = \arg\max_x f(x).
$$

In quantum settings, one often rewrites $f$ as a Hamiltonian or observable whose low-energy states correspond to good solutions.[^ibm-mapping][^ibm-qaoa]

## Why hybrid methods are attractive

Deep, fully coherent quantum circuits are difficult to trust on noisy hardware. IBM's variational algorithms lesson therefore emphasizes that VQE and QAOA use a hybrid quantum-classical loop with relatively short circuits.[^ibm-vqa]

Schematically,

$$
\theta
\;\longrightarrow\;
U(\theta)
\;\longrightarrow\;
\langle C \rangle
\;\longrightarrow\;
\text{classical optimizer}
\;\longrightarrow\;
\theta'.
$$

The quantum processor evaluates the cost, while the classical processor updates the parameters.

## From objective function to Hamiltonian

Many optimization problems are mapped to **cost Hamiltonians**. The role of the Hamiltonian is pedagogically important: it allows optimization to be discussed in the same language as quantum physics.

If the Hamiltonian is $H_C$, then the goal is often to find states that minimize

$$
\langle \psi(\theta) \rvert H_C \lvert \psi(\theta) \rangle.
$$

This viewpoint unifies several NISQ methods:

1. VQE minimizes an energy expectation value.
2. QAOA alternates evolution under a cost Hamiltonian and a mixer Hamiltonian.
3. More general variational methods optimize the expectation value of an application-specific observable.[^ibm-vqa]

## Why optimization is hard

Optimization problems remain difficult even with a quantum computer. The challenge is rarely "just run the circuit." Instead, one must consider:

1. How the problem is encoded.
2. Whether the chosen ansatz can represent good solutions.
3. Whether the classical optimizer can navigate the parameter landscape.
4. Whether the circuit remains shallow enough to be credible on noisy hardware.

These are conceptual obstacles, not merely implementation details.

## NISQ-specific considerations

In NISQ optimization, several practical issues are especially important:

1. **Ansatz depth**: deeper ansatzes can represent richer states, but they also accumulate more noise.
2. **Topology**: logical interactions may require extra routing gates on hardware with limited connectivity.
3. **Measurement overhead**: estimating expectation values may require many shots.
4. **Mitigation**: the measured objective may need correction or extrapolation.[^ibm-running][^ibm-mitigation]

This is why optimization is often discussed together with compilation and mitigation.

## The two flagship examples

The most common introductory examples are:

1. **QAOA**, usually for combinatorial optimization problems such as Max-Cut.
2. **VQE**, usually for minimum-eigenvalue problems such as molecular or spin Hamiltonians.[^ibm-vqa][^ibm-vqe-intro]

These are treated separately on the following pages because their motivations are related, but their structures are different.

## Takeaway

Quantum optimization in the NISQ setting is best understood as a variational framework rather than a single algorithm. The shared theme is that the quantum processor evaluates a cost function encoded in a Hamiltonian or observable, while a classical optimizer steers the parameters toward improved solutions.

[^ibm-qaoa]: IBM Quantum Learning, ["Utility-scale QAOA"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/utility-scale-qaoa).
[^ibm-mapping]: IBM Quantum Learning, ["Mapping"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/mapping).
[^ibm-vqa]: IBM Quantum Learning, ["Variational quantum algorithms"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/variational-quantum-algorithms).
[^ibm-running]: IBM Quantum Learning, ["Running quantum circuits"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/running-quantum-circuits).
[^ibm-mitigation]: IBM Quantum Documentation, ["Error mitigation and suppression techniques"](https://quantum.cloud.ibm.com/docs/en/guides/error-mitigation-and-suppression-techniques).
[^ibm-vqe-intro]: IBM Quantum Learning, ["Introduction" to the quantum chemistry with VQE course](https://quantum.cloud.ibm.com/learning/en/courses/quantum-chem-with-vqe/introduction).
