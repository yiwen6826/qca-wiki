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
				},
				{
					label: 'Quantum Computing',
					items: ['qc/intro', 'qc/phys'],
				},
				{
					label: 'Qubits',
					items: [
						{
							label: 'Basic Information Theory',
							items: [
								'qubits/basic-info-theory/qubit-math',
								'qubits/basic-info-theory/bloch-sphere',
								'qubits/basic-info-theory/quantum-states',
							],
						},
						{
							label: 'Hardware Implementations',
							items: [
								'qubits/hardware-impl/intro',
								'qubits/hardware-impl/divincenzo',
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
					items: ['gates/intro', 'gates/unitary', 'gates/useful', 'gates/multi-qubit'],
				},
				{
					label: 'Circuits',
					items: ['circuits/intro'],
				},
				{
					label: 'Algorithms & Protocols',
					autogenerate: { directory: 'algorithms' },
				},
				{
					label: 'Workshops',
					autogenerate: { directory: 'workshops' },
				},
				{
					label: 'Archive',
					autogenerate: { directory: 'archive' },
				},
				{
					label: 'NISQ',
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
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
