<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import Mostrar from '../../components/Mostrar.svelte';
	let token = '';

	if (browser) {
		token = localStorage.getItem('token');
		if (token == null) {
			goto('/');
		}
	}
</script>

<h1 class="text-7xl">Bienvenido</h1>

<Mostrar />
