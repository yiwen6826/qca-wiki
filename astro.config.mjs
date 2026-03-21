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
					label: 'Qubits',
					items: [
						{ 
							label: 'Basic Information Theory', 
							items: ['qubits/basic-info-theory/bloch-sphere'],
						},
						{ 
							label: 'Hardware Implementations', 
							items: ['qubits/hardware-impl/intro',
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
					items: [
						{	label: 'Single-Qubit Gates', 
							items: ['gates/single-qubit-gates/intro',
									'gates/single-qubit-gates/unitary',
									'gates/single-qubit-gates/useful',
							]},
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
