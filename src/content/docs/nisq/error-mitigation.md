---
title: Error Mitigation Techniques
description: Error suppression and error mitigation techniques used on NISQ hardware.
---

NISQ hardware is noisy, but that does not mean every run is useless. The practical goal is to reduce or model the noise well enough that the final estimate is closer to the ideal answer. In current workflows, this usually means combining **error suppression** with **error mitigation**.[^ibm-mitigation]

## Mitigation vs. correction

It helps to separate three ideas:

1. **Error correction** encodes logical qubits redundantly and actively corrects faults during computation.
2. **Error suppression** tries to prevent some noise from doing damage in the first place.
3. **Error mitigation** accepts that noise occurred, then estimates what the ideal answer should have been.[^ibm-mitigation][^preskill]

NISQ devices mostly live in categories 2 and 3.

## A useful pipeline

One way to organize the techniques is:

$$
\text{shape the noise}
\;\longrightarrow\;
\text{learn the noise}
\;\longrightarrow\;
\text{invert, extrapolate, or cancel its effect}.
$$

That picture matches IBM's current stack surprisingly well.[^ibm-mitigation]

## Key techniques

| Technique | Main idea | NISQ intuition |
| --- | --- | --- |
| Dynamical decoupling | Insert pulse sequences during idle windows | Suppress coherent errors before they build up |
| Pauli twirling | Randomize gates so noise behaves more like a Pauli channel | Turn structured coherent noise into a more manageable form |
| TREX | Twirl measurements and learn a readout transfer matrix that is easy to invert | Calibrate measurement noise, then undo it in post-processing |
| ZNE | Run at several amplified noise levels, then extrapolate to zero noise | Deliberately add controllable noise to estimate the noiseless value |
| PEA | Learn a layerwise noise model, then inject learned noise to amplify it more accurately | A more model-based version of ZNE |
| PEC | Express the ideal circuit as a quasi-probability mixture of noisy circuits | Cancel noise statistically, usually with larger sampling cost |

All six appear in IBM's documentation, though the first two are presented as suppression techniques and the last four as mitigation techniques.[^ibm-mitigation]

## Dynamical decoupling

Dynamical decoupling targets **idling qubits**. IBM describes it as inserting pulse sequences that act like an identity logically, while physically canceling some unwanted coherent evolution on qubits that would otherwise sit idle.[^ibm-mitigation]

The important limitation is that it helps most when there are genuine idle gaps to protect. If the circuit is already packed densely, the extra pulses may help less or even hurt because the pulses themselves are imperfect.[^ibm-mitigation]

## Pauli twirling

Pauli twirling, also called randomized compiling, surrounds gates with random Pauli operations chosen so that the ideal logical action stays the same.[^ibm-mitigation]

Why do this? Because coherent errors can accumulate badly. Twirling converts a general noise channel into something closer to a Pauli channel, which is often easier to analyze and easier to combine with later mitigation steps.[^ibm-mitigation]

This is one way to interpret your "purposely insert noise and learn it" intuition: we sometimes deliberately randomize or reshape the way noise appears so that downstream learning and correction become more reliable.

## TREX: learning and inverting measurement noise

TREX, or twirled readout error extinction, focuses on measurement error.[^ibm-mitigation]

IBM's description is useful here:

1. Randomized measurement twirls diagonalize the readout-error transfer matrix.
2. Extra calibration circuits estimate that matrix.
3. The resulting diagonal form is easy to invert.[^ibm-mitigation]

This is the closest match to the idea of "learn the noise and apply a reverse filter." The reverse filter is not a literal physical gate. It is a classical correction based on an estimated measurement-noise model.

## Zero-noise extrapolation

Zero-noise extrapolation (ZNE) runs the same logical computation at several effective noise levels, then extrapolates the observed values back to the zero-noise limit.[^ibm-mitigation]

IBM's implementation uses **digital gate folding** for noise amplification. A gate $U$ can be replaced by a logically equivalent sequence such as

$$
U \;\mapsto\; U U^{\dagger} U,
$$

which preserves the ideal unitary while increasing the opportunity for physical noise to act.[^ibm-mitigation]

Conceptually, ZNE is:

$$
f(\lambda_1), f(\lambda_2), f(\lambda_3)
\;\longrightarrow\;
f(0),
$$

where $\lambda$ denotes the effective noise scale.

ZNE is often useful, but IBM explicitly notes that it is **not guaranteed to be unbiased**.[^ibm-mitigation]

## Probabilistic error amplification

Probabilistic error amplification (PEA) improves the noise-amplification step used inside ZNE. Rather than relying only on gate folding, IBM first **learns the twirled noise model** of each entangling layer and then amplifies the circuit by **probabilistically injecting single-qubit noise** according to the learned model.[^ibm-mitigation]

That makes PEA a stronger example of noise learning in the NISQ setting:

$$
\text{learn layer noise}
\;\longrightarrow\;
\text{amplify it in a controlled way}
\;\longrightarrow\;
\text{extrapolate back}.
$$

IBM notes that PEA is often a strong choice in utility-scale experiments.[^ibm-mitigation]

## Probabilistic error cancellation

Probabilistic error cancellation (PEC) is more ambitious. IBM describes it as writing the ideal observable or circuit effect as a linear combination of noisy operations that the hardware can actually implement.[^ibm-mitigation]

Schematically,

$$
O_{\mathrm{ideal}} = \sum_i \eta_i O_{\mathrm{noisy}, i}.
$$

The coefficients $\eta_i$ generally form a **quasi-probability** distribution, not an ordinary probability distribution, because some coefficients are negative.[^ibm-mitigation]

The benefit is that PEC is unbiased in principle. The cost is sampling overhead, which can grow quickly with circuit depth. That makes PEC powerful but expensive.[^ibm-mitigation]

## What these techniques do not solve

Error mitigation is not magic. In NISQ settings, every mitigation method trades one resource for another:

1. More calibration circuits.
2. More shots.
3. More classical post-processing.
4. Sometimes more circuit depth.
5. Model assumptions that can fail outside their regime.[^ibm-mitigation]

So the real workflow is usually:

1. Make the circuit as shallow and hardware-aware as possible.
2. Use suppression to reduce avoidable noise.
3. Use mitigation only where it materially improves the quantity you care about.

## Takeaway

The important NISQ shift is that noise handling becomes part of the algorithm design. You do not just ask, "What circuit computes the answer?" You also ask:

1. What noise structure is dominant?
2. Can I reshape or learn that noise?
3. Is inversion, extrapolation, or cancellation the right response?

That is the practical mindset behind modern NISQ error mitigation.

[^ibm-mitigation]: IBM Quantum Documentation, ["Error mitigation and suppression techniques"](https://quantum.cloud.ibm.com/docs/en/guides/error-mitigation-and-suppression-techniques).
[^preskill]: John Preskill, ["Quantum Computing in the NISQ era and beyond"](https://preskill.caltech.edu/pubs/preskill-2018-NISQ.pdf), accepted July 30, 2018 and published in *Quantum* on August 6, 2018.
