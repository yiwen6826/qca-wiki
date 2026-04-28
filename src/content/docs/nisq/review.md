---
title: NISQ Review
description: A more in-depth review of the central ideas behind noisy, intermediate-scale quantum computing.
---

This page reviews the NISQ paradigm at a slightly deeper level than the introductory page. The objective is not merely to list algorithms, but to explain why the same themes recur across modern near-term quantum workflows.

## What makes a computation "NISQ"?

A computation belongs to the NISQ regime when it uses quantum hardware that is large enough to perform nontrivial computations, but noisy enough that full fault-tolerant error correction is not yet the operating abstraction.[^preskill] In this regime:

1. Qubits are physical qubits, not logical qubits.
2. Circuit depth is a primary resource constraint.
3. Hardware topology, gate calibration, and measurement quality materially affect algorithm design.
4. Error suppression and error mitigation are used to improve estimates, rather than to achieve exact fault tolerance.[^ibm-running][^ibm-mitigation]

This is why NISQ quantum computing should be studied as a full workflow rather than as an isolated set of algorithms.

## The recurring workflow

Across IBM's teaching materials, the same broad pattern appears repeatedly:

$$
\text{map problem}
\;\longrightarrow\;
\text{construct circuit}
\;\longrightarrow\;
\text{optimize/transpile}
\;\longrightarrow\;
\text{execute}
\;\longrightarrow\;
\text{mitigate and interpret}.
$$

The "Running quantum circuits" lesson explicitly treats large-scale execution as a workflow that includes mapping a problem to a quantum circuit and applying mitigation and suppression to extract as much performance as possible.[^ibm-running] Likewise, the "Simulating nature" lesson presents simulation as a sequence of Hamiltonian identification, encoding, state preparation, time evolution, circuit optimization, execution, and post-processing.[^ibm-sim-nature]

## Why simulation and optimization dominate

The two most prominent NISQ application families are simulation and optimization.

### Simulation

Simulation is compelling because quantum systems are naturally described by quantum states and Hamiltonians. If the target system evolves according to

$$
\lvert \psi(t) \rangle = e^{-iHt}\lvert \psi(0) \rangle,
$$

then a quantum computer can attempt to implement that same evolution directly or approximately.[^ibm-sim] This is why quantum simulation has long been regarded as one of the most natural uses of quantum hardware.[^lloyd][^georgescu]

### Optimization

Optimization is compelling because many difficult practical tasks can be reformulated as minimizing or maximizing a cost function. IBM's utility-scale QAOA lesson frames optimization as one of the three most promising use cases for near-term quantum hardware and uses Max-Cut as a representative example.[^ibm-qaoa]

In the NISQ regime, optimization is usually approached with **hybrid variational methods**. These methods keep the quantum circuits relatively short and delegate parameter updates to a classical optimizer.[^ibm-vqa]

## Mapping is not a preliminary nuisance

Students often encounter mapping as a preliminary technical hurdle, but in NISQ computing it is better understood as a central intellectual step. IBM's mapping lesson asks three useful questions:

1. What do the qubits represent?
2. If the problem is continuous, how should it be discretized?
3. Does the problem topology align with the hardware topology?[^ibm-mapping]

These questions determine whether a quantum approach is even plausible. In chemistry, for example, mapping often involves translating fermionic operators into Pauli operators by means of encodings such as Jordan-Wigner.[^ibm-mapping]

## Circuit depth is a scientific issue, not just an engineering issue

In fault-tolerant discussions, one often begins with an ideal circuit and worries about implementation later. In NISQ computing, that ordering is frequently reversed. Because noise accumulates, the choice of ansatz, compilation strategy, qubit layout, and number of two-qubit gates can change whether a result is scientifically meaningful.

IBM's circuit optimization lesson demonstrates this directly: higher optimization levels can produce substantially shorter transpiled circuits, and shorter circuits generally suffer less noise accumulation.[^ibm-circuit-opt]

## Variational methods as a NISQ compromise

Variational methods such as VQE and QAOA are well matched to the NISQ regime because they replace a single deep, rigid quantum computation with an iterative hybrid loop:

$$
\theta
\;\longrightarrow\;
U(\theta)
\;\longrightarrow\;
\langle C \rangle
\;\longrightarrow\;
\text{classical update}
\;\longrightarrow\;
\theta'.
$$

IBM's variational algorithms lesson emphasizes exactly this point: VQE and QAOA use relatively short quantum circuits and optimize their parameters classically to work around the difficulty of extracting meaningful results from deep circuits on noisy hardware.[^ibm-vqa]

## Error mitigation as part of the algorithm

Error mitigation should not be thought of as a cosmetic afterthought added after the "real" computation. In NISQ workflows, mitigation is often part of the computational strategy itself. IBM's mitigation documentation includes techniques that:

1. Suppress coherent noise during idle periods.
2. Randomize noise into a more analyzable form.
3. Learn measurement or layerwise noise models.
4. Extrapolate back to the zero-noise limit.
5. Statistically cancel noise using quasi-probability methods.[^ibm-mitigation]

This is one reason that the boundary between algorithm design and systems engineering is unusually thin in NISQ computing.

## A useful way to study NISQ

For learning purposes, it helps to separate the field into five interacting layers:

1. **Problem formulation**: what is being solved?
2. **Mapping**: how is the problem represented on qubits?
3. **Algorithm family**: simulation, VQE, QAOA, and related methods.
4. **Compilation and execution**: how is the circuit adapted to hardware?
5. **Noise management**: how is the final estimate improved and interpreted?

The separate pages in this section follow that structure.

For the compiler side of that workflow, see [Circuit Optimization and Transpilation](./circuit-optimization).

[^preskill]: John Preskill, ["Quantum Computing in the NISQ era and beyond"](https://preskill.caltech.edu/pubs/preskill-2018-NISQ.pdf), accepted July 30, 2018 and published in *Quantum* on August 6, 2018.
[^ibm-running]: IBM Quantum Learning, ["Running quantum circuits"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/running-quantum-circuits).
[^ibm-mitigation]: IBM Quantum Documentation, ["Error mitigation and suppression techniques"](https://quantum.cloud.ibm.com/docs/en/guides/error-mitigation-and-suppression-techniques).
[^ibm-sim-nature]: IBM Quantum Learning, ["Simulating nature"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/simulating-nature).
[^ibm-sim]: IBM Quantum Learning, ["Quantum simulation"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-simulation).
[^ibm-qaoa]: IBM Quantum Learning, ["Utility-scale QAOA"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/utility-scale-qaoa).
[^ibm-vqa]: IBM Quantum Learning, ["Variational quantum algorithms"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/variational-quantum-algorithms).
[^ibm-mapping]: IBM Quantum Learning, ["Mapping"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/mapping).
[^ibm-circuit-opt]: IBM Quantum Learning, ["Quantum circuit optimization"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-circuit-optimization).
[^lloyd]: Seth Lloyd, ["Universal Quantum Simulators"](https://doi.org/10.1126/science.273.5278.1073), *Science* 273, 1073-1078 (1996).
[^georgescu]: I. M. Georgescu, S. Ashhab, and F. Nori, ["Quantum simulation"](https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.86.153), *Reviews of Modern Physics* 86, 153 (2014).
