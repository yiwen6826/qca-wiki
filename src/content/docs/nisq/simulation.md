---
title: Quantum Simulation
description: The broader simulation workflow in NISQ quantum computing.
---

Quantum simulation is the broad task of using a controllable quantum device to study another quantum system. In the NISQ regime, it is one of the most important application areas because the structure of the target problem already matches the structure of quantum mechanics reasonably well.[^ibm-sim-nature][^georgescu]

## Why simulation is a natural quantum application

Classical simulation of many-body quantum systems becomes difficult because the size of the state space grows exponentially. A quantum computer does not magically remove all difficulty, but it can represent and manipulate quantum states in a way that is far closer to the native structure of the problem.[^lloyd][^georgescu]

That is why simulation is often treated as a leading candidate for near-term utility.

## The simulation workflow

IBM's "Simulating nature" lesson presents the following workflow:[^ibm-sim-nature]

1. Identify system Hamiltonian.
2. Hamiltonian encoding.
3. State preparation.
4. Time evolution of the state.
5. Circuit optimization.
6. Circuit execution.
7. Post-processing.

This workflow is useful because it shows that simulation is not only about the differential equation or the Hamiltonian. It is equally about representation, compilation, and noise-aware interpretation.

## The Hamiltonian as the central object

Most gate-model simulation workflows begin with a Hamiltonian $H$. Once $H$ is specified, one usually asks either:

1. How does the system evolve under $H$?
2. What are the low-energy or equilibrium properties of $H$?

The first question leads naturally to time-evolution methods. The second often leads to variational or eigenvalue-estimation methods such as VQE.

## State preparation matters

In principle, one might imagine that simulation begins once the time-evolution operator is available. In practice, the initial state can be just as important as the evolution rule.

For chemistry problems, for example, IBM notes that the Hartree-Fock state can serve as a useful starting point because it is easy to prepare and often has meaningful overlap with the true ground state.[^ibm-sim-nature]

This is a good reminder that a simulation protocol is only as useful as the states it can initialize and measure.

## Time evolution and approximation

The central unitary in digital Hamiltonian simulation is

$$
U(t) = e^{-iHt}.
$$

When $H$ is complicated, this unitary must usually be approximated. IBM's simulation material introduces Trotterization and related product-formula methods for that purpose.[^ibm-sim]

For a more detailed treatment, see [Hamiltonian Simulation](./hamiltonian-simulation).

## Circuit optimization is part of simulation

The simulation workflow in IBM's course explicitly includes circuit optimization before execution.[^ibm-sim-nature] This is not incidental. On noisy hardware, even a theoretically correct evolution circuit may be too deep to be informative.

IBM's circuit optimization lesson shows that transpilation and synthesis choices can noticeably reduce circuit length.[^ibm-circuit-opt] In NISQ simulation, that can materially affect whether the final observables remain interpretable.

## Post-processing and mitigation

Simulation results are rarely useful as raw bitstrings. They typically need to be transformed into expectation values, correlation functions, magnetization curves, or other physical quantities. When the experiment is noisy, mitigation is often applied before or during that interpretation step.[^ibm-mitigation]

This is why simulation, compilation, and error mitigation are tightly coupled in practice.

## Two common NISQ simulation styles

It is useful to distinguish two related styles of simulation:

1. **Direct dynamical simulation**, which approximates the actual time evolution $e^{-iHt}$.
2. **Variational simulation**, which uses a parameterized state or circuit to approximate properties of $H$ without compiling the full target evolution.

The first is closer to traditional digital simulation. The second is often more NISQ-friendly when exact evolution would be too deep.

## Takeaway

Quantum simulation in the NISQ setting is not merely "run a physics circuit." It is a structured workflow in which the scientific model, the encoding, the state preparation, the compiled circuit, and the mitigation strategy all influence the meaning of the final result.

[^ibm-sim-nature]: IBM Quantum Learning, ["Simulating nature"](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/simulating-nature).
[^ibm-sim]: IBM Quantum Learning, ["Quantum simulation"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-simulation).
[^ibm-circuit-opt]: IBM Quantum Learning, ["Quantum circuit optimization"](https://quantum.cloud.ibm.com/learning/en/courses/utility-scale-quantum-computing/quantum-circuit-optimization).
[^ibm-mitigation]: IBM Quantum Documentation, ["Error mitigation and suppression techniques"](https://quantum.cloud.ibm.com/docs/en/guides/error-mitigation-and-suppression-techniques).
[^lloyd]: Seth Lloyd, ["Universal Quantum Simulators"](https://doi.org/10.1126/science.273.5278.1073), *Science* 273, 1073-1078 (1996).
[^georgescu]: I. M. Georgescu, S. Ashhab, and F. Nori, ["Quantum simulation"](https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.86.153), *Reviews of Modern Physics* 86, 153 (2014).
