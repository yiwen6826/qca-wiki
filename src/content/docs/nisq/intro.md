---
title: Introduction to NISQ
description: High-level introduction to noisy, intermediate-scale quantum computing.
---

Noisy, intermediate-scale quantum (NISQ) computing is the style of quantum computing we can do with today's hardware: devices with enough qubits to run nontrivial circuits, but not enough reliability to support full fault-tolerant error correction.[^preskill] In John Preskill's original 2018 framing, NISQ referred to roughly 50 to 100 qubits; in practice, people now use the term more loosely for today's noisy machines with tens to a few hundreds of physical qubits.[^preskill]

The central constraint is simple: we can prepare, evolve, and measure quantum states, but we cannot yet run arbitrarily deep circuits and expect the result to stay trustworthy. That is why NISQ work emphasizes **shorter circuits, smarter compilation, hybrid quantum-classical workflows, and error mitigation** rather than full quantum error correction.[^ibm-mitigation][^ibm-circuit-opt] IBM's practice material therefore treats mapping, circuit design, execution, and post-processing as one end-to-end workflow rather than as separate topics.[^ibm-mapping][^ibm-running]

## Why NISQ matters

The motivation for NISQ is that some quantum tasks map naturally onto quantum hardware even before fault tolerance arrives. The most promising examples usually involve either:

1. **Simulation**, where the quantum computer models another quantum system.
2. **Optimization**, where a quantum circuit is embedded inside a classical optimization loop.

Those two themes show up repeatedly in IBM's learning materials on utility-scale quantum workflows. In IBM's "Utility-scale QAOA" lesson, optimization is singled out as one of the three application areas they are most optimistic about, and the companion "Simulating nature" lesson makes the same case for simulation workloads.[^ibm-qaoa-practice][^ibm-sim-nature]

## Simulation

Quantum simulation starts from a Hamiltonian $H$ describing the system of interest and tries to reproduce either its dynamics or some of its important properties on a quantum computer.[^ibm-sim] In the dynamical case, the target evolution is

$$
\lvert \psi(t) \rangle = e^{-iHt}\lvert \psi(0) \rangle.
$$

That makes Hamiltonian simulation one of the most direct application areas for quantum hardware in physics, chemistry, and materials science.[^ibm-sim][^lloyd]

There is also a useful connection between Hamiltonian simulation and quantum algorithms more broadly: implementing $e^{-iHt}$ is itself a quantum algorithmic task, and many higher-level algorithms use Hamiltonian evolution as a subroutine or primitive. So it is better to think of Hamiltonian simulation not as something separate from quantum algorithms, but as one of their core building blocks.[^ibm-sim][^lloyd]

For a deeper discussion, see [Hamiltonian Simulation](./hamiltonian-simulation).

## Optimization

In NISQ settings, optimization usually means **hybrid variational algorithms** such as VQE and QAOA. IBM describes these as hybrid quantum-classical methods that use relatively short parameterized quantum circuits, measure a cost function, and then update the parameters with a classical optimizer.[^ibm-vqa][^ibm-vqe-intro]

At a high level, the workflow is

$$
\theta_0 \xrightarrow{\text{prepare } U(\theta)} \langle C \rangle
\xrightarrow{\text{classical optimizer}} \theta_1
\xrightarrow{} \cdots
$$

where $C$ is the cost Hamiltonian or observable being minimized or maximized.

Two important NISQ examples are:

1. **VQE**, which is often used to estimate ground-state or low-energy properties of Hamiltonians, especially in quantum chemistry.[^ibm-vqa][^ibm-vqe-intro]
2. **QAOA**, which targets combinatorial optimization tasks such as Max-Cut through a parameterized circuit and classical outer loop.[^ibm-vqa]

IBM's mapping lesson is helpful here: the Max-Cut workflow is not just "run QAOA." First, the graph problem is rewritten as a cost function, then as a Hamiltonian, and only then as a parameterized circuit whose low-energy states encode good cuts.[^ibm-mapping][^ibm-qaoa-practice]

NISQ optimization is not only about the mathematical objective. It is also about making the circuit itself more hardware-friendly. IBM's circuit optimization course emphasizes that better transpilation and smarter synthesis can noticeably shorten circuits, which matters because shorter circuits typically accumulate less noise.[^ibm-circuit-opt]

## Error mitigation instead of full error correction

Because NISQ devices are not fault tolerant, they lean on **error suppression** and **error mitigation** rather than full error correction. These methods do not make the hardware perfect. Instead, they try to reduce, reshape, learn, or post-process noise so the final estimate is closer to the ideal answer.[^ibm-mitigation]

A useful mental picture is

$$
\text{better circuit design}
\;\longrightarrow\;
\text{noise suppression}
\;\longrightarrow\;
\text{noise learning}
\;\longrightarrow\;
\text{mitigated estimate}.
$$

Examples include:

1. **Dynamical decoupling**, which inserts pulse sequences during idle periods to suppress coherent errors.[^ibm-mitigation]
2. **Pauli twirling**, which randomizes noise into a more manageable Pauli-like form.[^ibm-mitigation]
3. **TREX**, which learns measurement noise in a form that is easy to invert.[^ibm-mitigation]
4. **Zero-noise extrapolation**, which intentionally amplifies noise and extrapolates back toward the zero-noise limit.[^ibm-mitigation]
5. **PEA** and **PEC**, which explicitly learn noise models and use them to amplify or cancel noise more systematically.[^ibm-mitigation]

For details, see [Error Mitigation Techniques](./error-mitigation).

## Takeaway

NISQ computing is best viewed as a constrained but useful regime. You do not yet get the clean abstraction of fault-tolerant logical qubits. Instead, you get a noisy quantum device that can still be valuable when:

1. The problem maps naturally onto quantum evolution or a compact variational circuit.
2. The circuit can be kept shallow enough.
3. Error mitigation and circuit optimization are treated as part of the algorithm, not as afterthoughts.

To continue, see the more detailed pages on [NISQ Review](./review), [Mapping Quantum Problems](./mapping), [Quantum Simulation](./simulation), [Quantum Optimization](./optimization), [Circuit Optimization and Transpilation](./circuit-optimization), [QAOA](./qaoa), and [VQE](./vqe).

[^preskill]: John Preskill, ["Quantum Computing in the NISQ era and beyond"](https://preskill.caltech.edu/pubs/preskill-2018-NISQ.pdf), accepted July 30, 2018 and published in *Quantum* on August 6, 2018.
[^ibm-mitigation]: IBM Quantum Documentation, ["Error mitigation and suppression techniques"](https://quantum.cloud.ibm.com/docs/en/guides/error-mitigation-and-suppression-techniques).
[^ibm-sim]: IBM Quantum Learning, ["Quantum simulation"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-simulation).
[^ibm-vqa]: IBM Quantum Learning, ["Variational quantum algorithms"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/variational-quantum-algorithms).
[^ibm-vqe-intro]: IBM Quantum Learning, ["Introduction" to the quantum chemistry with VQE course](https://quantum.cloud.ibm.com/learning/en/courses/quantum-chem-with-vqe/introduction).
[^ibm-circuit-opt]: IBM Quantum Learning, ["Quantum circuit optimization"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-circuit-optimization).
[^ibm-mapping]: IBM Quantum Learning, ["Mapping"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/mapping).
[^ibm-running]: IBM Quantum Learning, ["Running quantum circuits"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/running-quantum-circuits).
[^ibm-qaoa-practice]: IBM Quantum Learning, ["Utility-scale QAOA"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/utility-scale-qaoa).
[^ibm-sim-nature]: IBM Quantum Learning, ["Simulating nature"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/simulating-nature).
[^lloyd]: Seth Lloyd, ["Universal Quantum Simulators"](https://doi.org/10.1126/science.273.5278.1073), *Science* 273, 1073-1078 (1996).
