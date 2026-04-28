---
title: Workshops
description: Hands-on QCA workshop material, including the Fall 2025 Qiskit workshop.
---

This section collects QCA's hands-on workshop content. The main current set is the **Fall 2025 Qiskit Workshop**, which combines slides, executable notebooks, and IBM Quantum setup instructions.

## Fall 2025 Qiskit Workshop

The workshop repository is organized as a sequence of notebooks with companion slide decks. The intended flow is:

| Order | Topic | Main file | Companion material |
| --- | --- | --- | --- |
| 1 | Building Quantum Circuits | `Tutorial 1` | Foundations slides |
| 2 | Quantum Experiments | `Tutorial 2` | Teleportation slides |
| 3 | Deutsch's Algorithm | `Tutorial 3` | Deutsch slides |
| 4 | Quantum Neural Networks | `Tutorial 4` | Best after Tutorials 1-3 |

## Setup Expectations

The workshop README assumes:

- A Python virtual environment
- `qiskit`
- `qiskit-aer`
- `jupyter`
- Optional IBM Quantum credentials for real hardware access

The material explicitly encourages using simulators first to conserve limited quantum hardware time.

## Notebook Highlights

### Tutorial 1: Building Quantum Circuits

- "Quantum 8-Ball" warm-up
- GHZ state construction
- Qiskit patterns workflow: map, optimize, execute, post-process
- Optional run on real hardware

### Tutorial 2: Quantum Experiments

- Double-slit style interference intuition
- Measurement and superposition
- CHSH game and Bell inequality ideas
- Quantum teleportation with dynamic circuits

### Tutorial 3: Deutsch's Algorithm

- Quantum parallelism and its limits
- Deutsch and Deutsch-Jozsa
- Bernstein-Vazirani extension
- Built-in questions and challenge prompts

### Tutorial 4: Quantum Neural Networks

- Variational circuits
- Batch training loops
- Classifier improvement passes
- Scaling toward real hardware execution

### Extra notebooks

The workshop also includes older enrichment notebooks on:

- Superposition
- Entanglement
- Deutsch-Jozsa
- Shor's algorithm
- Teleportation and superdense coding
- A minimal "hello world" Qiskit circuit

## Downloads

### Slides and presentation files

- [Opening presentation](/resources/workshops/qiskit-fall-2025/opening-presentation.pptx)
- [Foundations slides](/resources/workshops/qiskit-fall-2025/foundations-slides.pdf)
- [Teleportation slides](/resources/workshops/qiskit-fall-2025/teleportation-slides.pdf)
- [Deutsch slides](/resources/workshops/qiskit-fall-2025/deutsch-slides.pdf)
- [Shor slides](/resources/workshops/qiskit-fall-2025/shor-slides.pdf)

### Main notebooks

- [Tutorial 1: Building Quantum Circuits](/resources/workshops/qiskit-fall-2025/tutorial-1-building-quantum-circuits.ipynb)
- [Tutorial 2: Quantum Experiments](/resources/workshops/qiskit-fall-2025/tutorial-2-quantum-experiments.ipynb)
- [Tutorial 3: Deutsch's Algorithm](/resources/workshops/qiskit-fall-2025/tutorial-3-deutsch-algorithm.ipynb)
- [Tutorial 4: Quantum Neural Networks](/resources/workshops/qiskit-fall-2025/tutorial-4-quantum-neural-networks.ipynb)

### Additional notebooks

- [Deutsch-Jozsa](/resources/workshops/qiskit-fall-2025/more-notebooks/deutsch-jozsa.ipynb)
- [Entanglement Introduction](/resources/workshops/qiskit-fall-2025/more-notebooks/entanglement-introduction.ipynb)
- [Hello Zero](/resources/workshops/qiskit-fall-2025/more-notebooks/hello-zero.ipynb)
- [Shor Algorithm](/resources/workshops/qiskit-fall-2025/more-notebooks/shor-algorithm.ipynb)
- [Superposition](/resources/workshops/qiskit-fall-2025/more-notebooks/superposition.ipynb)
- [Teleportation and Superdense Coding](/resources/workshops/qiskit-fall-2025/more-notebooks/teleportation-superdensecoding.ipynb)
