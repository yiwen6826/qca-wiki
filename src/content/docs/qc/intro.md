---
title: Introduction
---
### What is a Computer?
Let’s consider a computer as an abstract machine that can: 
<ul>
    <li>Store information</li>
    <li>Process information</li>
</ul>

For example, how do we store information on a classical computer? We use classical bits, a binary value between 0 and 1, as the alphabet of the computer, and binary data as the language of the computer. Classical computers process binary data into binary data using logic gates: AND, OR, NOT, XOR, NAND, and more. We can compose these operations to give the computer the ability to perform arithmetic, encode information, and more. 

### Building a Quantum Computer
Let’s construct an abstract quantum computer. Instead of classical bits, we’ll use quantum bits (qubits). Qubits, instead of taking on a single value between 0 and 1, will sit in a superposition of 0 and 1: they’ll be a special combination of 0 and 1 simultaneously. We’ll assign a qubit $q$ two numbers: $\alpha$, the “0”-ness of a qubit, and $\beta$, the “1”-ness of a qubit. We’ll also let $\alpha, \beta$ be complex numbers for reasons that will become apparent later. $\alpha^2$ will denote the probability of a qubit being 0, and $\beta^2$ will denote the probability of a qubit being 1. Instead of logic gates, we’ll use quantum gates (which are conceptually very similar to classical gates): H, X, Y, Z, CNOT, etc.

Next, we'll take a closer look at the fundamental quantum mechanical principles that distinguish a quantum computer from a classical one.