---
title: "DiVincenzo's Criteria"
---
### DiVincenzo's Criteria
In 2000, physicist David DiVincenzo proposed a list of five fundamental requirements for a physical system to be considered a viable quantum computer. This checklist came to be known as "DiVincenzo's Criteria."

<ol>
    <li><strong>Scalable Physical System with Well-Defined Qubits:</strong> The system must define qubits in such a way that they are reproducible and stable. The number of qubits should be able to be increased without control and error rates becoming unmanageable. This is essential for future development of quantum computing.</li>
    <li><strong>Ability to Initialize Qubits in a Well-Defined State:</strong> Ensure that the qubit(s) begin from a simple, known state. Only then can we perform any quantum operations with reliable and reproducible results.</li>
    <li><strong>Universal Set of Quantum Gates:</strong> The system must support single-qubit gates as well as at least one two-qubit gate. The latter allows for entanglement. However, just because the set of gates is universal doesn't mean it is practically efficient — for example, if a system requires millions of gates to simulate another gate.</li>
    <li><strong>Ability to Measure the Qubits:</strong> Not only must we be able to extract the final answer from the quantum computation, we also want to distinguish between the |0>and the |1> state. These measurements should be accurate, selective, and repeatable.</li>
    <li><strong>Coherence Time Long Enough to Perform Computation:</strong> The qubits must be sufficiently well-isolated from the environment so that they maintain their state during quantum gate operations. The time it takes for the qubit to begin to decay and lose its information is called the <em>decoherence time.</em></li>
</ol>

With this framework in place, we can now begin our survey of the most (relatively) prominent qubit platforms and ensure that each of them satisfies the five criteria above.