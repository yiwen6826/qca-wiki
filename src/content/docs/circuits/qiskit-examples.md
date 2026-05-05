---
title: Circuits with Qiskit
---

Qiskit is IBM's open-source SDK for working with quantum circuits and algorithms. In this page, we will guide you through the main steps of building a quantum circuit in Qiskit: building a circuit, optimizing it for the target backend, executing it, and interpreting the results. You can follow along our tutorial found in the [Downloads](#downloads) section of this page.

## Creating a Circuit

In Qiskit, a circuit starts with a `QuantumCircuit` object. The number tells Qiskit how many qubits to allocate:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
```

The qubits are indexed starting from `0`. A gate method adds an operation to the circuit:

```python
qc.h(0)
```

This applies a Hadamard gate to qubit 0.

## Bell State Example

We'll begin with a short sanity-check circuit that creates a Bell state:

```python
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.draw("mpl")
```

The `cx` method is Qiskit's CNOT gate. The first argument is the control qubit, and the second argument is the target qubit.

This circuit prepares

$$
\ket{Bell} = \frac{\ket{00} + \ket{11}}{\sqrt{2}}.
$$

If the circuit is measured many times on an ideal simulator, the outcomes should be mostly `00` and `11`, each with probability about $\frac{1}{2}$.

## Measurement

To add measurements to every qubit, use

```python
qc.measure_all()
```

Measurement converts the quantum state into classical bit-string outcomes. For a two-qubit Bell circuit, those outcomes are strings such as `00`, `01`, `10`, and `11`.

On an ideal Bell-state circuit, only `00` and `11` should appear. On real hardware, noise can cause other outcomes to appear with smaller probabilities.

## GHZ State Example

Now we can build a three-qubit GHZ state!

$$
\ket{GHZ} = \frac{\ket{000} + \ket{111}}{\sqrt{2}}.
$$

One standard Qiskit circuit is

```python
qc = QuantumCircuit(3)
qc.h(0)
qc.cx(0, 1)
qc.cx(1, 2)
qc.draw("mpl")
```

The first gate creates superposition on qubit 0. The first CNOT entangles qubits 0 and 1. The second CNOT extends the correlation to qubit 2.

After measurement, an ideal GHZ circuit returns only `000` and `111`, each with probability $\frac{1}{2}$.

## The Qiskit Pattern

There are four standard steps to organizing circuit work:

1. **Map** the problem to quantum circuits and operators
2. **Optimize** the circuit for the target hardware
3. **Execute** the circuit on a simulator or quantum device
4. **Post-process** the results

This pattern is useful because real quantum computing is not just drawing a circuit. The circuit has to be adapted to hardware, run through an execution tool, and interpreted after measurement.

## Optimize

On real hardware, not every physical qubit is directly connected to every other physical qubit. A circuit may ask for a CNOT between two qubits that the device cannot directly perform.

Qiskit handles this with transpilation. Transpilation rewrites the circuit into gates and qubit connections supported by the selected backend.

```python
from qiskit import generate_preset_pass_manager

pm = generate_preset_pass_manager(backend=backend, optimization_level=1)
qc_transpiled = pm.run(qc)
```

There are also connectivity constraints with a coupling map. For example, a three-qubit device might allow connections between qubits 0 and 1 and between qubits 0 and 2, but not directly between qubits 1 and 2.

## Execute with Sampler

The `Sampler` primitive runs circuits and returns sampled measurement counts. Use it when the final result is a distribution over bit strings.

```python
from qiskit_aer import AerSimulator
from qiskit_ibm_runtime import SamplerV2 as Sampler

backend = AerSimulator()
sampler = Sampler(mode=backend)

qc.measure_all()
pm = generate_preset_pass_manager(backend=backend, optimization_level=1)
job = sampler.run(pm.run([qc]))
results_sampler = job.result()
```

For a GHZ circuit, the post-processed counts should show `000` and `111` as the dominant outcomes on an ideal simulator.

## Execute with Estimator

The `Estimator` primitive computes expectation values of observables. Use it when the question is not just "which bit strings appeared?" but "what is the expected value of this operator on the prepared state?"

In our tutorial, we use observables such as

```python
from qiskit.quantum_info import SparsePauliOp

ZZZ = SparsePauliOp("ZZZ")
ZZI = SparsePauliOp("ZZI")
III = SparsePauliOp("III")
```

For a GHZ state, some observables have expectation value 1 because their signs line up across both branches of the superposition. Others have expectation value 0 because they introduce unmatched signs or flip states into orthogonal components.

## Post-Process

Post-processing turns raw execution output into something readable.

For sampled counts, it is common to visualize the distribution with a histogram:

```python
from qiskit.visualization import plot_histogram

counts_list = results_sampler[0].data.meas.get_counts()
plot_histogram(counts_list, title="GHZ state")
```

We can also plot expectation values for a list of observables for estimator results. The key idea is the same in both cases: execution gives raw data, and post-processing connects that data back to the circuit's intended behavior.

## Continue

- [Intro to Quantum Circuits](/circuits/intro/)
- [Multi-Qubit Gates](/gates/multi-qubit/)
- [NISQ Mapping](/nisq/mapping/)
- [Circuit Optimization](/nisq/circuit-optimization/)

## Downloads

- [Tutorial 1: Building Quantum Circuits](/resources/workshops/qiskit-fall-2025/tutorial-1-building-quantum-circuits.ipynb)