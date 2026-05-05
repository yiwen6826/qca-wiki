// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightKatex } from 'starlight-katex';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'QC |101>',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			plugins: [starlightKatex()],
			sidebar: [
				{
					label: 'Foundations',
					autogenerate: { directory: 'fundamentals' },
					collapsed: true,
				},
				{
					label: 'Qubits',
					collapsed: true,
					items: [
						{
							label: 'Basic Information Theory',
							collapsed: true,
							items: [
								'qubits/basic-info-theory/qubit-math',
								'qubits/basic-info-theory/bloch-sphere',
							],
						},
						{
							label: 'Hardware Implementations',
							collapsed: true,
							items: [
								'qubits/hardware-impl/intro',
								'qubits/hardware-impl/superconducting',
								'qubits/hardware-impl/photonics',
								'qubits/hardware-impl/trapped-ions',
								'qubits/hardware-impl/topological',
								'qubits/hardware-impl/nv',
								'qubits/hardware-impl/quantum-dot',
							],
						},
					],
				},
				{
					label: 'Gates',
					collapsed: true,
					items: ['gates/intro', 'gates/unitary', 'gates/useful', 'gates/multi-qubit'],
				},
				{
					label: 'Circuits',
					collapsed: true,
					items: ['circuits/intro', 'circuits/qiskit-examples'],
				},
				{
					label: 'Algorithms & Protocols',
					collapsed: true,
					autogenerate: { directory: 'algorithms' },
				},
				{
					label: 'NISQ',
					collapsed: true,
					items: [
						'nisq/intro',
						'nisq/review',
						'nisq/mapping',
						'nisq/simulation',
						'nisq/hamiltonian-simulation',
						'nisq/optimization',
						'nisq/circuit-optimization',
						'nisq/qaoa',
						'nisq/vqe',
						'nisq/error-mitigation',
					],
				},
				{
					label: 'Workshops',
					collapsed: true,
					autogenerate: { directory: 'workshops' },
				},
				{
					label: 'Archive',
					collapsed: true,
					autogenerate: { directory: 'archive' },
				},
			],
		}),
	],
});
