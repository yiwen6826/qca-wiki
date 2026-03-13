// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'QC |101>',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{ 
					label: 'Qubits',
					items: [
						{ 
							label: 'Basic Information Theory', 
							items: ['qubits/basic-info-theory/bloch-sphere'],
						},
						{ 
							label: 'Hardware Implementations of Qubits', 
							items: ['qubits/hardware-impl/superconducting',
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
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
