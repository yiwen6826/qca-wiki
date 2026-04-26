---
title: Superconducting Qubits
---
### How They Work
In classical mechanics, we know that LC circuits behave like harmonic oscillators. Superconducting qubits instead replace the inductor with a Josephson junction, creating a nonlinear LC circuit with several unique properties. 

:::note
The Josephson junction is the key superconducting element in the qubit. It is formed from a pair of superconductors separated by a thin insulating barrier, allowing Cooper pairs — pairs of electrons bound together — to tunnel through the barrier.
:::

Because the circuit is now nonlinear, ...
<ol>
    <li>Its energy levels aren’t evenly spaced like a regular harmonic oscillator.</li>
    <li>The qubit becomes less sensitive to noise.</li>
</ol>

The first point is the most critical. Unequally spaced energy levels allows us to define our desired qubit states as just the first two levels: $\ket{0}$ as the ground state and $\ket{1}$ as the excited state.

Think of a qubit’s state as a vector on the Bloch sphere. Then, we can apply a microwave pulse resonant with the qubit, causing Rabi oscillations between $\ket{0}$ and $\ket{1}$ that act as superconducting qubit gates. By manipulating the amplitude, phase, and duration of the pulse, we can determine the axis and angle fo the rotation.

### Pros
Superconducting qubits are arguably the most promising qubit platform presently. They are the qubit of choice for the major companies in quantum computing: IBM, Google, and even Intel. Superconducting qubits, like a few of the other qubits, are (relatively) easily integrable with existing semiconductor fabrication technology (hence, semiconductor companies like Intel, Samsung, and TSMC) - a major benefit, because semiconductor fabrication is an already heavily researched and developed field. They are also extremely fast compared to other qubits.  
### Cons
Superconducting qubits are delicate. They have short decoherence times (i.e. there is only a small window of fidelity) and are highly sensitive to noise. This sensitivity means that they also require EXTREMELY cold refrigeration: often in the milli-Kelvins, which seriously limits scalability in the short-term and significantly increases costs. 